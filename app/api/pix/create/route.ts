import { NextResponse } from 'next/server';

/**
 * Pagou AI v1
 * POST https://api.conta.pagou.ai/v1/transactions
 * Auth: Basic base64("SECRET_KEY:x")
 *
 * Body do frontend: { plan: 'basico' | 'completo', name, email, cpf, phone }
 *
 * Mapeamento:
 *   basico   → "Promoção escolhida 1"  → R$ 20,00
 *   completo → "Promoção escolhida 2"  → R$ 40,00
 */

type PlanId = 'basico' | 'completo';

type CreatePixBody = {
  plan: PlanId;
  name: string;
  email: string;
  cpf: string;
  phone: string;
};

const PLANS: Record<PlanId, { title: string; amount: number }> = {
  basico: { title: 'Promoção escolhida 1', amount: 20 },
  completo: { title: 'Promoção escolhida 2', amount: 40 },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_BASE_URL = 'https://api.conta.pagou.ai';

function onlyDigits(s: string): string {
  return (s ?? '').replace(/\D/g, '');
}

export async function POST(request: Request) {
  let body: CreatePixBody;
  try {
    body = (await request.json()) as CreatePixBody;
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const { plan, name, email, cpf, phone } = body ?? ({} as CreatePixBody);

  if (!plan || !PLANS[plan]) {
    return NextResponse.json({ error: 'Plano inválido' }, { status: 400 });
  }
  if (!name || name.trim().length < 3) {
    return NextResponse.json({ error: 'Nome completo é obrigatório' }, { status: 400 });
  }
  const emailTrimmed = (email ?? '').trim();
  if (!emailTrimmed || !EMAIL_RE.test(emailTrimmed)) {
    return NextResponse.json({ error: 'E-mail inválido' }, { status: 400 });
  }
  const cpfDigits = onlyDigits(cpf);
  if (cpfDigits.length !== 11) {
    return NextResponse.json({ error: 'CPF deve ter 11 dígitos' }, { status: 400 });
  }
  const phoneDigits = onlyDigits(phone);
  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    return NextResponse.json(
      { error: 'Telefone deve ter 10 ou 11 dígitos (com DDD)' },
      { status: 400 }
    );
  }

  const rawKey = process.env.PAGOUAI_SECRET_KEY;
  if (!rawKey) {
    return NextResponse.json(
      { error: 'Servidor de pagamento não configurado (PAGOUAI_SECRET_KEY ausente)' },
      { status: 500 }
    );
  }

  const secretKey = rawKey.trim();
  const baseUrl = (process.env.PAGOUAI_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/+$/, '');
  const endpoint = `${baseUrl}/v1/transactions`;

  const { title, amount } = PLANS[plan];
  const amountCents = Math.round(amount * 100);
  const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const payload = {
    amount: amountCents,
    paymentMethod: 'pix',
    customer: {
      name: name.trim(),
      email: emailTrimmed,
      phone: phoneDigits,
      document: { number: cpfDigits, type: 'cpf' },
    },
    items: [{ title, quantity: 1, unitPrice: amountCents, tangible: false }],
    pix: { expirationDate },
  };

  const basicAuth = Buffer.from(`${secretKey}:x`).toString('base64');

  let upstream: Response;
  try {
    upstream = await fetch(endpoint, {
      method: 'POST',
      headers: {
        authorization: `Basic ${basicAuth}`,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });
  } catch (err) {
    console.log('[pix] falha de conexão:', err);
    return NextResponse.json(
      { error: 'Falha de conexão com o gateway de pagamento' },
      { status: 502 }
    );
  }

  const raw = await upstream.text();
  let data: any = null;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = null;
  }

  if (!upstream.ok) {
    const detail =
      data?.message ||
      data?.error ||
      data?.errors?.[0]?.message ||
      (typeof raw === 'string' ? raw.slice(0, 400) : '') ||
      'Erro desconhecido no gateway';

    if (upstream.status === 401) {
      return NextResponse.json(
        { error: 'PAGOUAI_SECRET_KEY inválida (confira se é a SECRET, não a PUBLIC).', detail },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: `Erro no gateway (${upstream.status})`, detail },
      { status: 502 }
    );
  }

  const pix = data?.pix ?? {};
  const qrCode: string = pix.qrcode ?? pix.qrCode ?? '';
  const qrCodeImage: string | null = pix.url ?? null;
  const expirationRaw = pix.expirationDate ?? pix.expiration_date;

  if (!qrCode) {
    return NextResponse.json(
      { error: 'Gateway não retornou QR Code PIX' },
      { status: 502 }
    );
  }

  const expiresAt =
    expirationRaw && /\d{4}-\d{2}-\d{2}T/.test(String(expirationRaw))
      ? new Date(expirationRaw).toISOString()
      : new Date(Date.now() + 10 * 60 * 1000).toISOString();

  return NextResponse.json({
    txid: data?.id ?? data?.transactionId ?? null,
    qrCode,
    qrCodeImage,
    expiresAt,
    amount,
    plan,
    title,
  });
}

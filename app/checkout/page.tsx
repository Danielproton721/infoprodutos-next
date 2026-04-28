'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';

type PlanId = 'basico' | 'completo';

type PlanInfo = {
  name: string;
  desc: string;
  img: string;
  subtotal: string;
  discount: string;
  total: string;
  installments: string;
};

const PLANS: Record<PlanId, PlanInfo> = {
  basico: {
    name: 'Chefinhos Especiais — Plano Básico',
    desc: 'E-book com +50 receitas adaptadas',
    img: '/assets/Gemini_20conto.png',
    subtotal: 'R$ 37,00',
    discount: '− R$ 17,00',
    total: 'R$ 20,00',
    installments: 'ou em até 4× de R$ 5,40 no cartão',
  },
  completo: {
    name: 'Chefinhos Especiais — Plano Completo',
    desc: 'E-book + 3 bônus + acesso vitalício',
    img: '/assets/Gemini_40conto.png',
    subtotal: 'R$ 83,00',
    discount: '− R$ 43,00',
    total: 'R$ 40,00',
    installments: 'ou em até 6× de R$ 7,40 no cartão',
  },
};

type PixResult = {
  txid: string | null;
  qrCode: string;
  qrCodeImage: string | null;
  expiresAt: string;
  amount: number;
  plan: PlanId;
  title: string;
};

function formatTime(s: number): string {
  const m = String(Math.floor(s / 60)).padStart(2, '0');
  const r = String(s % 60).padStart(2, '0');
  return `${m}:${r}`;
}

function onlyDigits(s: string): string {
  return s.replace(/\D/g, '');
}

function maskCpf(v: string): string {
  const d = onlyDigits(v).slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function maskPhone(v: string): string {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim();
}

function CheckoutInner() {
  const searchParams = useSearchParams();
  const param = searchParams.get('plano');
  const planId: PlanId = param === 'basico' ? 'basico' : 'completo';
  const plan = PLANS[planId];

  const [tab, setTab] = useState<'pix' | 'card'>('pix');
  const [seconds, setSeconds] = useState<number>(15 * 60);
  const [copied, setCopied] = useState<boolean>(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pix, setPix] = useState<PixResult | null>(null);
  const [paid, setPaid] = useState<boolean>(false);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s <= 0 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const qrImgSrc = useMemo(() => {
    if (!pix) return null;
    if (pix.qrCodeImage) return pix.qrCodeImage;
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
      pix.qrCode
    )}`;
  }, [pix]);

  const copyPix = async (): Promise<void> => {
    if (!pix?.qrCode) return;
    try {
      await navigator.clipboard.writeText(pix.qrCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handlePay = async (): Promise<void> => {
    setError(null);
    if (tab !== 'pix') {
      setError('Pagamento por cartão indisponível no momento. Use PIX.');
      return;
    }
    if (!name.trim() || name.trim().length < 3) return setError('Informe seu nome completo.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError('E-mail inválido.');
    if (onlyDigits(cpf).length !== 11) return setError('CPF deve ter 11 dígitos.');
    const pd = onlyDigits(phone);
    if (pd.length < 10 || pd.length > 11) return setError('Celular deve ter DDD + número.');

    setLoading(true);
    try {
      const res = await fetch('/api/pix/create', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ plan: planId, name, email, cpf, phone }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? 'Falha ao gerar PIX.');
      } else {
        setPix(json as PixResult);
      }
    } catch {
      setError('Falha de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (paid) {
    return <ThankYou planName={plan.name} email={email} />;
  }

  return (
    <div className="min-h-screen" style={{ background: '#f5f6fa', color: '#1a1a2e' }}>
      <div
        className="bg-white border-b flex items-center justify-between"
        style={{ borderColor: '#e5e7eb', padding: '14px 20px' }}
      >
        <Link href="/" className="flex items-center gap-2.5 font-extrabold" style={{ color: '#2e356d' }}>
          <span
            className="grid place-items-center text-white"
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #ff8e53, #ff6d47)',
              fontSize: '1.1rem',
            }}
          >
            🍽️
          </span>
          Chefinhos Especiais
        </Link>
        <div className="flex items-center gap-1.5 font-bold text-sm" style={{ color: '#10b981' }}>
          🔒 Pagamento 100% seguro
        </div>
      </div>

      <div
        className="text-white text-center font-extrabold text-sm"
        style={{
          background: 'linear-gradient(90deg, #ff6b7a, #ff8e53)',
          padding: 10,
          letterSpacing: '0.02em',
        }}
      >
        ⏰ Oferta expira em <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{formatTime(seconds)}</strong> —
        desconto liberado nesta janela
      </div>

      <div
        className="grid gap-6"
        style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 20px', gridTemplateColumns: '1fr' }}
      >
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
          <div>
            <Section title="Seus dados" step={1}>
              <Field
                label="Nome completo"
                placeholder="Como aparece no seu documento"
                value={name}
                onChange={setName}
              />
              <Field
                label="E-mail"
                placeholder="seu@email.com"
                type="email"
                value={email}
                onChange={setEmail}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="CPF"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(v) => setCpf(maskCpf(v))}
                />
                <Field
                  label="Celular"
                  placeholder="(00) 00000-0000"
                  type="tel"
                  value={phone}
                  onChange={(v) => setPhone(maskPhone(v))}
                />
              </div>
            </Section>

            <Section title="Forma de pagamento" step={2}>
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                <PayTab active={tab === 'pix'} onClick={() => setTab('pix')} icon="📱" label="PIX" />
                <PayTab
                  active={false}
                  disabled
                  onClick={() => {}}
                  icon="💳"
                  label="Cartão"
                  badge="🔒"
                />
              </div>

              {tab === 'pix' && !pix && (
                <div
                  className="text-center"
                  style={{
                    background: 'linear-gradient(180deg, #fff7f3, #fff)',
                    border: '1px dashed rgba(255,123,84,0.35)',
                    borderRadius: 12,
                    padding: 18,
                  }}
                >
                  <h3 className="font-extrabold mb-1.5" style={{ color: '#2e356d' }}>
                    Pague com PIX e libere acesso na hora
                  </h3>
                  <p className="text-sm mb-2.5" style={{ color: '#6b7280' }}>
                    Preencha os dados acima e clique em <strong>Pagar agora</strong> para gerar o QR Code.
                  </p>
                  <div
                    className="flex justify-center gap-3 flex-wrap mt-2.5 font-bold text-xs"
                    style={{ color: '#10b981' }}
                  >
                    <span>✓ Aprovação instantânea</span>
                    <span>✓ Sem taxas</span>
                    <span>✓ Mais seguro</span>
                  </div>
                </div>
              )}

              {tab === 'pix' && pix && (
                <div
                  className="text-center"
                  style={{
                    background: 'linear-gradient(180deg, #fff7f3, #fff)',
                    border: '1px solid rgba(255,123,84,0.45)',
                    borderRadius: 12,
                    padding: 18,
                  }}
                >
                  <h3 className="font-extrabold mb-2" style={{ color: '#2e356d' }}>
                    PIX gerado — escaneie ou copie o código
                  </h3>
                  {qrImgSrc && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={qrImgSrc}
                      alt="QR Code PIX"
                      width={240}
                      height={240}
                      style={{ margin: '0 auto 12px', borderRadius: 12, background: '#fff', padding: 8 }}
                    />
                  )}
                  <textarea
                    readOnly
                    value={pix.qrCode}
                    rows={3}
                    className="w-full mb-2.5"
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '0.78rem',
                      padding: 10,
                      border: '1px solid #e5e7eb',
                      borderRadius: 8,
                      background: '#fafbfc',
                      resize: 'none',
                      color: '#1a1a2e',
                    }}
                  />
                  <button
                    type="button"
                    onClick={copyPix}
                    className="font-extrabold cursor-pointer"
                    style={{
                      background: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: 8,
                      padding: '10px 16px',
                      fontSize: '0.85rem',
                      color: '#2e356d',
                    }}
                  >
                    {copied ? '✓ Código copiado' : 'Copiar código PIX'}
                  </button>
                  <div className="text-xs mt-3" style={{ color: '#6b7280' }}>
                    Após o pagamento o acesso é liberado automaticamente no seu e-mail.
                  </div>
                  <button
                    type="button"
                    onClick={() => setPaid(true)}
                    className="mt-3 font-extrabold cursor-pointer"
                    style={{
                      background: 'linear-gradient(180deg, #10b981, #059669)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 10,
                      padding: '12px 18px',
                      fontSize: '0.9rem',
                      boxShadow: '0 8px 18px rgba(16,185,129,.28)',
                    }}
                  >
                    ✓ Já fiz o pagamento
                  </button>
                </div>
              )}

              {tab === 'card' && (
                <div>
                  <Field label="Número do cartão" placeholder="0000 0000 0000 0000" value="" onChange={() => {}} />
                  <Field label="Nome no cartão" placeholder="Como impresso" value="" onChange={() => {}} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Validade" placeholder="MM/AA" value="" onChange={() => {}} />
                    <Field label="CVV" placeholder="000" value="" onChange={() => {}} />
                  </div>
                </div>
              )}
            </Section>
          </div>

          <div>
            <div
              className="lg:sticky lg:top-5"
              style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 14,
                padding: 22,
                boxShadow: '0 4px 24px rgba(20,20,40,.06)',
              }}
            >
              <h2 className="text-base font-extrabold mb-3.5" style={{ color: '#2e356d' }}>
                Resumo do pedido
              </h2>
              <div
                className="flex gap-3.5 pb-4 mb-4"
                style={{ borderBottom: '1px solid #e5e7eb' }}
              >
                <div
                  className="flex-shrink-0 overflow-hidden bg-white"
                  style={{ width: 88, height: 88, borderRadius: 12, border: '1px solid #e5e7eb' }}
                >
                  <Image src={plan.img} alt={plan.name} width={176} height={176} className="w-full h-full object-cover" />
                </div>
                <div>
                  <strong className="block mb-1" style={{ color: '#2e356d' }}>
                    {plan.name}
                  </strong>
                  <span className="text-sm" style={{ color: '#6b7280' }}>
                    {plan.desc}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mb-3.5">
                <input
                  type="text"
                  placeholder="Cupom de desconto"
                  className="flex-1 outline-none"
                  style={{
                    padding: '10px 12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    fontSize: '0.88rem',
                    background: '#fafbfc',
                  }}
                />
                <button
                  type="button"
                  onClick={() => {}}
                  className="font-bold cursor-pointer"
                  style={{
                    padding: '10px 16px',
                    border: '1px solid #e5e7eb',
                    background: '#fff',
                    borderRadius: 8,
                    fontSize: '0.85rem',
                    color: '#2e356d',
                  }}
                >
                  Aplicar
                </button>
              </div>

              <div className="flex justify-between py-2 text-sm" style={{ color: '#6b7280' }}>
                <span>Subtotal</span>
                <span>
                  <del>{plan.subtotal}</del>
                </span>
              </div>
              <div className="flex justify-between py-2 text-sm font-bold" style={{ color: '#10b981' }}>
                <span>Desconto promocional</span>
                <span>{plan.discount}</span>
              </div>
              <div className="my-2" style={{ borderTop: '1px dashed #e5e7eb' }} />
              <div
                className="flex justify-between items-baseline font-black"
                style={{ padding: '14px 0 6px', color: '#2e356d' }}
              >
                <span>Total</span>
                <span style={{ fontSize: '1.7rem', color: '#ff7b54' }}>{plan.total}</span>
              </div>
              <div className="text-xs text-right mb-3.5" style={{ color: '#6b7280' }}>
                {plan.installments}
              </div>

              <button
                type="button"
                onClick={() => setPaid(true)}
                className="w-full font-bold cursor-pointer mb-2.5"
                style={{
                  padding: 10,
                  background: '#fef3c7',
                  border: '1px dashed #f59e0b',
                  borderRadius: 8,
                  fontSize: '0.78rem',
                  color: '#92400e',
                  letterSpacing: '0.02em',
                }}
              >
                🧪 [TESTE] Pular pra tela de obrigado
              </button>

              {error && (
                <div
                  className="mb-3 text-sm font-bold"
                  style={{
                    padding: 10,
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: 8,
                    color: '#991b1b',
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handlePay}
                disabled={loading || !!pix}
                className="w-full text-white font-black cursor-pointer uppercase"
                style={{
                  padding: 18,
                  background: pix
                    ? 'linear-gradient(180deg, #10b981, #059669)'
                    : 'linear-gradient(180deg, #ff8e53, #ff6d47)',
                  border: 'none',
                  borderRadius: 12,
                  fontSize: '1.05rem',
                  letterSpacing: '0.03em',
                  boxShadow: '0 12px 26px rgba(255,109,71,.32)',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {pix ? '✓ PIX gerado' : loading ? 'Gerando PIX…' : 'Pagar agora'}
              </button>

              <div
                className="mt-3.5 flex gap-2.5 items-center font-bold text-sm"
                style={{
                  padding: 12,
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: 10,
                  color: '#065f46',
                }}
              >
                🛡️ Garantia incondicional de 14 dias — devolução 100% sem perguntas
              </div>

              <div className="flex justify-center gap-3.5 flex-wrap mt-3.5 text-xs" style={{ color: '#6b7280' }}>
                <span>🔒 SSL 256bits</span>
                <span>✓ Compra segura</span>
                <span>📧 Acesso por e-mail</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="text-center mx-auto"
        style={{ fontSize: '0.78rem', color: '#6b7280', padding: '18px 20px 30px', maxWidth: 780 }}
      >
        Ao concluir a compra você aceita os Termos de Uso e a Política de Privacidade. Pagamento processado em ambiente
        criptografado.
        <br />© 2026 Chefinhos Especiais — Todos os direitos reservados.
      </div>
    </div>
  );
}

function Section({ title, step, children }: { title: string; step: number; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 14,
        padding: 22,
        marginBottom: 16,
        boxShadow: '0 4px 24px rgba(20,20,40,.06)',
      }}
    >
      <h2 className="font-extrabold text-base mb-3.5" style={{ color: '#2e356d' }}>
        <span
          className="inline-grid place-items-center text-white font-black mr-2"
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: '#ff7b54',
            fontSize: '0.78rem',
          }}
        >
          {step}
        </span>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-3.5">
      <label
        className="block font-bold mb-1.5 uppercase"
        style={{ fontSize: '0.82rem', color: '#6b7280', letterSpacing: '0.03em' }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full outline-none transition-all"
        style={{
          padding: '12px 14px',
          border: '1px solid #e5e7eb',
          borderRadius: 10,
          fontSize: '0.95rem',
          background: '#fafbfc',
        }}
      />
    </div>
  );
}

function PayTab({
  active,
  onClick,
  icon,
  label,
  disabled = false,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  disabled?: boolean;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={disabled ? 'Indisponível no momento' : undefined}
      className="flex items-center justify-between gap-2.5 font-extrabold text-sm transition-all"
      style={{
        padding: 14,
        border: `2px solid ${active ? '#ff7b54' : '#e5e7eb'}`,
        borderRadius: 12,
        background: active ? '#fff7f3' : disabled ? '#f3f4f6' : '#fff',
        color: active ? '#ff7b54' : disabled ? '#9ca3af' : '#1a1a2e',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.75 : 1,
      }}
    >
      <span className="flex items-center gap-2.5">
        <span style={{ fontSize: '1.3rem' }}>{icon}</span>
        {label}
      </span>
      {badge && (
        <span
          style={{
            fontSize: '0.95rem',
            color: '#6b7280',
          }}
          aria-label="Indisponível"
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function ThankYou({ planName, email }: { planName: string; email: string }) {
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const handleDownload = () => {
    setDownloadMsg(
      'Seu e-book ainda está em finalização — você receberá o link de download no seu e-mail assim que estiver pronto.'
    );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#f5f6fa', padding: '40px 20px', color: '#1a1a2e' }}
    >
      <div
        className="text-center"
        style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 18,
          padding: '40px 28px',
          maxWidth: 540,
          width: '100%',
          boxShadow: '0 12px 40px rgba(20,20,40,.08)',
        }}
      >
        <div
          className="mx-auto mb-5 grid place-items-center"
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            fontSize: '2rem',
            color: '#fff',
            boxShadow: '0 12px 28px rgba(16,185,129,.35)',
          }}
        >
          ✓
        </div>

        <h1 className="font-black mb-2" style={{ fontSize: '1.75rem', color: '#2e356d' }}>
          Muito obrigado pela compra!
        </h1>
        <p className="mb-1 font-bold" style={{ color: '#10b981' }}>
          Pagamento confirmado 🎉
        </p>
        <p className="mb-5" style={{ color: '#6b7280', fontSize: '0.95rem' }}>
          {planName}
          {email ? (
            <>
              <br />
              Enviamos uma cópia para <strong>{email}</strong>.
            </>
          ) : null}
        </p>

        <button
          type="button"
          onClick={handleDownload}
          className="font-black uppercase cursor-pointer w-full"
          style={{
            padding: 18,
            background: 'linear-gradient(180deg, #ff8e53, #ff6d47)',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            fontSize: '1rem',
            letterSpacing: '0.03em',
            boxShadow: '0 12px 26px rgba(255,109,71,.32)',
          }}
        >
          ⬇ Baixar meu e-book
        </button>

        {downloadMsg && (
          <div
            className="mt-4 text-sm font-bold"
            style={{
              padding: 12,
              background: '#fff7ed',
              border: '1px solid #fed7aa',
              borderRadius: 10,
              color: '#9a3412',
            }}
          >
            {downloadMsg}
          </div>
        )}

        <Link
          href="/"
          className="inline-block mt-5 font-bold text-sm"
          style={{ color: '#2e356d', textDecoration: 'underline' }}
        >
          ← Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Carregando…</div>}>
      <CheckoutInner />
    </Suspense>
  );
}

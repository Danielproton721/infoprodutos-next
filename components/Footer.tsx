export default function Footer() {
  return (
    <footer
      className="text-center"
      style={{
        background: 'var(--footer-bg)',
        color: 'rgba(255,255,255,0.8)',
        padding: '40px 24px',
        fontSize: '0.9rem',
        lineHeight: 1.6,
      }}
    >
      <div className="text-white font-black mb-3.5" style={{ fontSize: '1.1rem' }}>
        Chefinhos Especiais
      </div>
      <div className="mb-3.5">
        <a href="#" className="hover:text-white transition-colors">
          Política de Privacidade
        </a>
        <span className="mx-2 text-white/50">·</span>
        <a href="#" className="hover:text-white transition-colors">
          Termos de Uso
        </a>
        <span className="mx-2 text-white/50">·</span>
        <a href="#" className="hover:text-white transition-colors">
          Contato
        </a>
      </div>
      <div className="text-white/70" style={{ fontSize: '0.82rem' }}>
        © 2025 Chefinhos Especiais | Todos os direitos reservados | Produto digital — acesso imediato após pagamento
      </div>
    </footer>
  );
}

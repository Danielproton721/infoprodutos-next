export default function Navbar() {
  return (
    <header className="bg-white/80 backdrop-blur border-b border-[var(--border)] sticky top-0 z-40">
      <div className="container-page flex items-center justify-between py-3">
        <a href="#hero" className="flex items-center gap-2 font-extrabold text-[var(--title)]">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff8e53] to-[#ff6d47] text-white text-lg">
            🍽️
          </span>
          <span>Chefinhos Especiais</span>
        </a>
        <a
          href="#planos"
          className="hidden sm:inline-flex text-sm font-extrabold text-[var(--primary)] hover:text-[var(--primary-dark)]"
        >
          Garantir acesso →
        </a>
      </div>
    </header>
  );
}

'use client';

import { useEffect, useState } from 'react';

export default function StickyBar() {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (): void => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="fixed left-0 right-0 bottom-0 z-50 flex transition-transform duration-300"
      style={{
        boxShadow: '0 -8px 24px rgba(0,0,0,0.12)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
      }}
    >
      <button
        type="button"
        onClick={handleClick}
        className="flex-1 flex items-center justify-center font-black uppercase cursor-pointer border-0"
        style={{
          padding: '18px 14px',
          background: '#FACC15',
          color: '#1a1a2e',
          letterSpacing: '0.02em',
          fontSize: '0.95rem',
        }}
      >
        QUERO APROVEITAR AGORA
      </button>
    </div>
  );
}

import { Loader2 } from 'lucide-react';

export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh' }}>
      <div className="ambient-bg" />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <Loader2 className="btn--pulse" size={48} color="var(--color-violet-500)" style={{ animation: 'spin 2s linear infinite' }} />
        <p style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>{message}</p>
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

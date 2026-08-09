import { Link, useLocation } from 'react-router-dom';

export default function Header({ showSignIn = true, showBack = false, title }) {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <header className="header">
      <div className="header__inner container">
        {showBack ? (
          <Link to="/dashboard" className="header__back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>
        ) : (
          <Link to="/" className="header__logo">
            <span className="header__logo-text">ABTalks</span>
          </Link>
        )}

        {title && <h1 className="header__title">{title}</h1>}

        <div className="header__actions">
          {isLanding && showSignIn && (
            <Link to="/dashboard" className="btn btn--secondary header__signin">
              Sign in
            </Link>
          )}
        </div>
      </div>

      <style>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 50;
          border-bottom: 1px solid var(--color-border);
          background: rgba(10, 10, 15, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .header__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 56px;
        }
        .header__logo-text {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 800;
          background: var(--gradient-hero);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .header__back {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-lg);
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
        }
        .header__back:hover {
          background: rgba(255,255,255,0.06);
          color: var(--color-text-primary);
        }
        .header__title {
          font-size: var(--text-base);
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        .header__signin {
          padding: 6px 16px;
          font-size: var(--text-sm);
        }
        .header__actions {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
      `}</style>
    </header>
  );
}

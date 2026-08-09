import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Header({ showSignIn = true, showBack = false, title }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === '/';
  const { user, userData, loginWithGoogle, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to log in');
    }
  };

  const handleSignOut = async () => {
    await logout();
    setDropdownOpen(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

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
          {user ? (
            <div className="header__user-menu" ref={dropdownRef} style={{ position: 'relative' }}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}
              >
                <img 
                  src={userData?.avatarUrl || user.photoURL || `https://ui-avatars.com/api/?name=${user.email}`} 
                  alt="Avatar" 
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid var(--color-border)', objectFit: 'cover' }}
                />
              </button>
              
              {dropdownOpen && (
                <div className="glass-card" style={{
                  position: 'absolute',
                  top: 'calc(100% + var(--space-2))',
                  right: 0,
                  width: '200px',
                  padding: 'var(--space-2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-1)',
                  zIndex: 50
                }}>
                  <Link 
                    to="/profile" 
                    className="btn btn--secondary" 
                    style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User size={16} /> My Profile
                  </Link>
                  <button 
                    onClick={handleSignOut} 
                    className="btn btn--secondary" 
                    style={{ width: '100%', justifyContent: 'flex-start', border: 'none', color: 'var(--color-red-400)' }}
                  >
                    <LogOut size={16} /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            isLanding && showSignIn && (
              <button onClick={handleSignIn} className="btn btn--secondary header__signin">
                Sign in
              </button>
            )
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

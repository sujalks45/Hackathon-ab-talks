import { NavLink } from 'react-router-dom';
import { Home, LayoutList, Plus, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function BottomNav() {
  const { userData } = useAuth();
  const currentDay = userData?.currentDay || 1;

  return (
    <nav className="bottom-nav">
      <NavLink to="/dashboard" end className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}>
        <Home size={20} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/dashboard" className={({ isActive }) => `bottom-nav__item ${isActive ? '' : ''}`}>
        <LayoutList size={20} />
        <span>Tasks</span>
      </NavLink>
      <NavLink to={`/day/${currentDay}`} className={({ isActive }) => `bottom-nav__item bottom-nav__item--submit ${isActive ? 'bottom-nav__item--active' : ''}`}>
        <div className="bottom-nav__submit-btn">
          <Plus size={22} strokeWidth={2.5} />
        </div>
        <span>Submit</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}>
        <User size={20} />
        <span>Profile</span>
      </NavLink>

      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-around;
          height: var(--bottom-nav-height);
          background: rgba(10, 10, 15, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-top: 1px solid var(--color-border);
          padding: 0 var(--space-2);
          padding-bottom: env(safe-area-inset-bottom);
        }
        .bottom-nav__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          font-size: 10px;
          font-weight: 500;
          color: var(--color-text-muted);
          transition: color var(--transition-fast);
          padding: var(--space-2) var(--space-3);
          text-decoration: none;
        }
        .bottom-nav__item--active {
          color: var(--color-violet-400);
        }
        .bottom-nav__submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background: var(--gradient-primary);
          color: white;
          box-shadow: var(--shadow-glow-violet);
          margin-top: -12px;
          transition: all var(--transition-base);
        }
        .bottom-nav__item--submit:hover .bottom-nav__submit-btn,
        .bottom-nav__item--submit.bottom-nav__item--active .bottom-nav__submit-btn {
          transform: scale(1.08);
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
        }
        @media (min-width: 768px) {
          .bottom-nav {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}

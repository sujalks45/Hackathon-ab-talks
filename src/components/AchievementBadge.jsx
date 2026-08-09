import { Lock } from 'lucide-react';

export default function AchievementBadge({ achievement }) {
  return (
    <div className={`achievement ${achievement.earned ? 'achievement--earned' : 'achievement--locked'}`}>
      <div className="achievement__icon">
        {achievement.earned ? (
          <span className="achievement__emoji">{achievement.emoji}</span>
        ) : (
          <Lock size={18} />
        )}
      </div>
      <div className="achievement__info">
        <span className="achievement__title">{achievement.title}</span>
        <span className="achievement__desc">{achievement.description}</span>
      </div>

      <style>{`
        .achievement {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-xl);
          transition: all var(--transition-base);
        }
        .achievement--earned {
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.15);
        }
        .achievement--locked {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--color-border);
          opacity: 0.5;
        }
        .achievement__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-lg);
          background: rgba(255, 255, 255, 0.04);
          flex-shrink: 0;
        }
        .achievement__emoji {
          font-size: 20px;
        }
        .achievement--locked .achievement__icon {
          color: var(--color-text-muted);
        }
        .achievement__info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .achievement__title {
          font-family: var(--font-display);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-text-primary);
        }
        .achievement--locked .achievement__title {
          color: var(--color-text-secondary);
        }
        .achievement__desc {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
}

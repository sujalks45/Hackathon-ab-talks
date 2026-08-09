import { Shield, Flame, Trophy } from 'lucide-react';

export default function StreakCard({ student }) {
  return (
    <div className="streak-card glass-card glass-card--static">
      <div className="streak-card__header">
        <div className="streak-card__fire">
          <Flame size={28} className="streak-card__fire-icon" />
          <span className="streak-card__count count-up streak-fire">
            {student.currentStreak}
          </span>
        </div>
        <span className="streak-card__label">Day Streak</span>
      </div>

      <div className="streak-card__stats">
        <div className="streak-card__stat">
          <Trophy size={14} />
          <span>Longest: {student.longestStreak}</span>
        </div>
        {student.streakShields > 0 && (
          <div className="streak-card__stat streak-card__stat--shield">
            <Shield size={14} />
            <span>{student.streakShields} Shield{student.streakShields > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      <div className="streak-card__heatmap">
        {student.weeklyActivity.map((day, i) => (
          <div key={i} className="streak-card__day-col">
            <div
              className={`streak-card__dot streak-card__dot--${day.status}`}
              title={`${day.day}: ${day.status}`}
            />
            <span className="streak-card__day-label">{day.day}</span>
          </div>
        ))}
      </div>

      <style>{`
        .streak-card {
          padding: var(--space-5);
          text-align: center;
        }
        .streak-card__header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-1);
        }
        .streak-card__fire {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        .streak-card__fire-icon {
          color: var(--color-amber-500);
          filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.5));
        }
        .streak-card__count {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--color-text-primary);
        }
        .streak-card__label {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          font-weight: 500;
        }
        .streak-card__stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          margin-top: var(--space-4);
        }
        .streak-card__stat {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }
        .streak-card__stat--shield {
          color: var(--color-violet-400);
        }
        .streak-card__heatmap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
          margin-top: var(--space-5);
        }
        .streak-card__day-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-1);
        }
        .streak-card__dot {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          transition: all var(--transition-base);
        }
        .streak-card__dot--completed {
          background: var(--color-emerald-500);
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
        }
        .streak-card__dot--missed {
          background: var(--color-red-500);
          opacity: 0.6;
        }
        .streak-card__dot--pending {
          background: var(--color-amber-500);
          animation: pendingPulse 2s ease-in-out infinite;
        }
        .streak-card__dot--upcoming {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--color-border);
        }
        .streak-card__day-label {
          font-size: 10px;
          color: var(--color-text-muted);
          font-weight: 500;
        }
        @keyframes pendingPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

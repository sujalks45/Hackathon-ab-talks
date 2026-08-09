import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Zap } from 'lucide-react';

export default function TaskCard({ challenge, submission, dayNumber }) {
  const status = submission?.status || 'upcoming';

  const statusConfig = {
    completed: { label: '✅ Completed', className: 'badge--emerald' },
    pending: { label: '⏳ Pending', className: 'badge--amber' },
    missed: { label: '❌ Missed', className: 'badge--red' },
    upcoming: { label: '🔜 Upcoming', className: 'badge--violet' },
  };

  const difficultyConfig = {
    Easy: 'badge--emerald',
    Medium: 'badge--amber',
    Hard: 'badge--red',
  };

  const config = statusConfig[status];

  return (
    <Link to={`/day/${dayNumber}`} className="task-card glass-card">
      <div className="task-card__top">
        <span className="task-card__day">Day {dayNumber}</span>
        <span className={`badge ${config.className}`}>{config.label}</span>
      </div>

      <h3 className="task-card__title">{challenge.title}</h3>

      <div className="task-card__meta">
        <span className={`badge ${difficultyConfig[challenge.difficulty]}`}>
          <Zap size={10} />
          {challenge.difficulty}
        </span>
        <span className="task-card__time">
          <Clock size={12} />
          {challenge.estimatedTime}
        </span>
      </div>

      <div className="task-card__action">
        <span>{status === 'pending' ? "Start Today's Task" : 'View Task'}</span>
        <ArrowRight size={16} />
      </div>

      <style>{`
        .task-card {
          display: block;
          padding: var(--space-5);
          text-decoration: none;
          color: inherit;
        }
        .task-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-3);
        }
        .task-card__day {
          font-family: var(--font-display);
          font-size: var(--text-xs);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-violet-400);
        }
        .task-card__title {
          font-size: var(--text-lg);
          font-weight: 700;
          margin-bottom: var(--space-3);
          line-height: 1.3;
        }
        .task-card__meta {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
        }
        .task-card__time {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }
        .task-card__action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--space-3);
          border-top: 1px solid var(--color-border);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-violet-400);
        }
      `}</style>
    </Link>
  );
}

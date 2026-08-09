import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import SubmissionForm from '../components/SubmissionForm';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import challengesData from '../data/challenges.json';
import submissionsData from '../data/submissions.json';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Zap,
  BookOpen,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Timer,
} from 'lucide-react';

export default function ChallengeDay() {
  const { dayNumber } = useParams();
  const day = parseInt(dayNumber, 10);
  const challenge = challengesData.find(c => c.day === day);
  const { user, userData } = useAuth();
  
  // Later we should fetch real submissions. For now, checking if a real submission exists isn't fully implemented in state,
  // so we'll mock it based on static data or treat it as pending.
  const submission = submissionsData.find(s => s.day === day);
  const totalDays = 60;
  const progress = (day / totalDays) * 100;

  if (!challenge) {
    return (
      <div className="challenge-day page">
        <Header showBack title="Not Found" />
        <BottomNav />
        <div className="container fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h2>Day {day} not found</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
            This challenge day doesn't exist yet.
          </p>
          <Link to="/dashboard" className="btn btn--primary" style={{ marginTop: '1.5rem' }}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = {
    completed: { label: 'Submitted', icon: CheckCircle2, color: 'emerald' },
    pending: { label: 'Pending', icon: Timer, color: 'amber' },
    missed: { label: 'Missed', icon: XCircle, color: 'red' },
  };

  const status = submission?.status || 'pending';
  const config = statusConfig[status] || statusConfig.pending;
  const StatusIcon = config.icon;

  const difficultyConfig = {
    Easy: 'badge--emerald',
    Medium: 'badge--amber',
    Hard: 'badge--red',
  };

  const handleSubmission = async (data) => {
    if (!user) return;
    try {
      const submissionRef = doc(db, 'users', user.uid, 'submissions', `day-${day}`);
      await setDoc(submissionRef, {
        day,
        ...data,
        status: 'completed',
        submittedAt: new Date().toISOString()
      });
      
      // Update user streak and completion
      if (userData) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          totalCompleted: (userData.totalCompleted || 0) + 1,
          currentStreak: (userData.currentStreak || 0) + 1
        });
      }
      toast.success('Proof of Work submitted! 🎉');
    } catch (err) {
      console.error('Error submitting proof of work', err);
      toast.error('Failed to submit proof of work');
    }
  };

  return (
    <div className="challenge-day page">
      <Header showBack title={`Day ${day}`} />
      <BottomNav />
      <div className="ambient-bg" />

      <div className="container fade-in">
        {/* Day Progress Header */}
        <section className="cd__header">
          <div className="cd__day-info">
            <span className="cd__day-number">Day {day}</span>
            <span className="cd__day-of"> of {totalDays}</span>
          </div>
          <div className="cd__progress-bar">
            <div
              className="cd__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* Status Badge */}
        <section className="cd__status">
          <div className={`cd__status-badge cd__status-badge--${config.color}`}>
            <StatusIcon size={16} />
            <span>{config.label}</span>
          </div>
          {submission?.submittedAt && (
            <span className="cd__status-time">
              {new Date(submission.submittedAt).toLocaleString('en-IN', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </span>
          )}
        </section>

        {/* Task Card */}
        <section className="cd__task glass-card glass-card--static slide-up">
          <div className="cd__task-header">
            <h1 className="cd__task-title">{challenge.title}</h1>
            <div className="cd__task-meta">
              <span className={`badge ${difficultyConfig[challenge.difficulty]}`}>
                <Zap size={10} />
                {challenge.difficulty}
              </span>
              <span className="cd__task-time">
                <Clock size={13} />
                {challenge.estimatedTime}
              </span>
              <span className="badge badge--violet">{challenge.track}</span>
            </div>
          </div>

          <div className="cd__task-body">
            <p className="cd__task-desc">{challenge.description}</p>
          </div>
        </section>

        {/* Learning Objectives */}
        {challenge.objectives && challenge.objectives.length > 0 && (
          <section className="cd__objectives glass-card glass-card--static slide-up stagger-1">
            <h2 className="cd__sub-title">
              <BookOpen size={18} />
              Learning Objectives
            </h2>
            <ul className="cd__objectives-list">
              {challenge.objectives.map((obj, i) => (
                <li key={i} className="cd__objective">
                  <span className="cd__objective-check">
                    {status === 'completed' ? '✅' : '○'}
                  </span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Resources */}
        {challenge.resources && challenge.resources.length > 0 && (
          <section className="cd__resources glass-card glass-card--static slide-up stagger-2">
            <h2 className="cd__sub-title">
              <ExternalLink size={18} />
              Resources
            </h2>
            <div className="cd__resources-list">
              {challenge.resources.map((res, i) => (
                <a
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cd__resource"
                >
                  <span className="cd__resource-title">{res.title}</span>
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Submission Form */}
        <section className="cd__submission glass-card glass-card--static slide-up stagger-3">
          <h2 className="cd__sub-title">Submit Proof of Work</h2>
          <SubmissionForm
            existingSubmission={submission}
            onSubmit={handleSubmission}
          />
        </section>

        {/* Day Navigation */}
        <nav className="cd__nav slide-up stagger-4">
          {day > 1 ? (
            <Link to={`/day/${day - 1}`} className="cd__nav-btn btn btn--secondary">
              <ChevronLeft size={18} />
              Day {day - 1}
            </Link>
          ) : (
            <div />
          )}
          {day < totalDays ? (
            <Link to={`/day/${day + 1}`} className="cd__nav-btn btn btn--secondary">
              Day {day + 1}
              <ChevronRight size={18} />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>

      <style>{`
        /* Header */
        .cd__header {
          padding: var(--space-6) 0 var(--space-4);
        }
        .cd__day-info {
          margin-bottom: var(--space-3);
        }
        .cd__day-number {
          font-family: var(--font-display);
          font-size: var(--text-sm);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-violet-400);
        }
        .cd__day-of {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
        }
        .cd__progress-bar {
          height: 4px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .cd__progress-fill {
          height: 100%;
          background: var(--gradient-primary);
          border-radius: var(--radius-full);
          transition: width 1s ease-out;
        }

        /* Status */
        .cd__status {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-5);
        }
        .cd__status-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: 600;
        }
        .cd__status-badge--emerald {
          background: rgba(16, 185, 129, 0.15);
          color: var(--color-emerald-400);
          border: 1px solid rgba(16, 185, 129, 0.25);
        }
        .cd__status-badge--amber {
          background: rgba(245, 158, 11, 0.15);
          color: var(--color-amber-400);
          border: 1px solid rgba(245, 158, 11, 0.25);
        }
        .cd__status-badge--red {
          background: rgba(239, 68, 68, 0.15);
          color: var(--color-red-400);
          border: 1px solid rgba(239, 68, 68, 0.25);
        }
        .cd__status-time {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
        }

        /* Task */
        .cd__task {
          padding: var(--space-6);
          margin-bottom: var(--space-5);
        }
        .cd__task-title {
          font-size: var(--text-xl);
          font-weight: 800;
          line-height: 1.3;
          margin-bottom: var(--space-4);
        }
        .cd__task-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: var(--space-2);
        }
        .cd__task-time {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }
        .cd__task-body {
          margin-top: var(--space-5);
          padding-top: var(--space-5);
          border-top: 1px solid var(--color-border);
        }
        .cd__task-desc {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          line-height: 1.8;
        }

        /* Sub sections */
        .cd__sub-title {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-base);
          font-weight: 700;
          margin-bottom: var(--space-4);
          color: var(--color-text-primary);
        }

        /* Objectives */
        .cd__objectives {
          padding: var(--space-5);
          margin-bottom: var(--space-5);
        }
        .cd__objectives-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .cd__objective {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          line-height: 1.5;
        }
        .cd__objective-check {
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* Resources */
        .cd__resources {
          padding: var(--space-5);
          margin-bottom: var(--space-5);
        }
        .cd__resources-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .cd__resource {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-lg);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--color-border);
          transition: all var(--transition-fast);
          text-decoration: none;
        }
        .cd__resource:hover {
          border-color: var(--color-border-hover);
          background: rgba(255, 255, 255, 0.05);
        }
        .cd__resource-title {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--color-violet-400);
        }
        .cd__resource svg {
          color: var(--color-text-muted);
        }

        /* Submission */
        .cd__submission {
          padding: var(--space-6);
          margin-bottom: var(--space-5);
        }

        /* Navigation */
        .cd__nav {
          display: flex;
          justify-content: space-between;
          padding: var(--space-4) 0 var(--space-8);
        }
        .cd__nav-btn {
          padding: var(--space-2) var(--space-4);
          font-size: var(--text-sm);
        }
      `}</style>
    </div>
  );
}

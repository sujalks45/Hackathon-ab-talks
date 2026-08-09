import { useState } from 'react';
import { GitBranch, ExternalLink, Send, Check, PartyPopper } from 'lucide-react';

// Simple inline SVG icons for GitHub and LinkedIn (not available in lucide-react)
const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 110-4.125 2.062 2.062 0 010 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function SubmissionForm({ onSubmit, existingSubmission }) {
  const [githubUrl, setGithubUrl] = useState(existingSubmission?.githubUrl || '');
  const [linkedinUrl, setLinkedinUrl] = useState(existingSubmission?.linkedinUrl || '');
  const [notes, setNotes] = useState(existingSubmission?.notes || '');
  const [submitted, setSubmitted] = useState(existingSubmission?.status === 'completed');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!githubUrl || !linkedinUrl) return;
    
    setSubmitted(true);
    setIsEditing(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    onSubmit?.({ githubUrl, linkedinUrl, notes });
  };

  const handleEdit = () => {
    setSubmitted(false);
    setIsEditing(true);
  };

  const confettiColors = ['#8B5CF6', '#6366F1', '#D946EF', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="submission-form">
      {showConfetti && (
        <div className="confetti-container">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: confettiColors[i % confettiColors.length],
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                width: `${6 + Math.random() * 8}px`,
                height: `${6 + Math.random() * 8}px`,
              }}
            />
          ))}
        </div>
      )}

      {submitted && !isEditing ? (
        <div className="submission-form__success slide-up">
          <div className="submission-form__success-icon">
            <PartyPopper size={32} />
          </div>
          <h3>Proof of Work Submitted!</h3>
          <p>Great job staying consistent. Keep the streak alive! 🔥</p>
          <div className="submission-form__links">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn--secondary">
              <GithubIcon size={16} />
              View Commit
            </a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn btn--secondary">
              <LinkedinIcon size={16} />
              View Post
            </a>
          </div>
          <button onClick={handleEdit} className="btn btn--secondary" style={{ marginTop: 'var(--space-4)', margin: 'var(--space-4) auto 0', display: 'flex' }}>
            Edit Submission
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="submission-form__form slide-up">
          <div className="submission-form__field">
            <label className="submission-form__label">
              <GithubIcon size={16} />
              GitHub Commit / Repository URL
            </label>
            <input
              type="url"
              className="input"
              placeholder="https://github.com/your-repo/commit/..."
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              required
            />
          </div>

          <div className="submission-form__field">
            <label className="submission-form__label">
              <LinkedinIcon size={16} />
              LinkedIn Post URL
            </label>
            <input
              type="url"
              className="input"
              placeholder="https://linkedin.com/posts/..."
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              required
            />
          </div>

          <div className="submission-form__field">
            <label className="submission-form__label">
              Notes (optional)
            </label>
            <textarea
              className="input"
              placeholder="What did you learn today? Any challenges?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="btn btn--success btn--large btn--full"
            disabled={!githubUrl || !linkedinUrl}
          >
            <Send size={18} />
            Submit Proof of Work
          </button>
        </form>
      )}

      <style>{`
        .submission-form {
          position: relative;
        }
        .submission-form__form {
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
        }
        .submission-form__field {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .submission-form__label {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-text-secondary);
        }
        .submission-form__success {
          text-align: center;
          padding: var(--space-8) var(--space-4);
        }
        .submission-form__success-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          border-radius: var(--radius-full);
          background: rgba(16, 185, 129, 0.15);
          color: var(--color-emerald-400);
          margin: 0 auto var(--space-4);
        }
        .submission-form__success h3 {
          font-size: var(--text-xl);
          margin-bottom: var(--space-2);
        }
        .submission-form__success p {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-6);
        }
        .submission-form__links {
          display: flex;
          gap: var(--space-3);
          justify-content: center;
        }
        .confetti-container {
          position: fixed;
          inset: 0;
          z-index: 1000;
          pointer-events: none;
        }
        button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

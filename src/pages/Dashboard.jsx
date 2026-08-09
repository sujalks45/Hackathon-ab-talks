import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import StreakCard from '../components/StreakCard';
import ProgressRing from '../components/ProgressRing';
import TaskCard from '../components/TaskCard';
import AchievementBadge from '../components/AchievementBadge';
import LoadingScreen from '../components/LoadingScreen';
import { useAuth } from '../contexts/AuthContext';
import challengesData from '../data/challenges.json';
import submissionsData from '../data/submissions.json';
import { Award, ChevronRight, Shield, AlertTriangle, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const { userData } = useAuth();
  
  if (!userData) {
    return <LoadingScreen message="Loading your dashboard..." />;
  }

  const student = userData;
  // TODO: Fetch real submissions from Firestore in the future
  const todayChallenge = challengesData.find(c => c.day === student.currentDay);
  const todaySubmission = submissionsData.find(s => s.day === student.currentDay);
  const progress = Math.round((student.totalCompleted / student.totalDays) * 100) || 0;
  const earnedAchievements = student.achievements?.filter(a => a.earned) || [];
  const hasMissedDay = submissionsData.some(s => s.status === 'missed');
  const isFirstDay = student.currentDay === 1 && student.currentStreak === 0;

  // Placeholder leaderboard until we fetch real users from Firestore
  const leaderboard = [
    { rank: 1, name: "Arjun Patel", avatar: "AP", streak: 12, completed: 12 },
    { rank: 2, name: "Neha Gupta", avatar: "NG", streak: 11, completed: 12 },
    { rank: 3, name: "Rahul Singh", avatar: "RS", streak: 11, completed: 11 }
  ];

  return (
    <div className="dashboard page">
      <Header showSignIn={false} />
      <BottomNav />
      <div className="ambient-bg" />

      <div className="container fade-in">
        {/* Greeting */}
        <section className="dashboard__greeting">
          <div className="dashboard__greeting-left">
            <p className="dashboard__greeting-hello">Good evening,</p>
            <h1 className="dashboard__greeting-name">{student.name.split(' ')[0]} 👋</h1>
            <p className="dashboard__greeting-track">
              <span className="badge badge--violet">{student.track}</span>
            </p>
          </div>
          <div className="dashboard__avatar">
            {student.avatar}
          </div>
        </section>

        {/* First Day Welcome */}
        {isFirstDay && (
          <section className="dashboard__welcome glass-card glass-card--static slide-up">
            <div className="dashboard__welcome-emoji">🚀</div>
            <h2>Your journey begins today!</h2>
            <p>Welcome to the 60-Day Challenge. Complete your first task and start building your streak.</p>
            <Link to={`/day/${student.currentDay}`} className="btn btn--primary btn--large btn--full">
              Start Day 1
            </Link>
          </section>
        )}

        {/* Missed Day Warning */}
        {hasMissedDay && !isFirstDay && (
          <section className="dashboard__warning slide-up">
            <AlertTriangle size={18} />
            <div>
              <strong>Don't break your streak!</strong>
              <p>You missed a day. Stay consistent — submit today to keep going. 💪</p>
            </div>
          </section>
        )}

        {/* Streak Shield Banner */}
        {student.streakShields > 0 && (
          <section className="dashboard__shield-banner slide-up stagger-1">
            <Shield size={18} />
            <span>You have <strong>{student.streakShields} Streak Shield{student.streakShields > 1 ? 's' : ''}</strong> — miss a day and your streak is protected!</span>
          </section>
        )}

        {/* Streak Card */}
        <section className="slide-up stagger-1">
          <StreakCard student={{...student, weeklyActivity: [
            { day: "Mon", status: "completed" },
            { day: "Tue", status: "completed" },
            { day: "Wed", status: "completed" },
            { day: "Thu", status: "pending" },
            { day: "Fri", status: "upcoming" },
            { day: "Sat", status: "upcoming" },
            { day: "Sun", status: "upcoming" }
          ]}} />
        </section>

        {/* Today's Task */}
        {todayChallenge && (
          <section className="dashboard__section slide-up stagger-2">
            <div className="dashboard__section-header">
              <h2 className="dashboard__section-title">Today's Task</h2>
            </div>
            <TaskCard
              challenge={todayChallenge}
              submission={todaySubmission}
              dayNumber={student.currentDay}
            />
          </section>
        )}

        {/* Progress */}
        <section className="dashboard__progress slide-up stagger-3">
          <div className="dashboard__progress-ring">
            <ProgressRing progress={progress} size={140} strokeWidth={10}>
              <span className="dashboard__progress-pct">{progress}%</span>
              <span className="dashboard__progress-label">Complete</span>
            </ProgressRing>
          </div>
          <div className="dashboard__progress-stats">
            <div className="dashboard__progress-stat">
              <strong>{student.totalCompleted}</strong>
              <span>Days Done</span>
            </div>
            <div className="dashboard__progress-stat">
              <strong>{student.totalDays - student.totalCompleted}</strong>
              <span>Days Left</span>
            </div>
            <div className="dashboard__progress-stat">
              <strong>#{student.rank || 0}</strong>
              <span>Your Rank</span>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="dashboard__section slide-up stagger-4">
          <div className="dashboard__section-header">
            <h2 className="dashboard__section-title">
              <Award size={18} /> Achievements
            </h2>
            <span className="dashboard__section-count">{earnedAchievements.length}/{student.achievements?.length || 0}</span>
          </div>
          {(!student.achievements || student.achievements.length === 0) ? (
            <div className="glass-card glass-card--static" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
              <Sparkles size={32} color="var(--color-text-muted)" style={{ margin: '0 auto var(--space-3)' }} />
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
                Complete your first 3 days to unlock your first badge!
              </p>
            </div>
          ) : (
            <div className="dashboard__achievements">
              {student.achievements.map((a) => (
                <AchievementBadge key={a.id} achievement={a} />
              ))}
            </div>
          )}
        </section>

        {/* Leaderboard */}
        <section className="dashboard__section slide-up stagger-5">
          <div className="dashboard__section-header">
            <h2 className="dashboard__section-title">🏆 Leaderboard</h2>
          </div>
          <div className="dashboard__leaderboard glass-card glass-card--static">
            {leaderboard.map((entry, i) => (
              <div key={i} className="dashboard__lb-row">
                <div className="dashboard__lb-rank">
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                </div>
                <div className="dashboard__lb-avatar">{entry.avatar}</div>
                <div className="dashboard__lb-info">
                  <span className="dashboard__lb-name">{entry.name}</span>
                  <span className="dashboard__lb-streak">🔥 {entry.streak} streak</span>
                </div>
                <span className="dashboard__lb-completed">{entry.completed}/60</span>
              </div>
            ))}
            <div className="dashboard__lb-row dashboard__lb-row--self">
              <div className="dashboard__lb-rank">#{student.rank || 0}</div>
              <div className="dashboard__lb-avatar dashboard__lb-avatar--self">{student.avatar}</div>
              <div className="dashboard__lb-info">
                <span className="dashboard__lb-name">You</span>
                <span className="dashboard__lb-streak">🔥 {student.currentStreak} streak</span>
              </div>
              <span className="dashboard__lb-completed">{student.totalCompleted}/60</span>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        /* Greeting */
        .dashboard__greeting {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: var(--space-6) 0 var(--space-5);
        }
        .dashboard__greeting-hello {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }
        .dashboard__greeting-name {
          font-size: var(--text-2xl);
          font-weight: 800;
          margin: var(--space-1) 0 var(--space-2);
        }
        .dashboard__avatar {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-full);
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--text-sm);
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }

        /* Welcome */
        .dashboard__welcome {
          text-align: center;
          padding: var(--space-8) var(--space-5);
          margin-bottom: var(--space-5);
        }
        .dashboard__welcome-emoji {
          font-size: 40px;
          margin-bottom: var(--space-3);
        }
        .dashboard__welcome h2 {
          font-size: var(--text-xl);
          margin-bottom: var(--space-2);
        }
        .dashboard__welcome p {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-6);
        }

        /* Warning */
        .dashboard__warning {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          padding: var(--space-4);
          border-radius: var(--radius-xl);
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.2);
          margin-bottom: var(--space-5);
          color: var(--color-amber-400);
        }
        .dashboard__warning strong {
          display: block;
          font-size: var(--text-sm);
          color: var(--color-amber-400);
        }
        .dashboard__warning p {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
          margin-top: 2px;
        }

        /* Shield Banner */
        .dashboard__shield-banner {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-xl);
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.15);
          margin-bottom: var(--space-5);
          font-size: var(--text-xs);
          color: var(--color-violet-400);
        }
        .dashboard__shield-banner strong {
          color: var(--color-violet-400);
        }

        /* Sections */
        .dashboard__section {
          margin-top: var(--space-6);
        }
        .dashboard__section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-4);
        }
        .dashboard__section-title {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-lg);
          font-weight: 700;
        }
        .dashboard__section-count {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
          font-weight: 600;
        }

        /* Progress */
        .dashboard__progress {
          display: flex;
          align-items: center;
          gap: var(--space-6);
          padding: var(--space-6);
          margin-top: var(--space-6);
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-2xl);
          backdrop-filter: blur(20px);
        }
        .dashboard__progress-ring {
          flex-shrink: 0;
        }
        .dashboard__progress-pct {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 800;
        }
        .dashboard__progress-label {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
          font-weight: 500;
        }
        .dashboard__progress-stats {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          flex: 1;
        }
        .dashboard__progress-stat {
          display: flex;
          flex-direction: column;
        }
        .dashboard__progress-stat strong {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
        }
        .dashboard__progress-stat span {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        /* Achievements */
        .dashboard__achievements {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        /* Leaderboard */
        .dashboard__leaderboard {
          padding: var(--space-2);
          display: flex;
          flex-direction: column;
        }
        .dashboard__lb-row {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-lg);
        }
        .dashboard__lb-row--self {
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.15);
          margin-top: var(--space-2);
        }
        .dashboard__lb-rank {
          font-size: var(--text-lg);
          min-width: 32px;
          text-align: center;
        }
        .dashboard__lb-avatar {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--text-xs);
          font-weight: 700;
          flex-shrink: 0;
        }
        .dashboard__lb-avatar--self {
          background: var(--gradient-primary);
          color: white;
        }
        .dashboard__lb-info {
          flex: 1;
          min-width: 0;
        }
        .dashboard__lb-name {
          display: block;
          font-size: var(--text-sm);
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dashboard__lb-streak {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }
        .dashboard__lb-completed {
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--color-text-secondary);
        }
      `}</style>
    </div>
  );
}

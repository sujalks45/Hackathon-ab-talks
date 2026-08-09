import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Code,
  Trophy,
  Users,
  FolderGit2,
  Briefcase,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Flame,
  Star,
} from 'lucide-react';

const testimonials = [
  {
    name: 'Samridhi Gupta',
    college: 'Axis Institute of Technology, Kanpur',
    text: 'The 60-Day Challenge reshaped how I approach coding and discipline. Sixty days later, I don\'t just write better code — I finish what I start.',
    initials: 'SG',
  },
  {
    name: 'Vivek Kumar',
    college: 'IT Leader · 20+ years experience',
    text: 'I wasn\'t looking for another certificate. With over 20 years in IT leadership, this challenge made me feel like a beginner again — and honestly that was the best part.',
    initials: 'VK',
  },
  {
    name: 'Rida Khan',
    college: 'AI Enthusiast',
    text: 'I joined with curiosity but also with doubts about consistency. To my surprise, I did it. This wasn\'t just a challenge — it taught me that consistency can turn uncertainty into achievement.',
    initials: 'RK',
  },
  {
    name: 'Devpal Singh Anand',
    college: 'Software Engineer',
    text: 'From exploring concepts to building production-ready projects, every challenge strengthened my technical skills and encouraged me to think like an engineer.',
    initials: 'DA',
  },
  {
    name: 'Lakshay',
    college: 'B.Tech Student',
    text: '60 days ago, I used AI mainly for everyday questions. Today I use it to build complete projects, automate workflows, and solve real-world problems.',
    initials: 'LK',
  },
];

const tracks = [
  {
    name: '60-Day Coding Challenge',
    desc: 'One real task every day across AI, Data Science, or Software Engineering. Build a streak and a public portfolio.',
    duration: '60 days',
    color: 'violet',
    status: 'Enrolling now',
    cta: 'Start the challenge',
  },
  {
    name: '31 Days AI Cohort',
    desc: 'Build and deploy a production AI chatbot in 31 days. Learn RAG, agents, MCP, and get in front of recruiters.',
    duration: '31 days',
    color: 'indigo',
    status: 'Applications open',
    cta: 'Apply now',
  },
  {
    name: 'Claude Challenge',
    desc: 'Master Claude through focused prompt-engineering tasks and build practical AI workflows.',
    duration: '60 days',
    tags: ['AI mastery'],
    color: 'amber',
    status: 'New',
    cta: 'Join the track',
  },
];

const steps = [
  {
    icon: GraduationCap,
    title: 'Learn Daily',
    desc: 'Choose your track and build practical skills through focused daily challenges.',
  },
  {
    icon: Code,
    title: 'Build & Showcase',
    desc: 'Ship real work, publish your progress, and turn effort into a visible portfolio.',
  },
  {
    icon: Trophy,
    title: 'Get Hired',
    desc: 'Stand out through proof of work and become discoverable to 100+ hiring partners.',
  },
];

export default function Landing() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleStart = async (e) => {
    e.preventDefault();
    if (user) {
      navigate('/dashboard');
    } else {
      try {
        await loginWithGoogle();
        toast.success('Welcome to ABTalks! 👋');
        // We don't navigate here directly for redirect flow, the useEffect handles it
      } catch (err) {
        toast.error('Failed to log in');
      }
    }
  };

  return (
    <div className="landing">
      <Header />
      <div className="ambient-bg" />

      {/* Hero */}
      <section className="landing__hero container fade-in">
        <p className="landing__hero-tag">
          <Star size={14} />
          Build in public. Grow together.
        </p>
        <h1 className="landing__hero-title">
          Code consistently.<br />
          Post publicly.<br />
          <span className="gradient-text">Get noticed.</span>
        </h1>
        <p className="landing__hero-desc">
          Join India's coding community for college students to learn, build, and
          accelerate their careers through visible proof of work.
        </p>
        <div className="landing__hero-actions">
          <button onClick={handleStart} className="btn btn--primary btn--large btn--pulse">
            Start the 60-Day Challenge
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="landing__hero-social-proof">
          <div className="landing__avatars">
            {['AP', 'NG', 'RS', 'PS', 'VK'].map((initials, i) => (
              <div key={i} className="landing__avatar" style={{ '--i': i }}>
                {initials}
              </div>
            ))}
          </div>
          <span className="landing__joined">
            <strong>10,000+</strong> builders already joined
          </span>
        </div>
      </section>

      {/* Tracks */}
      <section className="landing__tracks container section slide-up stagger-1">
        <div className="landing__tracks-grid">
          {tracks.map((track, i) => (
            <button onClick={handleStart} key={i} className={`landing__track-card glass-card`} data-color={track.color} style={{textAlign: 'left'}}>
              <div className={`landing__track-glow landing__track-glow--${track.color}`} />
              <div className="landing__track-header">
                <span className={`badge badge--${track.color}`}>{track.status}</span>
                <ArrowUpRight size={18} className="landing__track-arrow" />
              </div>
              <h2 className="landing__track-name">{track.name}</h2>
              <p className="landing__track-desc">{track.desc}</p>
              <div className="landing__track-tags">
                <span className={`badge badge--${track.color}`}>{track.duration}</span>
                {track.tags?.map((tag, j) => (
                  <span key={j} className={`badge badge--${track.color}`}>{tag}</span>
                ))}
              </div>
              <span className={`landing__track-cta landing__track-cta--${track.color}`}>
                {track.cta}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="landing__stats container section slide-up stagger-2">
        <div className="landing__stats-bar glass-card glass-card--static">
          <div className="landing__stat">
            <Users size={20} />
            <div>
              <strong>10,000+</strong>
              <span>members</span>
            </div>
          </div>
          <div className="landing__stat-divider" />
          <div className="landing__stat">
            <FolderGit2 size={20} />
            <div>
              <strong>500+</strong>
              <span>projects</span>
            </div>
          </div>
          <div className="landing__stat-divider" />
          <div className="landing__stat">
            <Briefcase size={20} />
            <div>
              <strong>100+</strong>
              <span>hiring partners</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="landing__how container section slide-up stagger-3">
        <h2 className="landing__section-title">How ABTalks works</h2>
        <div className="landing__steps">
          {steps.map((step, i) => (
            <div key={i} className="landing__step glass-card glass-card--static">
              <div className="landing__step-icon">
                <step.icon size={22} />
              </div>
              <h3 className="landing__step-title">{i + 1}. {step.title}</h3>
              <p className="landing__step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="landing__testimonials section">
        <div className="container">
          <h2 className="landing__section-title">What our builders say</h2>
          <p className="landing__section-subtitle">
            Real stories from students who completed the challenge.
          </p>
        </div>
        <div className="landing__testimonials-track no-scrollbar">
          <div className="landing__testimonials-inner">
            {testimonials.map((t, i) => (
              <figure key={i} className="landing__testimonial glass-card glass-card--static">
                <span className="landing__testimonial-quote">"</span>
                <blockquote className="landing__testimonial-text">{t.text}</blockquote>
                <figcaption className="landing__testimonial-author">
                  <div className="landing__testimonial-avatar">{t.initials}</div>
                  <div>
                    <p className="landing__testimonial-name">{t.name}</p>
                    <p className="landing__testimonial-college">{t.college}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="landing__community container section">
        <div className="landing__community-card">
          <div className="landing__community-glow" />
          <div className="landing__community-content">
            <div className="landing__community-icon">
              <MessageCircle size={24} />
            </div>
            <div>
              <h2 className="landing__community-title">Join our community</h2>
              <p className="landing__community-desc">Meet builders, get event alerts, and stay accountable.</p>
            </div>
          </div>
          <a
            href="https://chat.whatsapp.com/LSru1BgvifpEB4OMZsaZEi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--success btn--large landing__community-btn"
          >
            Join WhatsApp
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="landing__final-cta container section">
        <div className="landing__final-card">
          <Flame size={32} className="landing__final-flame" />
          <h2>Ready to build your streak?</h2>
          <p>60 days. One task a day. Build the habit. Get noticed.</p>
          <button onClick={handleStart} className="btn btn--primary btn--large btn--pulse">
            Start the Challenge
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing__footer">
        <div className="container">
          <div className="landing__footer-inner">
            <span className="landing__footer-brand">ABTalks</span>
            <span className="landing__footer-copy">
              For any issue: <a href="mailto:team@abtalks.in">team@abtalks.in</a>
            </span>
          </div>
        </div>
      </footer>

      <style>{`
        .landing {
          overflow-x: hidden;
        }

        /* Hero */
        .landing__hero {
          text-align: center;
          padding: var(--space-12) 0 var(--space-8);
        }
        .landing__hero-tag {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-violet-400);
          margin-bottom: var(--space-4);
        }
        .landing__hero-title {
          font-size: var(--text-4xl);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.03em;
          margin-bottom: var(--space-6);
        }
        .landing__hero-desc {
          max-width: 500px;
          margin: 0 auto var(--space-8);
          font-size: var(--text-base);
          color: var(--color-text-secondary);
          line-height: 1.7;
        }
        .landing__hero-actions {
          margin-bottom: var(--space-8);
        }
        .landing__hero-social-proof {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
        }
        .landing__avatars {
          display: flex;
        }
        .landing__avatar {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          color: white;
          border: 2px solid var(--color-bg-primary);
          margin-left: -8px;
        }
        .landing__avatar:first-child {
          margin-left: 0;
        }
        .landing__joined {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }
        .landing__joined strong {
          color: var(--color-text-primary);
        }

        /* Tracks */
        .landing__tracks-grid {
          display: grid;
          gap: var(--space-5);
        }
        .landing__track-card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: var(--space-6);
          min-height: 260px;
          overflow: hidden;
          text-decoration: none;
        }
        .landing__track-glow {
          position: absolute;
          inset: 0 0 auto 0;
          height: 120px;
          opacity: 0.5;
          pointer-events: none;
        }
        .landing__track-glow--violet {
          background: linear-gradient(to bottom, rgba(139, 92, 246, 0.15), transparent);
        }
        .landing__track-glow--indigo {
          background: linear-gradient(to bottom, rgba(99, 102, 241, 0.15), transparent);
        }
        .landing__track-glow--amber {
          background: linear-gradient(to bottom, rgba(245, 158, 11, 0.15), transparent);
        }
        .landing__track-header {
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: var(--space-8);
        }
        .landing__track-arrow {
          color: var(--color-text-muted);
          transition: transform 0.6s ease;
        }
        .landing__track-card:hover .landing__track-arrow {
          transform: translate(3px, -3px);
        }
        .landing__track-name {
          position: relative;
          font-size: var(--text-2xl);
          font-weight: 700;
          margin-bottom: var(--space-3);
        }
        .landing__track-desc {
          position: relative;
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          line-height: 1.6;
          flex: 1;
        }
        .landing__track-tags {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-top: var(--space-5);
        }
        .landing__track-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 48px;
          border-radius: var(--radius-xl);
          padding: 0 var(--space-6);
          font-size: var(--text-sm);
          font-weight: 600;
          margin-top: var(--space-6);
          color: white;
        }
        .landing__track-cta--violet {
          background: linear-gradient(135deg, #8B5CF6, #6366F1);
        }
        .landing__track-cta--indigo {
          background: linear-gradient(135deg, #6366F1, #4F46E5);
        }
        .landing__track-cta--amber {
          background: linear-gradient(135deg, #F59E0B, #EA580C);
        }

        /* Stats */
        .landing__stats-bar {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: center;
          padding: var(--space-5) var(--space-4);
          gap: var(--space-3);
        }
        .landing__stat {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
          color: var(--color-violet-400);
        }
        .landing__stat div {
          display: flex;
          flex-direction: column;
        }
        .landing__stat strong {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          color: var(--color-text-primary);
        }
        .landing__stat span {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }
        .landing__stat-divider {
          width: 1px;
          height: 40px;
          background: var(--color-border);
        }

        /* How it works */
        .landing__section-title {
          font-size: var(--text-3xl);
          font-weight: 700;
          text-align: center;
          margin-bottom: var(--space-3);
        }
        .landing__section-subtitle {
          text-align: center;
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-8);
        }
        .landing__steps {
          display: grid;
          gap: var(--space-5);
        }
        .landing__step {
          padding: var(--space-6);
        }
        .landing__step-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-xl);
          background: rgba(139, 92, 246, 0.1);
          color: var(--color-violet-400);
          margin-bottom: var(--space-5);
        }
        .landing__step-title {
          font-size: var(--text-lg);
          font-weight: 700;
          margin-bottom: var(--space-2);
        }
        .landing__step-desc {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        /* Testimonials */
        .landing__testimonials-track {
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          margin-top: var(--space-6);
        }
        .landing__testimonials-inner {
          display: flex;
          gap: var(--space-5);
          padding: 0 var(--space-5);
          width: max-content;
        }
        .landing__testimonial {
          width: 300px;
          flex-shrink: 0;
          scroll-snap-align: start;
          padding: var(--space-6);
          display: flex;
          flex-direction: column;
        }
        .landing__testimonial-quote {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          line-height: 1;
          color: rgba(139, 92, 246, 0.3);
        }
        .landing__testimonial-text {
          flex: 1;
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          line-height: 1.7;
          margin-top: var(--space-3);
        }
        .landing__testimonial-author {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-top: var(--space-5);
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-border);
        }
        .landing__testimonial-avatar {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--text-xs);
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }
        .landing__testimonial-name {
          font-family: var(--font-display);
          font-size: var(--text-sm);
          font-weight: 700;
        }
        .landing__testimonial-college {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        /* Community CTA */
        .landing__community-card {
          position: relative;
          overflow: hidden;
          border-radius: var(--radius-3xl);
          border: 1px solid rgba(16, 185, 129, 0.25);
          background: rgba(16, 185, 129, 0.08);
          padding: var(--space-6);
          backdrop-filter: blur(16px);
        }
        .landing__community-glow {
          position: absolute;
          top: -40px;
          right: -40px;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.15);
          filter: blur(60px);
          pointer-events: none;
        }
        .landing__community-content {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }
        .landing__community-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: var(--radius-xl);
          background: rgba(16, 185, 129, 0.15);
          color: var(--color-emerald-400);
          flex-shrink: 0;
        }
        .landing__community-title {
          font-size: var(--text-xl);
          font-weight: 700;
        }
        .landing__community-desc {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-top: var(--space-2);
        }
        .landing__community-btn {
          position: relative;
          width: 100%;
        }

        /* Final CTA */
        .landing__final-card {
          text-align: center;
          padding: var(--space-10) var(--space-5);
        }
        .landing__final-flame {
          color: var(--color-amber-500);
          margin: 0 auto var(--space-4);
          filter: drop-shadow(0 0 12px rgba(245, 158, 11, 0.4));
        }
        .landing__final-card h2 {
          font-size: var(--text-2xl);
          margin-bottom: var(--space-3);
        }
        .landing__final-card p {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-6);
        }

        /* Footer */
        .landing__footer {
          border-top: 1px solid var(--color-border);
          padding: var(--space-6) 0;
        }
        .landing__footer-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-3);
          text-align: center;
        }
        .landing__footer-brand {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: var(--text-base);
        }
        .landing__footer-copy {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }
        .landing__footer-copy a {
          color: var(--color-violet-400);
        }
        .landing__footer-copy a:hover {
          text-decoration: underline;
        }

        /* Desktop */
        @media (min-width: 768px) {
          .landing__hero {
            padding: var(--space-20) 0 var(--space-12);
          }
          .landing__hero-title {
            font-size: var(--text-5xl);
          }
          .landing__tracks-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .landing__steps {
            grid-template-columns: repeat(3, 1fr);
          }
          .landing__community-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-8);
            padding: var(--space-8);
          }
          .landing__community-content {
            margin-bottom: 0;
          }
          .landing__community-btn {
            width: auto;
            flex-shrink: 0;
          }
          .landing__footer-inner {
            flex-direction: row;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}

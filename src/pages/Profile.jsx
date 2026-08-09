import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import LoadingScreen from '../components/LoadingScreen';
import { User, GraduationCap, Target, Save, Edit3 } from 'lucide-react';

export default function Profile() {
  const { user, userData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    college: userData?.college || '',
    track: userData?.track || 'Software Engineering',
    avatarUrl: userData?.avatarUrl || ''
  });

  if (!userData) {
    return <LoadingScreen message="Loading profile..." />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        name: formData.name,
        college: formData.college,
        track: formData.track,
        avatarUrl: formData.avatarUrl,
      });
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const displayAvatar = formData.avatarUrl || user.photoURL || `https://ui-avatars.com/api/?name=${user.email}`;

  return (
    <div className="profile page">
      <Header showBack title="My Profile" />
      <BottomNav />
      <div className="ambient-bg" />

      <div className="container fade-in" style={{ paddingBottom: '100px' }}>
        <section className="profile__header glass-card glass-card--static slide-up">
          <div className="profile__avatar-container">
            <img src={displayAvatar} alt="Avatar" className="profile__avatar" style={{ objectFit: 'cover' }} />
          </div>
          <h1 className="profile__name">{userData.name}</h1>
          <p className="profile__email">{user.email}</p>
          <div className="profile__stats">
            <div className="profile__stat">
              <strong>{userData.currentStreak}</strong>
              <span>Day Streak</span>
            </div>
            <div className="profile__stat-divider" />
            <div className="profile__stat">
              <strong>{userData.totalCompleted}</strong>
              <span>Tasks Done</span>
            </div>
            <div className="profile__stat-divider" />
            <div className="profile__stat">
              <strong>#{userData.rank || 0}</strong>
              <span>Rank</span>
            </div>
          </div>
        </section>

        <section className="profile__details slide-up stagger-1">
          <div className="profile__section-header">
            <h2 className="profile__section-title">Account Details</h2>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="btn btn--secondary" style={{ padding: '4px 12px' }}>
                <Edit3 size={14} /> Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="glass-card glass-card--static">
            
            <div className="profile__field">
              <label>
                <User size={16} /> Display Name
              </label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                disabled={!isEditing}
                className={`profile__input ${!isEditing ? 'profile__input--disabled' : ''}`}
                required
              />
            </div>

            <div className="profile__field">
              <label>
                <User size={16} /> Avatar Image URL
              </label>
              <input 
                type="url" 
                name="avatarUrl" 
                value={formData.avatarUrl} 
                onChange={handleChange}
                disabled={!isEditing}
                className={`profile__input ${!isEditing ? 'profile__input--disabled' : ''}`}
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="profile__field">
              <label>
                <GraduationCap size={16} /> College / University
              </label>
              <input 
                type="text" 
                name="college" 
                value={formData.college} 
                onChange={handleChange}
                disabled={!isEditing}
                className={`profile__input ${!isEditing ? 'profile__input--disabled' : ''}`}
                required
                placeholder="E.g. Axis Institute of Technology"
              />
            </div>

            <div className="profile__field">
              <label>
                <Target size={16} /> Challenge Track
              </label>
              <select 
                name="track" 
                value={formData.track} 
                onChange={handleChange}
                disabled={!isEditing}
                className={`profile__input ${!isEditing ? 'profile__input--disabled' : ''}`}
              >
                <option value="Software Engineering">Software Engineering</option>
                <option value="AI / Machine Learning">AI / Machine Learning</option>
                <option value="Data Science">Data Science</option>
                <option value="UI/UX Design">UI/UX Design</option>
              </select>
            </div>

            {isEditing && (
              <div className="profile__actions slide-up">
                <button type="button" onClick={() => setIsEditing(false)} className="btn btn--secondary" disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary" disabled={loading}>
                  <Save size={16} /> {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </form>
        </section>
      </div>

      <style>{`
        .profile {
          min-height: 100dvh;
        }
        .profile__header {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--space-8) var(--space-4) var(--space-6);
          margin: var(--space-6) 0;
          text-align: center;
        }
        .profile__avatar-container {
          margin-bottom: var(--space-4);
          position: relative;
        }
        .profile__avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid var(--color-violet-500);
          box-shadow: var(--shadow-glow-violet);
        }
        .profile__name {
          font-size: var(--text-2xl);
          margin-bottom: var(--space-1);
        }
        .profile__email {
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
          margin-bottom: var(--space-6);
        }
        .profile__stats {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          width: 100%;
          padding-top: var(--space-5);
          border-top: 1px solid var(--color-border);
        }
        .profile__stat {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .profile__stat strong {
          font-size: var(--text-xl);
          font-family: var(--font-display);
        }
        .profile__stat span {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }
        .profile__stat-divider {
          width: 1px;
          height: 30px;
          background: var(--color-border);
        }

        .profile__section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-4);
        }
        .profile__section-title {
          font-size: var(--text-lg);
        }
        
        .profile__field {
          margin-bottom: var(--space-4);
        }
        .profile__field:last-child {
          margin-bottom: 0;
        }
        .profile__field label {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-2);
        }
        .profile__input {
          width: 100%;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--color-border);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-lg);
          font-size: var(--text-base);
          transition: border-color var(--transition-fast);
        }
        .profile__input:focus {
          border-color: var(--color-violet-500);
        }
        .profile__input--disabled {
          opacity: 0.7;
          border-color: transparent;
        }
        
        .profile__actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: var(--space-3);
          margin-top: var(--space-6);
        }
        
        select.profile__input {
          appearance: none;
        }
      `}</style>
    </div>
  );
}

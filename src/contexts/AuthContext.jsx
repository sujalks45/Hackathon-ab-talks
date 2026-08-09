import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, googleProvider } from '../lib/firebase';
import { signInWithRedirect, signOut, getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle redirect result and auth state
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        await getRedirectResult(auth);
      } catch (err) {
        console.error('Redirect error', err);
      }
    };
    handleRedirect();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          // Initialize new user
          const newUser = {
            name: currentUser.displayName || 'New Builder',
            email: currentUser.email,
            avatar: currentUser.displayName ? currentUser.displayName.substring(0, 2).toUpperCase() : 'AB',
            college: 'Not Set',
            track: 'Software Engineering',
            joinedDate: new Date().toISOString(),
            currentDay: 1,
            currentStreak: 0,
            longestStreak: 0,
            totalCompleted: 0,
            totalDays: 60,
            streakShields: 0,
            streakShieldsUsed: 0,
            rank: 0,
            achievements: [
              { id: 'first-commit', title: 'First Commit', emoji: '🚀', description: 'Submit your first proof of work', earned: false, date: null },
              { id: 'streak-3', title: '3-Day Streak', emoji: '🔥', description: 'Maintain a 3-day streak', earned: false, date: null },
              { id: 'streak-7', title: 'Week Warrior', emoji: '⚔️', description: 'Maintain a 7-day streak. Earn a Streak Shield!', earned: false, date: null },
              { id: 'streak-14', title: 'Two-Week Titan', emoji: '🏆', description: 'Maintain a 14-day streak', earned: false, date: null },
              { id: 'halfway', title: 'Halfway Hero', emoji: '🎯', description: 'Complete 30 days of the challenge', earned: false, date: null },
              { id: 'finisher', title: 'Challenge Champion', emoji: '👑', description: 'Complete all 60 days!', earned: false, date: null }
            ]
          };
          await setDoc(userRef, newUser);
          setUserData(newUser);
        }
      };
      
      fetchUserData();
    } else {
      setUserData(null);
    }
  }, [user]);

  const loginWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, userData, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

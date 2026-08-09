import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
            rank: null,
            achievements: [],
            weeklyActivity: []
          };
          await setDoc(userRef, newUser);
          setUserData(newUser);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Login failed', err);
      if (err.code === 'auth/popup-blocked') {
        toast.loading('Popup blocked by browser. Redirecting securely...', { duration: 3000 });
        // Fallback to redirect if popup is blocked
        import('firebase/auth').then(({ signInWithRedirect }) => {
          signInWithRedirect(auth, googleProvider);
        });
      } else if (err.code !== 'auth/popup-closed-by-user') {
        toast.error('Login failed. Please try again.');
      }
    }
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, userData, loading, loginWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

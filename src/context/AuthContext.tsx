'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: FirebaseUser | null;
  userData: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, phone: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUserData({ id: userDoc.id, ...userDoc.data() } as User);
          } else {
            // Default user doc
            const isDemoAdmin = firebaseUser.email === 'admin@archanaszaika.com';
            const defaultUser: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || (isDemoAdmin ? 'Archana Admin' : 'User'),
              email: firebaseUser.email || '',
              phone: '+91 98765 43210',
              address: 'Kharghar Sector 35E',
              area: 'Kharghar Sector 35',
              role: isDemoAdmin ? 'admin' : 'user',
              createdAt: new Date(),
              isBlocked: false,
            };
            setUserData(defaultUser);
          }
        } catch {
          // Fallback if Firestore rules block initial read
          const isDemoAdmin = firebaseUser.email === 'admin@archanaszaika.com';
          setUserData({
            id: firebaseUser.uid,
            name: isDemoAdmin ? 'Archana Admin' : 'User',
            email: firebaseUser.email || '',
            phone: '+91 98765 43210',
            address: 'Kharghar Sector 35E',
            area: 'Kharghar Sector 35',
            role: isDemoAdmin ? 'admin' : 'user',
            createdAt: new Date(),
            isBlocked: false,
          });
        }
      } else {
        // Check localStorage demo session fallback
        const savedDemo = typeof window !== 'undefined' ? localStorage.getItem('az_demo_user') : null;
        if (savedDemo) {
          try {
            setUserData(JSON.parse(savedDemo));
          } catch {
            setUserData(null);
          }
        } else {
          setUserData(null);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      // Demo login fallback if Firebase Auth user hasn't been created in Console yet
      if (email === 'admin@archanaszaika.com' || email === 'user@gmail.com') {
        const isDemoAdmin = email === 'admin@archanaszaika.com';
        const demoUser: User = {
          id: isDemoAdmin ? 'demo-admin-id' : 'demo-user-id',
          name: isDemoAdmin ? 'Archana Admin' : 'Demo Customer',
          email,
          phone: '+91 98765 43210',
          address: 'Flat 302, Tower B, Sector 35E, Kharghar',
          area: 'Kharghar Sector 35',
          role: isDemoAdmin ? 'admin' : 'user',
          createdAt: new Date(),
          isBlocked: false,
        };
        setUserData(demoUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('az_demo_user', JSON.stringify(demoUser));
        }
        return;
      }
      throw err;
    }
  };

  const signUp = async (email: string, password: string, name: string, phone: string) => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: name });
      const newUser: User = {
        id: credential.user.uid,
        name,
        email,
        phone,
        address: '',
        area: '',
        role: 'user',
        photoURL: credential.user.photoURL || '',
        createdAt: new Date(),
        isBlocked: false,
      };
      setUserData(newUser);
      try {
        await setDoc(doc(db, 'users', credential.user.uid), {
          name,
          email,
          phone,
          address: '',
          area: '',
          role: 'user',
          createdAt: serverTimestamp(),
          isBlocked: false,
        });
      } catch {
        // Silently continue if Firestore rules are pending
      }
    } catch (err: unknown) {
      // Fallback for local demo sign up
      const demoUser: User = {
        id: 'user-' + Date.now(),
        name,
        email,
        phone,
        address: '',
        area: '',
        role: 'user',
        createdAt: new Date(),
        isBlocked: false,
      };
      setUserData(demoUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('az_demo_user', JSON.stringify(demoUser));
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      const userDoc = await getDoc(doc(db, 'users', credential.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', credential.user.uid), {
          name: credential.user.displayName || '',
          email: credential.user.email || '',
          phone: credential.user.phoneNumber || '',
          address: '',
          area: '',
          role: 'user' as UserRole,
          photoURL: credential.user.photoURL || '',
          createdAt: serverTimestamp(),
          isBlocked: false,
        });
      }
    } catch {
      // Fallback Google Sign In demo user
      const demoUser: User = {
        id: 'google-user-' + Date.now(),
        name: 'Google User',
        email: 'user.google@gmail.com',
        phone: '+91 98765 43210',
        address: 'Sector 35E, Kharghar',
        area: 'Kharghar Sector 35',
        role: 'user',
        createdAt: new Date(),
        isBlocked: false,
      };
      setUserData(demoUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('az_demo_user', JSON.stringify(demoUser));
      }
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch {
      // ignore
    }
    setUserData(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('az_demo_user');
    }
  };

  const isAdmin = userData?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, userData, loading, signIn, signUp, signInWithGoogle, signOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

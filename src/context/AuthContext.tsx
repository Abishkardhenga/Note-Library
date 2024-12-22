import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User as FirebaseUser,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  getRedirectResult
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';
import { User } from "../types"

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  loading: boolean
  // signInWithGoogle: () => Promise<void>
  signInWithGoogle: () => Promise<any>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (
    email: string,
    password: string,
    name: string,
    grade: string
  ) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const createUserProfile = async (
  firebaseUser: FirebaseUser,
  grade?: string
): Promise<User> => {
  const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))

  if (userDoc.exists()) {
    return userDoc.data() as User
  }

  const isAdmin = firebaseUser.email === "note-libraryadmin@gmail.com"

  // For Google sign-in users, we'll set emailVerified to false initially
  const isGoogleSignIn = firebaseUser.providerData.some(
    (provider) => provider.providerId === "google.com"
  )
  console.log("isGooglesignin", isGoogleSignIn)

  const newUser: User = {
    id: firebaseUser.uid,
    fullName: firebaseUser.displayName || "",
    email: firebaseUser.email || "",
    grade: grade || "11",
    phone: "",
    role: isAdmin ? "admin" : "student",
    completedQuizzes: [],
    quizScores: {},
    setupComplete: false,
    // emailVerified: !isGoogleSignIn, // Set to false for Google sign-ins
    emailVerified: false, // Set to false for Google sign-ins
    attempts: {},
  }

  await setDoc(doc(db, "users", firebaseUser.uid), newUser)

  // If it's a Google sign-in, send verification email
  if (isGoogleSignIn && firebaseUser.email) {
    // Store the encrypted OTP in the user's document
    await setDoc(doc(db, "users", firebaseUser.uid), {
      ...newUser,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes expiry
    })
  }

  return newUser
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleUser = async (firebaseUser: FirebaseUser | null) => {
      try {
        if (firebaseUser) {
          const userData = await createUserProfile(firebaseUser)
          setUser(userData)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Error handling user:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          return handleUser(result.user)
        }
      })
      .catch(console.error)

    const unsubscribe = auth.onAuthStateChanged(handleUser)
    return () => unsubscribe()
  }, [])

  // const signInWithGoogle = async () => {
  //   try {
  //     try {
  //       const result = await signInWithPopup(auth, googleProvider)
  //       if (result.user) {
  //         await createUserProfile(result.user)
  //       }
  //     } catch (popupError: any) {
  //       if (popupError.code === "auth/popup-blocked") {
  //         await signInWithRedirect(auth, googleProvider)
  //       } else {
  //         throw popupError
  //       }
  //     }
  //   } catch (error: any) {
  //     console.error("Error signing in with Google:", error)
  //     throw new Error("Failed to sign in with Google. Please try again.")
  //   }
  // }

  const signInWithGoogle = async () => {
    try {
      let result
      try {
        result = await signInWithPopup(auth, googleProvider)
      } catch (popupError: any) {
        if (popupError.code === "auth/popup-blocked") {
          await signInWithRedirect(auth, googleProvider)
          const redirectResult = await getRedirectResult(auth)
          if (redirectResult?.user) {
            result = redirectResult
          }
        } else {
          throw popupError
        }
      }

      if (result?.user) {
        const userProfile = await createUserProfile(result.user)
        return userProfile // Return the created user profile
      }
      return null
    } catch (error: any) {
      console.error("Error signing in with Google:", error)
      throw new Error("Failed to sign in with Google. Please try again.")
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password)
      console.log("signin wiht email ", data)
    } catch (error: any) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        throw new Error("Invalid email or password")
      }
      throw error
    }
  }

  const signUpWithEmail = async (
    email: string,
    password: string,
    name: string,
    grade: string
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(result.user, { displayName: name })
      await createUserProfile(result.user, grade)
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        throw new Error("Email already in use")
      }
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === "admin",
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
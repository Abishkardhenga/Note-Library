import React, { useState, useEffect } from "react"
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import useOtpHandler from "../hooks/useOtpHandler"
import OTPVerification from "./auth/OTPVerification"
import { useNavigate, useRoutes } from "react-router-dom"
import { updateDoc, doc } from "firebase/firestore"
import { db} from "../lib/firebase"
interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { sendOtp, verifyOtp, isSending, isOtpSent } = useOtpHandler() // Use OTP hook
  const [isOtpVerifying, setIsOtpVerifying] = useState(false)
const  { user} = useAuth()

const navigate = useNavigate()

  useEffect(() => {
    if (!isOpen) {
      setEmail("")
      setPassword("")
      setName("")
      setError("")
      setIsLoading(false)
    }
  }, [isOpen])

  const emailVerified = async () => {
    try {
      const userDocRef = doc(db, "users", user?.id!) // Ensure user.id is a valid string
      await updateDoc(userDocRef, { emailVerified: true })
      console.log("Email verified successfully")
    } catch (error) {
      console.log("error",error)
      
    }
      
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password, name)
        sendOtp(
          email,
          () => console.log("OTP sent successfully!"),
          (err) => console.error(err)
        ) // Send OTP
        navigate("/otpverify")
        setIsOtpVerifying(true)
        
      } else {
        await signInWithEmail(email, password)
      }
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
      setIsOtpVerifying(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError("")
    setIsLoading(true)

    try {
      await signInWithGoogle()
      await emailVerified()
      
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {isOtpVerifying ? (
        <OTPVerification
         
        />
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-xl relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              <X size={20} />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {isSignUp ? "Welcome Back" : "Create Account"}
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required={isSignUp}
                      disabled={isLoading}
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Please wait..."
                    : isSignUp
                    ? "Sign Up"
                    : "Sign In"}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                {isLoading ? "Please wait..." : "Continue with Google"}
              </button>

              <p className="text-center text-sm text-gray-600 mt-6">
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-purple-600 hover:text-purple-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AuthModal

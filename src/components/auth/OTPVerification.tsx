import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowRight } from "lucide-react"
import { toast } from "react-hot-toast"
import useOtpHandler from "../../hooks/useOtpHandler"
import { useAuth } from "../../context/AuthContext"
import { updateDoc, doc } from "firebase/firestore"
import  { db} from "../../lib/firebase"
import { useNavigate } from "react-router-dom"

interface OTPVerificationProps {
  // email: string
  // onVerify: (verified: boolean) => void
  // onClose: () => void
}

const OTPVerification: React.FC<OTPVerificationProps> = ({

}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(120) // 5 minutes
  const [isVerifying, setIsVerifying] = useState(false)

  const { user } = useAuth();
  console.log("user", user)
  const navigate = useNavigate()
  
  const { verifyOtp } = useOtpHandler() // Use OTP hook

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

 


const handleVerify = async () => {
  const otpString = otp.join("")
  if (otpString.length !== 6) {
    toast.error("Please enter the complete OTP")
    return
  }

  setIsVerifying(true)

  verifyOtp(
    otpString,
    async () => {
      if (!user?.id) {
        toast.error("User ID is not available")
        setIsVerifying(false)
        return
      }

      try {
        // Update Firestore to set isEmailVerified to true
        const userDocRef = doc(db, "users", user.id) // Ensure user.id is a valid string
        await updateDoc(userDocRef, { emailVerified: true })

        toast.success("Email verified successfully")
      } catch (error) {
        console.error("Error updating user document: ", error)
        toast.error("Failed to update email verification status")
      } finally {
        setIsVerifying(false)
      }
    },
    () => {
      toast.error("Invalid OTP. Please try again.")
      setIsVerifying(false)
    }
  )
  navigate("/onboarding")

}




  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Verify Your Email</h2>
          <button
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-indigo-600" />
          </div>
          <p className="text-gray-600">
            We've sent a verification code to
            <br />
            <span className="font-semibold text-gray-900">{user?.email}</span>
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 text-center text-2xl font-bold border-2 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          ))}
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">
            Time remaining:{" "}
            <span className="font-medium">{formatTime(timeLeft)}</span>
          </p>
        </div>

        <button
          onClick={handleVerify}
          disabled={isVerifying || timeLeft === 0}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isVerifying ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Verify Email
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}

export default OTPVerification

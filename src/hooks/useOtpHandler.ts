import { useState } from 'react';
import emailjs from 'emailjs-com';
import { decryptOTP, encryptOTP,  } from '../lib/secureDataHandlerService';
type Callback = () => void;
type ResponseCallback = (response: any) => void;
type ErrorCallback = (error: any) => void;

const useOtpHandler = () => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);

  const sendOtp = (
    email: string,
    onSuccess?: ResponseCallback,
    onError?: ErrorCallback
  ) => {
    const otpValue = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    console.log("otp value", otpValue);
    
    // Store OTP in localStorage
   const Otp =  encryptOTP(otpValue, "hello")
    localStorage.setItem("otp", Otp);
    
    // Set timeout to remove OTP from localStorage after 2 minutes (120,000 ms)
    setTimeout(() => {
      localStorage.removeItem("otp");
      console.log("OTP removed from localStorage after 2 minutes");
    }, 120000); 

    setIsSending(true);

    const templateParams = {
      user_email: email,
      otp: otpValue,
    };

    emailjs
      .send(
        'service_3m39imp', 
        'template_eo7cwsa', 
        templateParams,
        'iqcnxe68LFHMR17Oj'
      )
      .then(
        (response) => {
          setIsSending(false);
          setIsOtpSent(true);
          if (onSuccess) onSuccess(response);
        },
        (error) => {
          setIsSending(false);
          if (onError) onError(error);
        }
      );
  };

  const verifyOtp = (
    inputOtp: string,
    onSuccess?: Callback,
    onError?: Callback
  ) => {
    const Otp = localStorage.getItem("otp");

    const generatedOtp = decryptOTP(Otp!,"hello")
    
    if (!generatedOtp) {
      console.log("No OTP generated");
      if (onError) onError();
      return;
    }

    console.log("input otp", inputOtp);
    console.log("generated otp", generatedOtp);

    if (inputOtp === generatedOtp) {
      console.log("OTP verified successfully");
      if (onSuccess) onSuccess();
    } else {
      console.log("OTP verification failed");
      if (onError) onError();
    }
  };

  return { sendOtp, verifyOtp, isSending, isOtpSent };
};

export default useOtpHandler;

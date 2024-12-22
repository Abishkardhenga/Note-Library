// import CryptoJS from 'crypto-js';

// export const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// export const encryptOTP = (otp: string) => {
//   return CryptoJS.AES.encrypt(otp, process.env.OTP_SECRET || 'default-secret').toString();
// };

// export const decryptOTP = (encryptedOTP: string) => {
//   const bytes = CryptoJS.AES.decrypt(encryptedOTP, process.env.OTP_SECRET || 'default-secret');
//   return bytes.toString(CryptoJS.enc.Utf8);
// };

// export const sendOTP = async (email: string, otp: string) => {
//   try {
//     // In a real application, this would call your backend API
//     // For now, we'll simulate the email sending
//     console.log(`Sending OTP ${otp} to ${email}`);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     return true;
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     return false;
//   }
// };
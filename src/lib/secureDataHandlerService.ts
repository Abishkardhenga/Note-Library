export const encryptOTP = (otp:string, secretKey:string) => {
     let encryptedOtp = '';
  for (let i = 0; i < otp.length; i++) {
    encryptedOtp += String.fromCharCode(otp.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length));
  }
  return btoa(encryptedOtp); //
}

export const decryptOTP = (encryptedOtp:string, secretKey:string)=> {
  const decodedOtp = atob(encryptedOtp); // Decode the Base64 string
  let otp = '';
  for (let i = 0; i < decodedOtp.length; i++) {
    otp += String.fromCharCode(decodedOtp.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length));
  }
  return otp;
}
export function generateOTP() {
  let OTP = "";

  for (let i = 0; i < 4; i++) {
    OTP += Math.floor(Math.random() * 10);
  }

  return OTP;
}

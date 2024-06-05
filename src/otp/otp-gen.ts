import OTP from "./otp-model";
import Mailer from "../utils/mail";
import { generateOTP } from "../utils/gen-otp";

// Send OTP to the provided email
export async function sendOtp(email: string) {
  const created_at = new Date();
  const exp_time = 30 * 60 * 1000; // 30 minutes in milliseconds
  const expires_at = new Date(Date.now() + exp_time);
  
  // Check if a user with the same email already exists in the OTP model
  const userExist = await OTP.findOne({ where: { email } });
  
  // If a user with the same email exists, delete it
  if (userExist) {
    await OTP.destroy({ where: { email: userExist.email } });
  }
  
  // Generate a new OTP
  const otp = generateOTP();
  
  // Create a new OTP record in the OTP model
  const createdOtp = await OTP.create({ email, otp, created_at, expires_at });
  
  // Send an email with the OTP code to the user
  await Mailer.sendMail({
    to: createdOtp.email,
    subject: "OTP Verification",
    html: `<h1>Please confirm your OTP</h1>
            <p>Here is your OTP code: ${createdOtp.otp}</p>`,
  });
  
  // Return the OTP code
  return createdOtp.otp;
}

// Verify the provided OTP for the given email
export async function verifyOtp(
  otp: any,
  email: any,
  deleteOTP: boolean = true
): Promise<boolean> {
  // Find an OTP record that matches the provided OTP and email
  const existing_otp = await OTP.findOne({ where: { email, otp } });

  // If no matching OTP record is found, return false
  if (!existing_otp) return false;

  // Get the current timestamp
  const currentTimestamp = new Date();

  // If the OTP has expired, return false
  if (existing_otp.expires_at < currentTimestamp) return false;

  // If deleteOTP is true, delete the OTP record
  if (deleteOTP) {
    await OTP.destroy({ where: { email, otp } });
  }

  // OTP verification successful
  return true;
}
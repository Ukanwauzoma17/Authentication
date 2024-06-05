import { resetValidator } from "./reset-validator";
import { findByEmail } from "../../service/user-service";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { sendOtp, verifyOtp } from "../../otp/otp-gen";
import User from "../../users/user-model";

// Send reset password OTP
export const sendReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({
      error: "Missing field(s)",
      success: false,
      message: "Email is required",
    });
  }

  const user = findByEmail(email);

  if (!user) {
    return res.status(400).send({
      error: "User not found",
      success: false,
      message: "The requested user could not be found",
    });
  }
  const otp = await sendOtp(email);
  return res
    .status(200)
    .json({ success: true, message: "OTP sent successfully", data: { otp } });
};

// Update password in the database
const updatePassword = async (
  email: string,
  newPassword: string
): Promise<void> => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const userEmail = await findByEmail(email);
  if (userEmail) {
    await User.update(
      { password: hashedPassword },
      { where: { email: userEmail.email } }
    );
  }
};

// Reset password using OTP
export const resetPassword = async (req: Request, res: Response) => {
  const { error, value } = resetValidator.validate(req.body);

  if (error) {
    return res.status(400).send({
      error: "Validation error",
      success: false,
      message: error.details[0].message,
    });
  }

  const { email, newPassword, otp } = value;

  const validOtp = await verifyOtp(otp, email);

  if (!validOtp) {
    return res.status(400).send({
      error: "Incorrect code",
      success: false,
      message: "The OTP code is incorrect",
    });
  }

  const user = await findByEmail(email);

  if (!user) {
    return res.status(400).send({
      error: "User not found",
      success: false,
      message: "User Email not found",
    });
  }

  await updatePassword(email, newPassword);
  return res.status(200).json({ message: "Password Successfully changed" });
};
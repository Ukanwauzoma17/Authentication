import { updateToken } from "../../token/update-token";

import { generateToken } from "../../token/generate-token";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { findByEmail } from "../../service/user-service";

import _ from "lodash";

// Login with email
export const login = async (req: Request, res: Response): Promise<void> => {
  // Extract email and password from request body
  let { email, password } = req.body;
  const loginAttemptsThreshold = 5;

  if (!email || !password) {
    // Send error response if email or password is missing
    res.status(400).send({ error: "All Fields are Mandatory" });
    return;
  }

  const user = await findByEmail(email);
  if (!user) {
    // Send error response if email or password is incorrect
    res.status(400).send({ error: "Email or Password Incorrect" });
    return;
  }

  const hashedPassword = user.password;
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordValid) {
    // Increment login attempts and check if account should belocked
    user.loginAttempts += 1;
    await user.save();

    if (user.loginAttempts >= loginAttemptsThreshold) {
      // Lock the account if login attempts exceed the threshold
      user.locked = true;
      await user.save();
      res.status(400).send({ error: "Account locked. Please reset password." });
      return;
    }

    // Send error response if email or password is incorrect
    res.status(400).send({ error: "Email or Password Incorrect" });
    return;
  }

  // Reset login attempts on successful login
  user.loginAttempts = 0;
  await user.save();

  const accessToken =await generateToken(email);
  await updateToken(email, accessToken);
  const loginDetails = _.pick(user, ["firstName", "lastName", "email"]);

  // Send success response with login details and access token
  res.status(200).json({
    message: "Login successful",
    data: { ...loginDetails },
    accessToken,
  });
};

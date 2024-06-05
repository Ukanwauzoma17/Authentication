import { findUserPhoneNumber } from './../../service/user-service';
import { updateTokenWithPhoneNumber } from '../../token/update-token';
import {  generateTokenWithPhoneNumber } from '../../token/generate-token';
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import _ from "lodash";
// Login with phone number
export const loginWithPhoneNumber = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    // Extract phone number and password from request body
    let { phoneNumber, password } = req.body;
    const loginAttemptsThreshold = 5;
  
    if (!phoneNumber || !password) {
      // Send error response if phone number or password is missing
      res.status(400).send({ error: "All Fields are Mandatory" });
      return;
    }
  
    const user = await findUserPhoneNumber(phoneNumber);
    if (!user) {
      // Send error response if phone number or password is incorrect
      res.status(400).send({ error: "Phone Number or Password Incorrect" });
      return;
    }
  
    const hashedPassword = user.password;
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  
    if (!isPasswordValid) {
      // Increment login attempts and check if account should be locked
      user.loginAttempts += 1;
      await user.save();
  
      if (user.loginAttempts >= loginAttemptsThreshold) {
        // Lock the account if login attempts exceed the threshold
        user.locked = true;
        await user.save();
        res.status(400).send({ error: "Account locked. Please reset password." });
        return;
      }
  
      // Send error response if phone number or password is incorrect
      res.status(400).send({ error: "Phone Number or Password Incorrect" });
      return;
    }
  
    // Reset login attempts on successful login
    user.loginAttempts = 0;
    await user.save();
  
    const accessToken =await  generateTokenWithPhoneNumber(phoneNumber);
    await updateTokenWithPhoneNumber(phoneNumber,accessToken)
    const loginDetails = _.pick(user, ["firstName", "lastName", "phoneNumber"]);
  
    // Send success response with login details and access token
    res.status(200).json({
      message: "Login successful",
      data: { ...loginDetails },
      accessToken,
    });
  };
  
  
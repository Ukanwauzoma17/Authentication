
import { findUserPhoneNumber } from "../service/user-service";
import { generateToken } from "../token/generate-token";
import { validateUser } from "../users/validators/sign-up-validator";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { findByEmail } from "../service/user-service";
import User from "../users/user-model";
import _ from "lodash";

// Sign up a new user
export const signUp = async (req: Request, res: Response): Promise<void> => {
  // Validate user input
  const validate = validateUser(req.body);
  const { firstName, lastName, confirmPassword, phoneNumber, email, password } =
    validate.value;

  if (validate.error) {
    // Send error response if validation fails
    res.status(400).json({ error: validate.error.details[0].message });
    return;
  }

  const user = await findByEmail(email);
  if (user) {
    // Send error response if user already exists
    res.status(400).json({ message: "User Already Exists. Login Instead" });
    return;
  }

  const userPhoneNumber = await findUserPhoneNumber(phoneNumber);
  if (userPhoneNumber) {
    // Send error response if phone number already exists
    res.status(400).json({ message: "Phone number already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const accessToken = generateToken(email);
  // Create user details
  const userDetails = User.create({
    firstName,
    lastName,
    phoneNumber,
    password: hashedPassword,
    email
  });

  const details = _.pick(req.body, ["firstName", "lastName", "email"]);

  // Send success response with user details and access token
  res.status(200).json({ message: "Sign Up successful", details,data: accessToken });

  // Save user details to the database
  await (await userDetails).save();
};

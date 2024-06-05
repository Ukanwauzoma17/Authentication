import Token from "./token-model";

// Generate a token for email verification
export async function generateToken(email: string): Promise<string> {
  const created_at = new Date();
  const exp_time = 30 * 60 * 1000; // 30 minutes in milliseconds
  const expires_at = new Date(Date.now() + exp_time);

  // Check if a token already exists for the given email and delete it
  const userExist = await Token.findOne({ where: { email } });
  if (userExist) {
    await Token.destroy({ where: { email: userExist.email } });
  }

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 25;

  let token = "";
  const charactersLength = characters.length;

  // Generate a random token
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    token += characters[randomIndex];
  }

  // Save the new token in the Token model
  await Token.create({ email, token, created_at, expires_at });

  return token;
}

// Verify a token
export async function verifyToken(
  token: any,
  deleteOTP: boolean = true
): Promise<boolean> {
  // Find the token in the Token model
  const existing_token = await Token.findOne({ where: { token } });

  if (!existing_token) return false;

  // Get the current timestamp
  const currentTimestamp = new Date();

  // Check if the token has expired
  if (existing_token.expires_at < currentTimestamp) return false;

  // Delete the token if deleteOTP is true
  if (deleteOTP) {
    await Token.destroy({ where: { token } });
  }

  return true;
}

// Generate a token for phone number verification
export async function generateTokenWithPhoneNumber(
  phoneNumber: string
): Promise<string> {
  const created_at = new Date();
  const exp_time = 30 * 60 * 1000; // 30 minutes in milliseconds
  const expires_at = new Date(Date.now() + exp_time);

  // Check if a token already exists for the given phone number and delete it
  const userExist = await Token.findOne({ where: { phoneNumber } });
  if (userExist) {
    await Token.destroy({ where: { phoneNumber: userExist.phoneNumber } });
  }

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 25;

  let token = "";
  const charactersLength = characters.length;

  // Generate a random token
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    token += characters[randomIndex];
  }

  // Save the new token in the Token model
  await Token.create({ phoneNumber, token, created_at, expires_at });

  return token;
}
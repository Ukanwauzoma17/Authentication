import { findUserPhoneNumber } from '../service/user-service';
import { findByEmail } from "../service/user-service";
import Token from './token-model';

// Update the token for a user based on their email
export const updateToken = async (
  email: string,
  newToken: string
): Promise<void> => {
  // Find the user by their email
  const userEmail = await findByEmail(email);
  if (userEmail) {
    // Update the token in the Token model
    await Token.update(
      { token: newToken },
      { where: { email: userEmail.email } }
    );
  }
};

// Update the token for a user based on their phone number
export const updateTokenWithPhoneNumber = async (
  phoneNumber: string,
  newToken: string
): Promise<void> => {
  // Find the user by their phone number
  const user = await findUserPhoneNumber(phoneNumber);
  if (user) {
    // Update the token in the Token model
    await Token.update(
      { token: newToken },
      { where: { phoneNumber: user.phoneNumber } }
    );
  }
};

  
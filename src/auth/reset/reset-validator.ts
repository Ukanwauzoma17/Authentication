import Joi from "joi";

// Define the resetValidator schema using Joi
export const resetValidator = Joi.object({
  email: Joi.string().required(), // Validation rule for the email field: required and must be a string
  newPassword: Joi.string().required(), // Validation rule for the newPassword field: required and must be a string
  otp: Joi.string().length(4).required(), // Validation rule for the otp field: required, must be a string, and must have a length of 4
});
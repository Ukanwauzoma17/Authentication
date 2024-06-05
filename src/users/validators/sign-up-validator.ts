import Joi from "joi";

const userSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
  phoneNumber: Joi.string().trim().min(11).max(11).required(),
});

export const validateUser = (user: any) => {
  return userSchema.validate(user);
};

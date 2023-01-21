import { registerParams, loginParams } from "@/Services/authentication-service";
import Joi from "joi";

export const registerSchema = Joi.object<registerParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  username: Joi.string().required(),
  profilePicture: Joi.string()
});

export const loginSchema = Joi.object<loginParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});
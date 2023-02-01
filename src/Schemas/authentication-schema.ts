import { pictureParams } from "@/Repositories/user-repository";
import { registerParams, loginParams } from "@/Services/authentication-service";
import Joi from "joi";

export const registerSchema = Joi.object<registerParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required()
});

export const loginSchema = Joi.object<loginParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const pictureSchema = Joi.object<pictureParams>({
  profilePicture: Joi.string().uri().required()
});

export const userEmailSchema = Joi.object<{email: string}>({
  email: Joi.string().email().required()
})
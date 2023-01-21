import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { duplicatedEmailError, duplicatedUsernameError, credentialError } from "@/Errors";
import authenticationRepository from "@/Repositories/authentication-repository"
import userRepository from "@/Repositories/user-repository";

async function register(data: registerParams) {

  await verifyRegister(data.email, data.username);

  const passwordHash = await bcrypt.hash(data.password, 13);

  const createUserData = {
    ...data,
    password: passwordHash
  }
  return userRepository.createUser(createUserData);
}

async function login(data: loginParams) {
  const user = await verifyUser(data.email);

  await passwordValidation(data.password, user.password);

  const token = await createSession(user.id);

  const response: sessionReponse = {
    user: {
      userId: user.id,
      profilePicture: user.profilePicture
    },
    token
  } 

  return response;
}

async function verifyRegister(email: string, username: string) {
  const emailRegistered = await userRepository.findUserByEmail(email);

  if(emailRegistered){
    throw duplicatedEmailError();
  }

  const usernameRegistered = await userRepository.findUserByUsername(username);

  if(usernameRegistered){
    throw duplicatedUsernameError();
  }
}

async function verifyUser(email: string) {
  const user = await userRepository.findUserByEmail(email);

  if(!user){
    throw credentialError();
  }

  return user;
}

async function passwordValidation(password: string, passwordHash: string) {
  const isValid = await bcrypt.compare(password, passwordHash);

  if(!isValid){
    throw credentialError();
  }
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  const sessionData: sessionParams = {
    userId,
    token
  }

  await authenticationRepository.createSession(sessionData)
  
  return token;
}

export type loginParams = {
  email: string,
  password: string
}

export type registerParams = {
  email: string,
  password: string,
  name: string,
  username: string,
  profilePicture?: string
}

export type sessionParams = {
  userId: number,
  token: string
}

export type sessionReponse = {
  user: {
    userId: number,
    profilePicture: string,
  },
  token: string
}

const authenticationService = {
  register,
  login
};

export default authenticationService;
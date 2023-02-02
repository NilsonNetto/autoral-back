import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { duplicatedEmailError, credentialError } from "@/Errors";
import authenticationRepository, { sessionParams } from "@/Repositories/authentication-repository"
import userRepository, { loginParams, registerParams } from "@/Repositories/user-repository";

async function register(data: registerParams) {
  
  await verifyRegister(data.email);

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

  const response = {
    user: {
      userId: user.id,
      profilePicture: user.profilePicture
    },
    token
  } 

  return response;
}

async function verifyRegister(email: string) {
  const emailRegistered = await userRepository.findUserByEmail(email);

  if(emailRegistered){
    throw duplicatedEmailError();
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

const authenticationService = {
  register,
  login
};

export default authenticationService;
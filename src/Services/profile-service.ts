import bcrypt from "bcrypt";

import userRepository, { pictureParams } from "@/Repositories/user-repository";
import { registerParams } from "./authentication-service";
import { credentialError, duplicatedEmailError } from "@/Errors";

async function findProfile(userId: number) {
  const userProfile = await userRepository.findUserByUserId(userId);

  return userProfile;
}

async function updateProfile(userId: number, profileData: registerParams) {
  const user = await verifyUser(userId);

  if(user.email !== profileData.email){
    await verifyEmail(profileData.email);
  }

  const passwordHash = await bcrypt.hash(profileData.password, 13);

  const updateUserData = {
    ...profileData,
    password: passwordHash,
    updatedAt: new Date()
  }

  const updatedProfile = await userRepository.updateUserByUserId(userId, updateUserData);

  return updatedProfile;
}

async function updatePicture(userId: number, profilePicture: pictureParams) {
  await verifyUser(userId);

  const updatedPicture = await userRepository.updateUserPictureByUserId(userId, profilePicture);

  return updatedPicture;
}

async function verifyUser(userId: number) {
  const user = await userRepository.findUserByUserId(userId);

  if(!user){
    throw credentialError();
  }

  return user;
}

async function verifyEmail(email: string) {
  const emailRegistered = await userRepository.findUserByEmail(email);

  if(emailRegistered){
    throw duplicatedEmailError();
  }
}

const profileService = {
  findProfile,
  updateProfile,
  updatePicture
};

export default profileService;
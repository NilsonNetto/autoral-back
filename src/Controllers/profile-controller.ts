import { Response } from "express";
import { AuthenticatedRequest } from "@/Middlewares";
import httpStatus from "http-status";
import profileService from "@/Services/profile-service";
import { registerParams } from "@/Services/authentication-service";

export async function userProfileGet(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const userProfile = await profileService.findProfile(userId);
    
    return res.status(httpStatus.OK).send(userProfile);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

export async function userProfilePut(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const profileData: registerParams = req.body;

  try {
    const userProfileUpdated = await profileService.updateProfile(userId, profileData);
    
    return res.status(httpStatus.OK).send(userProfileUpdated);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

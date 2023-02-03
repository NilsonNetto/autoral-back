import { Response } from "express";
import { AuthenticatedRequest } from "@/Middlewares";
import httpStatus from "http-status";
import profileService from "@/Services/profile-service";
import { pictureParams, registerParams } from "@/Repositories/user-repository";

export async function userProfileGet(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const userProfile = await profileService.findProfile(userId);
    
    return res.status(httpStatus.OK).send(userProfile);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}

export async function userProfilePut(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const profileData: registerParams = req.body;

  try {
    const userProfileUpdated = await profileService.updateProfile(userId, profileData);
    
    return res.status(httpStatus.OK).send(userProfileUpdated);
  } catch (error) {
    if(error.name === 'DuplicatedEmailError'){
      return res.status(httpStatus.CONFLICT).send(error.message);  
    }
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

export async function userPicutrePut(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const profilePicture: pictureParams = req.body;

  try {
    const userProfileUpdated = await profileService.updatePicture(userId, profilePicture);
    
    return res.status(httpStatus.OK).send(userProfileUpdated);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

import { Request, Response } from "express";
import httpStatus from "http-status";
import authenticationService, { signInParams } from "@/Services/authentication-service";

export async function signInPost(req: Request, res: Response) {
  const data: signInParams = req.body;

  try {
    await authenticationService.signIn(data);
    
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send();
  }
}

export async function loginPost(req: Request, res: Response) {
  try {
    
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send()
  }
}
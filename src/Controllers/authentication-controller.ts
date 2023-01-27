import { Request, Response } from "express";
import httpStatus from "http-status";
import authenticationService, { loginParams, registerParams } from "@/Services/authentication-service";

export async function registerPost(req: Request, res: Response) {
  const userData: registerParams = req.body;

  try {
    await authenticationService.register(userData);
    
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

export async function loginPost(req: Request, res: Response) {
  const userData: loginParams = req.body;
  
  try {
    const session = await authenticationService.login(userData);
    return res.status(httpStatus.OK).send(session);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}
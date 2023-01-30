import { Response } from "express";
import { AuthenticatedRequest } from "@/Middlewares";
import httpStatus from "http-status";
import localService from "@/Services/local-service";

export async function userShareGet(req: AuthenticatedRequest, res: Response) {
  const listId = Number(req.params.listId);

  try {
    const userLists = await localService.findListLocals(listId);
    
    return res.status(httpStatus.OK).send(userLists);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

import { Response } from "express";
import { AuthenticatedRequest } from "@/Middlewares";
import httpStatus from "http-status";
import localService, { localParams } from "@/Services/local-service";

export async function listLocalsGet(req: AuthenticatedRequest, res: Response) {
  const listId = Number(req.params.listId);

  try {
    const userLists = await localService.findListLocals(listId);
    
    return res.status(httpStatus.OK).send(userLists);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

export async function listLocalsPost(req: AuthenticatedRequest, res: Response) {
  const listId = Number(req.params.listId);
  const localData: localParams = req.body;

  try {
    const listLocal = await localService.createLocal(listId, localData)
    
    return res.status(httpStatus.CREATED).send(listLocal);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}
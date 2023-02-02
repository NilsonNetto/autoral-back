import { Response } from "express";
import { AuthenticatedRequest } from "@/Middlewares";
import httpStatus from "http-status";
import localService from "@/Services/local-service";
import { localParams } from "@/Repositories/local-repository";

export async function listLocalsGet(req: AuthenticatedRequest, res: Response) {
  const listId = Number(req.params.listId);

  try {
    const listLocals = await localService.findListLocals(listId);
    
    return res.status(httpStatus.OK).send(listLocals);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}

export async function listLocalsPost(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const listId = Number(req.params.listId);
  const localData: localParams = req.body;

  try {
    const listLocal = await localService.createLocal(userId, listId, localData)
    
    return res.status(httpStatus.CREATED).send(listLocal);
  } catch (error) {
    if(error.name === "InvalidListIdError"){
      return res.status(httpStatus.NOT_FOUND).send(error.message);  
    }
    if(error.name === "InvalidListStatusError"){
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    return res.status(httpStatus.FORBIDDEN).send(error.message);
  }
}

export async function finishLocalPost(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const listLocalId = Number(req.params.listLocalId);

  try {
    const finishedList = await localService.updateFinishedLocal(userId, listLocalId)
    
    return res.status(httpStatus.OK).send(finishedList);
  } catch (error) {
    if(error.name === "NotFoundDataError"){
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if(error.name === "AlreadyFinishedError"){
      return res.status(httpStatus.CONFLICT).send(error.message);
    }
    return res.status(httpStatus.FORBIDDEN).send(error.message);
  }
}

export async function updateLocalName(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const listLocalId = Number(req.params.listLocalId);
  const localData: localParams = req.body

  try {
    const updatedLocal = await localService.updateLocalName(userId, listLocalId, localData)
    
    return res.status(httpStatus.OK).send(updatedLocal);
  } catch (error) {
    if(error.name === "NotFoundDataError"){
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if(error.name === "AlreadyFinishedError"){
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    return res.status(httpStatus.FORBIDDEN).send(error.message);
  }
}

export async function listLocalDelete(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const listLocalId = Number(req.params.listLocalId);

  try {
    const deletedListlocal = await localService.deleteListLocal(userId, listLocalId)
    
    return res.status(httpStatus.OK).send(deletedListlocal);
  } catch (error) {
    if(error.name === "NotFoundDataError"){
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if(error.name === "AlreadyFinishedError"){
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    return res.status(httpStatus.FORBIDDEN).send(error.message);
  }
}
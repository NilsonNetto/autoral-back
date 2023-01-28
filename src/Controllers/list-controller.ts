import { Response } from "express";
import { AuthenticatedRequest } from "@/Middlewares";
import httpStatus from "http-status";
import listService, { listParams } from "@/Services/list-service";

export async function listsGet(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const userLists = await listService.findList(userId);
    console.log(userLists);
    return res.status(httpStatus.OK).send(userLists);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

export async function listPost(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const listData: {name: string} = req.body;

  try {
    const createdList = await listService.createList(userId, listData)
    
    return res.status(httpStatus.CREATED).send(createdList);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

export async function finishListPost(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const listId = Number(req.params.listId);

  try {
    const finishedList = await listService.finishList(userId, listId)
    
    return res.status(httpStatus.OK).send(finishedList);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

export async function ListDelete(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const listId = Number(req.params.listId);

  try {
    const deleteList = await listService.deleteList(userId, listId)
    
    return res.status(httpStatus.OK).send();
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

export async function shareListPost(req: AuthenticatedRequest, res: Response) {
  const ownerUserId = req.userId;
  const listId = Number(req.params.listId);
  const sharedUserId: number = req.body.userId;

  const sharedData = {
    ownerUserId,
    sharedUserId,
    listId,
  }

  try {
    const createdList = await listService.shareList(sharedData);
    
    return res.status(httpStatus.OK).send(createdList);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}
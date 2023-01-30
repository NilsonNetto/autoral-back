import { Response } from "express";
import { AuthenticatedRequest } from "@/Middlewares";
import httpStatus from "http-status";
import listService from "@/Services/list-service";

export async function listsGet(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const userLists = await listService.findList(userId);

    return res.status(httpStatus.OK).send(userLists);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}

export async function listNameGet(req: AuthenticatedRequest, res: Response) {
  const listId = Number(req.params.listId)

  try {
    const listName = await listService.findListById(listId);

    return res.status(httpStatus.OK).send(listName);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}

export async function listPost(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const listData: {name: string} = req.body;

  try {
    const createdList = await listService.createList(userId, listData)
    
    return res.status(httpStatus.CREATED).send(createdList);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}

export async function finishListPost(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const listId = Number(req.params.listId);

  try {
    const finishedList = await listService.finishList(userId, listId)
    
    return res.status(httpStatus.OK).send(finishedList);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
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
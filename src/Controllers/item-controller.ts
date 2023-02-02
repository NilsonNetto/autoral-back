import { Response } from "express";
import { AuthenticatedRequest } from "@/Middlewares";
import httpStatus from "http-status";
import itemService from "@/Services/item-service";
import { insertItemParams } from "@/Repositories/item-repository";

export async function listItemsGet(req: AuthenticatedRequest, res: Response) {
  const listLocalId = Number(req.params.listLocalId);

  try {
    const itemsList = await itemService.findListLocalItems(listLocalId);
    
    return res.status(httpStatus.OK).send(itemsList);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}

export async function listItemPost(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const listLocalId = Number(req.params.listLocalId);
  const itemData: insertItemParams = req.body;

  try {
    const createdItem = await itemService.createItem(userId, listLocalId, itemData);
    
    return res.status(httpStatus.CREATED).send(createdItem);
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

export async function checkItemUpdate(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const itemId = Number(req.params.itemId);

  try {
    const checkedItem = await itemService.checkOrUncheckItem(userId, itemId);
    
    return res.status(httpStatus.OK).send(checkedItem);
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

export async function itemPut(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const itemId = Number(req.params.itemId);
  const itemData: insertItemParams = req.body;

  try {
    const updatedItem = await itemService.updateItem(userId, itemId, itemData);
    
    return res.status(httpStatus.OK).send(updatedItem);
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

export async function itemDelete(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const itemId = Number(req.params.itemId);

  try {
    const deletedItem = await itemService.deleteItem(userId, itemId);
    
    return res.status(httpStatus.OK).send(deletedItem);
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
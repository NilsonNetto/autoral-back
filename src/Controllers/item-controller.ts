import { Response } from "express";
import { AuthenticatedRequest } from "@/Middlewares";
import httpStatus from "http-status";
import itemService, { insertItemParams } from "@/Services/item-service";

export async function listItemsGet(req: AuthenticatedRequest, res: Response) {
  const listId = Number(req.params.listId);

  try {
    const listItems = await itemService.findListItems(listId);
    
    return res.status(httpStatus.OK).send(listItems);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

export async function itemPost(req: AuthenticatedRequest, res: Response) {
  const listId = Number(req.params.listId);
  const itemData: insertItemParams = req.body;

  try {
    const createdItem = await itemService.createItem(listId, itemData);
    
    return res.status(httpStatus.OK).send(createdItem);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}
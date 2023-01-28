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
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

export async function listItemPost(req: AuthenticatedRequest, res: Response) {
  const listLocalId = Number(req.params.listLocalId);
  const itemData: insertItemParams = req.body;

  try {
    const createdItem = await itemService.createItem(listLocalId, itemData);
    
    return res.status(httpStatus.OK).send(createdItem);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}
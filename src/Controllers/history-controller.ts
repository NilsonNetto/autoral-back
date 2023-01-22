import { Response } from "express";
import { AuthenticatedRequest } from "@/Middlewares";
import httpStatus from "http-status";
import historyService from "@/Services/history-service";

export async function allListsHistoryGet(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const userHistoryLists = await historyService.findAllListHistory(userId);
    
    return res.status(httpStatus.OK).send(userHistoryLists);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

export async function listHistoryGet(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const listId = Number(req.params.listId);

  try {
    const listHistory = await historyService.findListHistory(userId, listId);
    
    return res.status(httpStatus.OK).send(listHistory);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

export async function itemHistoryGet(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const itemId = Number(req.params.itemId);

  try {
    const itemHistory = await historyService.findItemHistory(userId, itemId);
    
    return res.status(httpStatus.OK).send(itemHistory);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}
import { Response } from "express";
import { AuthenticatedRequest } from "@/Middlewares";
import httpStatus from "http-status";
import shareService from "@/Services/share-service";

export async function sharedListsGet(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const userLists = await shareService.findSharedLists(userId);
    
    return res.status(httpStatus.OK).send(userLists);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}

export async function sharedOwnedListsGet(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const userOwnerLists = await shareService.findSharedOwnerLists(userId);
    
    return res.status(httpStatus.OK).send(userOwnerLists);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}

export async function shareRequestGet(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const userRequests = await shareService.findShareRequests(userId);
    
    return res.status(httpStatus.OK).send(userRequests);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}

export async function shareRequestPost(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const listId = Number(req.params.listId);
  const email: string = req.body.email;

  try {
    const userOwnerLists = await shareService.createSharedRequest(userId, listId, email);
    
    return res.status(httpStatus.OK).send(userOwnerLists);
  } catch (error) {
    if(error.name === 'InvalidUserEmailError'){
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if(error.name === 'NotFoundDataError'){
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if(error.name === "AlreadySharedError"){
      return res.status(httpStatus.CONFLICT).send(error.message);  
    }
    return res.status(httpStatus.FORBIDDEN).send(error.message);
  }
}

export async function acceptRequestPost(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const requestId = Number(req.params.requestId);

  try {
    const acceptedRequest = await shareService.updateAcceptedRequest(userId, requestId);
    
    return res.status(httpStatus.OK).send(acceptedRequest);
  } catch (error) {
    if(error.name === 'NotFoundDataError'){
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if(error.name === 'AlreadyAnsweredError'){
      return res.status(httpStatus.CONFLICT).send(error.message);
    }
    return res.status(httpStatus.FORBIDDEN).send(error.message);
  }
}

export async function refuseRequestPost(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const requestId = Number(req.params.requestId);

  try {
    const refusedRequest = await shareService.updateRefusedRequest(userId, requestId);
    
    return res.status(httpStatus.OK).send(refusedRequest);
  } catch (error) {
    if(error.name === 'NotFoundDataError'){
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if(error.name === 'AlreadyAnsweredError'){
      return res.status(httpStatus.CONFLICT).send(error.message);
    }
    return res.status(httpStatus.FORBIDDEN).send(error.message);
  }
}

export async function removeSharePost(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const requestId = Number(req.params.requestId);

  try {
    const removedShare = await shareService.removeSharedList(userId, requestId);
    
    return res.status(httpStatus.OK).send(removedShare);
  } catch (error) {
    if(error.name === 'NotFoundDataError'){
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.status(httpStatus.FORBIDDEN).send(error.message);
  }
}
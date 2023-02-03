import { alreadyAnsweredError, cannotShareListError, notFoundDataError, cannotModifyError, alreadySharedError } from "@/Errors";
import { invalidUserEmailError } from "@/Errors/invalid-user-email-error";
import listRepository from "@/Repositories/list-repository";
import shareRepository, { shareRequestParams } from "@/Repositories/share-repository";
import userRepository from "@/Repositories/user-repository";

async function findSharedLists(userId: number) {
  const sharedLists = await shareRepository.findUserSharedLists(userId);

  if(!sharedLists){
    throw notFoundDataError();
  }

  return sharedLists;
}

async function findSharedOwnerLists(userId: number) {
  const sharedLists = await shareRepository.findUserOwnedLists(userId);

  if(!sharedLists){
    throw notFoundDataError();
  }

  return sharedLists;
}

async function findShareRequests(userId: number) {
  const shareRequests = await shareRepository.findShareRequests(userId);

  if(!shareRequests){
    throw notFoundDataError();
  }

  return shareRequests;
}

async function createSharedRequest(userId: number, listId: number, userEmail: string) {
  const shareUser = await verifyEmail(userEmail);

  await verifyOwner(userId, listId);

  await verifyShared(shareUser.id, listId);

  const createShareRequestParam: shareRequestParams = {
    listId,
    ownerId: userId,
    userId: shareUser.id
  }
  
  const shareRequest = await shareRepository.createShareRequest(createShareRequestParam);

  return shareRequest;
}

async function updateAcceptedRequest(userId: number, requestId: number) {
  const shareRequest = await verifyRequest(requestId);

  await verifyShareUser(userId, shareRequest.userId);

  //fazer transaction disso
  await listRepository.createSharedUserList(userId, shareRequest.listId);
  const acceptedRequest = await shareRepository.updateAcceptedRequest(requestId);

  return acceptedRequest;
}

async function updateRefusedRequest(userId: number, requestId: number) {
  const shareRequest = await verifyRequest(requestId);

  await verifyShareUser(userId, shareRequest.userId);
  
  const refusedRequest = await shareRepository.updateRefusedRequest(requestId);

  return refusedRequest;
}

async function removeSharedList(userId: number, requestId: number) {
  const shareRequest = await verifyAnsweredRequest(userId, requestId);

  if(shareRequest.accepted){
    //fazer transaction disso
    await removeUserList(shareRequest.userId, shareRequest.listId)
    return removeShareRequest(requestId);
  }

  return removeShareRequest(requestId);
}

async function verifyEmail(email: string) {
  const user = await userRepository.findUserByEmail(email)

  if(!user){
    throw invalidUserEmailError();
  }
  
  return user;
}

async function verifyOwner(userId: number, listId: number) {
  const userList = await listRepository.findUserListByUserIdAndListId(userId, listId);

  if(!userList){
    throw notFoundDataError();
  }

  if(!userList.owner){
    throw cannotShareListError();
  }

  return userList;
}

async function verifyShared(userId: number, listId: number) {
  const shareRequest = await shareRepository.findShareRequestByUserIdAndListId(userId, listId);

  if(shareRequest){
    throw alreadySharedError();
  }

  return shareRequest;
}

async function verifyRequest(requestId: number) {
  const shareRequest = await shareRepository.findShareRequestById(requestId);
  
  if(!shareRequest){
    throw notFoundDataError();
  }

  if(!shareRequest.pending){
    throw alreadyAnsweredError();
  }

  return shareRequest;
}

async function verifyShareUser(userId: number, sharedUserId: number) {
  if(sharedUserId !== userId){
    throw cannotModifyError();
  }
}

async function verifyAnsweredRequest(userId: number, requestId: number) {
  const shareRequest = await shareRepository.findShareRequestById(requestId);

  if(!shareRequest){
    throw notFoundDataError();
  }

  const isOwner = shareRequest.ownerId === userId;
  const isUser = shareRequest.userId === userId;

  if(!isOwner && !isUser){
    throw cannotModifyError();
  }

  return shareRequest;
}

async function removeUserList(userId: number, listId: number) {
  return listRepository.deleteSharedUserList(userId, listId);
}

async function removeShareRequest(requestId: number) {
  return shareRepository.deleteShareRequest(requestId);
}

const shareService = {
  findSharedLists,
  findSharedOwnerLists,
  findShareRequests,
  createSharedRequest,
  updateAcceptedRequest,
  updateRefusedRequest,
  removeSharedList
};

export default shareService;
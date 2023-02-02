import { invalidListOwnerError, invalidUserIdError, cannotFinishListError, invalidListIdError, invalidListStatusError } from "@/Errors";
import { invalidUserEmailError } from "@/Errors/invalid-user-email-error";
import listRepository from "@/Repositories/list-repository";
import shareRepository, { shareRequestParams } from "@/Repositories/share-repository";
import userRepository from "@/Repositories/user-repository";

async function findSharedLists(userId: number) {
  const sharedLists = await shareRepository.findUserSharedLists(userId);

  return sharedLists;
}

async function findSharedOwnerLists(userId: number) {
  const sharedLists = await shareRepository.findUserOwnedLists(userId);

  return sharedLists;
}

async function findShareRequests(userId: number) {
  const shareRequests = await shareRepository.findShareRequests(userId);

  return shareRequests;
}

async function createSharedRequest(userId: number, listId: number, userEmail: string) {
  const shareUser = await verifyEmail(userEmail);

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

  //fazer transaction disso e verificações da share
  await listRepository.createSharedUserList(userId, shareRequest.listId);
  const acceptedRequest = await shareRepository.updateAcceptedRequest(requestId);

  return acceptedRequest;
}

async function updateRefusedRequest(userId: number, requestId: number) {
  await verifyRequest(requestId);

  const refusedRequest = await shareRepository.updateRefusedRequest(requestId);

  return refusedRequest;
}

async function verifyEmail(email: string) {
  const user = await userRepository.findUserByEmail(email)

  if(!user){
    throw invalidUserEmailError();
  }
  
  return user;
}

async function verifyRequest(requestId: number) {
  return await shareRepository.findShareRequestById(requestId);
}

const shareService = {
  findSharedLists,
  findSharedOwnerLists,
  findShareRequests,
  createSharedRequest,
  updateAcceptedRequest,
  updateRefusedRequest
};

export default shareService;
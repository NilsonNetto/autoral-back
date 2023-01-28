import { invalidListOwnerError, invalidUserIdError, cannotFinishListError } from "@/Errors";
import { invalidListIdError } from "@/Errors";
import listRepository, {listParams} from "@/Repositories/list-repository"
import userRepository from "@/Repositories/user-repository";

async function findList(userId: number) {
  return listRepository.findListsByUserId(userId);
}

async function findListById(listId: number) {
  return listRepository.findListsByListId(listId);
}

async function createList(userId: number, listData: listParams) {
  //fazer uma transaction aqui, só insere a lista se fizer um userList
  const createdList = await listRepository.createList(listData)
  
  const createdUserlist = await listRepository.createUserList(userId, createdList.id)
  
  return createdUserlist;
}

async function shareList(sharedData: shareListParams ) {
  const list = await verifyList(sharedData.listId);

  await verifyOwner(sharedData.ownerUserId, list.id);

  const user = await verifyUser(sharedData.sharedUserId);

  return listRepository.createSharedUserList(user.id, list.id);
}

async function finishList(userId: number, listId: number ) {
  const list = await verifyList(listId);
 
  const userList = await listRepository.findUserListByUserIdAndListId(userId, listId);

  if(!userList || !userList.shared){
    throw cannotFinishListError();
  }

  const finishedList = await listRepository.updateFinishedList(list.id);

  return finishedList;
}

async function deleteList(userId: number, listId: number ) {
  const list = await verifyList(listId);
 
  await verifyOwner(userId, list.id);

  //const deleteList = await listRepository.updateFinishedList(list.id);

  return
}

async function verifyList(listId: number) {
  const list = await listRepository.findListByListId(listId);

  if(!list){
    throw invalidListIdError();
  }

  return list;
}

async function verifyOwner(ownerUserId: number, listId: number) {
  const userList = await listRepository.findUserListByUserIdAndListId(ownerUserId, listId);

  if(!userList) {
    throw invalidListIdError();
  }

  if(!userList.owner){
    throw invalidListOwnerError();
  }

  return userList;
}

async function verifyUser(userId: number) {
  const user = await userRepository.findUserByUserId(userId);

  if(!user){
    throw invalidUserIdError();
  }

  return user;
}

export type shareListParams = {
  ownerUserId: number,
  sharedUserId: number,
  listId: number,
}

const listService = {
  findList,
  findListById,
  createList,
  shareList,
  finishList,
  deleteList
};

export default listService;
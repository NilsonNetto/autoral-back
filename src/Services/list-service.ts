import { invalidListOwnerError, cannotFinishListError } from "@/Errors";
import { invalidListIdError } from "@/Errors";
import listRepository, {listParams} from "@/Repositories/list-repository"

async function findList(userId: number) {
  return listRepository.findListsByUserId(userId);
}

async function findListById(listId: number) {
  return listRepository.findListByListId(listId);
}

async function createList(userId: number, listData: listParams) {
  //fazer uma transaction aqui, só insere a lista se fizer um userList
  const createdList = await listRepository.createList(listData)
  
  await listRepository.createUserList(userId, createdList.id)
  
  return createdList;
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
  //vai ter que deletar um monte de outras coisas junto
  //const deleteList = await listRepository.deleteFinishedList(list.id);

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

export type shareListParams = {
  ownerUserId: number,
  sharedUserId: number,
  listId: number,
}

const listService = {
  findList,
  findListById,
  createList,
  finishList,
  deleteList
};

export default listService;
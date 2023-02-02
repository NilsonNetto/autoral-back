import { invalidListOwnerError, cannotModifyError } from "@/Errors";
import { invalidListIdError } from "@/Errors";
import { alreadyFinishedError } from "@/Errors/already-finished-error";
import { notFoundDataError } from "@/Errors/not-found-data-error";
import listRepository, {listParams} from "@/Repositories/list-repository"

async function findList(userId: number) {
  const userLists = listRepository.findListsByUserId(userId);
  
  if(!userLists){
    throw notFoundDataError();
  }

  return userLists;
}

async function findListById(listId: number) {
  const listName = listRepository.findListByListId(listId);
  
  if(!listName){
    throw notFoundDataError();
  }
  
  return listName;
}

async function createList(userId: number, listData: listParams) {
  //fazer uma transaction aqui, só insere a lista se fizer um userList
  const createdList = await listRepository.createList(listData)
  
  await listRepository.createUserList(userId, createdList.id)
  
  return createdList;
}

async function finishList(userId: number, listId: number ) {
  const list = await verifyList(listId);
  
  if(list.finished){
    throw alreadyFinishedError();
  }
 
  const userList = await listRepository.findUserListByUserIdAndListId(userId, listId);

  if(!userList || !userList.shared){
    throw cannotModifyError();
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

const listService = {
  findList,
  findListById,
  createList,
  finishList,
  deleteList
};

export default listService;
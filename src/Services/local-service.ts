import { invalidListOwnerError, invalidUserIdError, cannotFinishListError, invalidListIdError, invalidListStatusError } from "@/Errors";
import listRepository from "@/Repositories/list-repository";
import localRepository, {localParams} from "@/Repositories/local-repository"
import { listStatus } from "@prisma/client";

async function findListLocals(listId: number) {
  const listLocals = await localRepository.findLocalByListId(listId);

  return listLocals;
}

async function createLocal(listId: number, localData: localParams) {
  await verifyListId(listId);

  const local = await verifyLocal(localData);

  if(!local) {
    //fazer transition disso aqui
    const createdLocal = await localRepository.createLocal(localData);

    return createListLocal(listId, createdLocal.id);
  }
  
  return createListLocal(listId, local.id);
}

async function verifyListId(listId: number) {
  const list = await listRepository.findListByListId(listId);

  if(!list){
    throw invalidListIdError();
  }

  if(list.status !== listStatus.open) {
    throw invalidListStatusError();
  }

  return list;
}

async function verifyLocal(localData: localParams) {
  return localRepository.findLocalByNameAndComplement(localData);
}

async function createListLocal(listId: number, localId: number) {
  return localRepository.createListLocal(listId, localId)
}

const localService = {
  findListLocals,
  createLocal
};

export default localService;
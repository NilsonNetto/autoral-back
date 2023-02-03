import { notFoundDataError } from "@/Errors";
import historyRepository from "@/Repositories/history-repository";

async function findAllListHistory(userId: number) {
  const allListsHistory = await historyRepository.findAllFinishedList(userId);

  if(!allListsHistory){
    throw notFoundDataError();
  }

  return allListsHistory;
}

async function findListHistory(userId: number, listId: number) {
  const listHistory = await historyRepository.findFinishedListByListId(listId);

  if(!listHistory){
    throw notFoundDataError();
  }

  return listHistory;
}

async function findItemHistory(userId: number, itemId: number) {
  return
}

const historyService = {
  findAllListHistory,
  findListHistory,
  findItemHistory
};

export default historyService;
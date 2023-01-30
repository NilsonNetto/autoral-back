import { prisma } from "@/Configs";

async function findAllFinishedList(userId: number) {
  return prisma.usersLists.findMany({
    where:{
      userId,
      shared: true 
    }
  })
  //aqui falta filtrar se a lista foi terminada ou não
}

async function findFinishedListByListId(listId: number) {
  return prisma.lists.findFirst({
    where: {
      id: listId,
      finished: true
    } 
  })
}

async function findItemHistoryByItemId(userId:number, itemId:number) {
  return prisma.items.findMany({
    where:{
      itemId
    },
    include:{
      ItemName: true,
    }
  })
  //aqui falta filtrar se a lista foi terminada ou não
}

const historyRepository = {
  findAllFinishedList,
  findFinishedListByListId,
  findItemHistoryByItemId
};

export default historyRepository;
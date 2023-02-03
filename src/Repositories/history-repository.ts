import { prisma } from "@/Configs";

async function findAllFinishedList(userId: number) {
  return prisma.usersLists.findMany({
    where:{
      userId,
      shared: true,
      Lists: {
        finished: true
      } 
    },
    select: {
      id: true,
      owner: true,
      Lists: {
        select: {
          id: true,
          name: true,
          createdAt: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })
}

async function findFinishedListByListId(listId: number) {
  return prisma.lists.findFirst({
    where: {
      id: listId,
      finished: true
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      ListsLocals: {
        select: {
          id: true,
          LocalsName: {
            select: {
              id: true,
              name: true,
            }
          }
        }
      }
    } 
  })
}

const historyRepository = {
  findAllFinishedList,
  findFinishedListByListId,
};

export default historyRepository;
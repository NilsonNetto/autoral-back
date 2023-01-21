import { prisma } from "@/Configs";
import { Prisma } from "@prisma/client";

async function createSession(data: Prisma.sessionsUncheckedCreateInput) {
  return prisma.sessions.create({
    data
  })
}

const authenticationRepository = {
  createSession
};

export default authenticationRepository;
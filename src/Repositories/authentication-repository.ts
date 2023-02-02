import { prisma } from "@/Configs";
import { Sessions } from "@prisma/client";

async function createSession(data: sessionParams) {
  return prisma.sessions.create({
    data
  })
}

export type sessionParams = Pick<Sessions, "userId" | "token">;

const authenticationRepository = {
  createSession
};

export default authenticationRepository;
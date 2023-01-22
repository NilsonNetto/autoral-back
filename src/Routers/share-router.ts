import { Router } from 'express';
import { listLocalsGet, listLocalsPost } from '@/Controllers';
import { authenticateToken, validateBody, validateParams } from '@/Middlewares';
import { listIdSchema, localSchema } from '@/Schemas';

const shareRouter = Router();

shareRouter
  .all("/*", authenticateToken)
  .get("/", listLocalsGet)
  .post("/accept/:requestId",validateParams(listIdSchema), validateBody(localSchema), listLocalsPost)
  .post("/refuse/:requestId")
  .post("/")//transferir a rota de fazer o share para cá

export { shareRouter };
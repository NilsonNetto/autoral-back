import { Router } from 'express';
import { listLocalsGet, listLocalsPost } from '@/Controllers';
import { authenticateToken, validateBody, validateParams } from '@/Middlewares';
import { listIdSchema, localSchema } from '@/Schemas';

const localRouter = Router();

localRouter
  .all("/*", authenticateToken)
  .get("/:listId", validateParams(listIdSchema), listLocalsGet)
  .post("/:listId",validateParams(listIdSchema), validateBody(localSchema), listLocalsPost)
  
export { localRouter };
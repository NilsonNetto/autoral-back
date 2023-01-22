import { Router } from 'express';
import { listLocalsGet, listLocalsPost } from '@/Controllers';
import { authenticateToken, validateBody, validateParams } from '@/Middlewares';
import { listIdSchema, localSchema } from '@/Schemas';

const profileRouter = Router();

profileRouter
  .all("/*", authenticateToken)
  .get("/:userId", validateParams(listIdSchema), listLocalsGet)
  .put("/:userId",validateParams(listIdSchema), validateBody(localSchema), listLocalsPost)
  
export { profileRouter };
import { Router } from 'express';
import { listItemsGet, listLocalsPost } from '@/Controllers';
import { authenticateToken, validateBody, validateParams } from '@/Middlewares';
import { itemSchema, listLocalIdSchema } from '@/Schemas';

const itemRouter = Router();

itemRouter
  .all("/*", authenticateToken)
  .get("/:listLocalId", validateParams(listLocalIdSchema), listItemsGet)
  .post("/:listLocalId", validateParams(listLocalIdSchema), validateBody(itemSchema) ,listItemsGet)

export { itemRouter };
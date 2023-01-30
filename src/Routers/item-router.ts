import { Router } from 'express';
import { listItemsGet, listItemPost, checkItemUpdate, itemPut, itemDelete } from '@/Controllers';
import { authenticateToken, validateBody, validateParams } from '@/Middlewares';
import { itemSchema, listLocalIdSchema, itemIdSchema } from '@/Schemas';

const itemRouter = Router();

itemRouter
  .all("/*", authenticateToken)
  .get("/:listLocalId", validateParams(listLocalIdSchema), listItemsGet)
  .post("/:listLocalId", validateParams(listLocalIdSchema), validateBody(itemSchema) ,listItemPost)
  .post("/check/:itemId", validateParams(itemIdSchema), checkItemUpdate)
  .put("/:itemId", validateParams(itemIdSchema), validateBody(itemSchema), itemPut)
  .delete("/:itemId", validateParams(itemIdSchema), itemDelete)

export { itemRouter };
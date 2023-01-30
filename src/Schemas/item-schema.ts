import { insertItemParams } from "@/Repositories/item-repository";
import Joi from "joi";

export const itemSchema = Joi.object<insertItemParams>({
  name: Joi.string().required(),
  quantity: Joi.number().min(0),
  unit: Joi.string()
});

export const listLocalIdSchema = Joi.object<{listLocalId: number}>({
  listLocalId: Joi.number().integer().required()
});

export const itemIdSchema = Joi.object<{itemId: number}>({
  itemId: Joi.number().integer().required()
});
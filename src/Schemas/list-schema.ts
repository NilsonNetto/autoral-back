import { listParams } from "@/Services/list-service";
import Joi from "joi";

export const listSchema = Joi.object<listParams>({
  name: Joi.string().required(),
  complement: Joi.string()
});

export const shareListUserSchema = Joi.object<{userId: number}>({
  userId: Joi.number().integer().required()
});

export const listIdSchema = Joi.object<{listId: number}>({
  listId: Joi.number().integer().required()
});
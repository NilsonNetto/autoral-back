import Joi from "joi";

export const requestIdSchema = Joi.object<{requestId: number}>({
  requestId: Joi.number().integer().required()
});
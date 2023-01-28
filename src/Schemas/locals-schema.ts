import { localParams } from "@/Repositories/local-repository";
import Joi from "joi";

export const localSchema = Joi.object<localParams>({
  name: Joi.string().required()
});
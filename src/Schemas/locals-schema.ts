import { localParams } from "@/Services/local-service";
import Joi from "joi";

export const localSchema = Joi.object<localParams>({
  name: Joi.string().required(),
  complement: Joi.string()
});
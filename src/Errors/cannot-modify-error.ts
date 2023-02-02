import { ApplicationError } from "@/protocols";

export function cannotModifyError(): ApplicationError {
  return {
    name: "CannotModifyError",
    message: "You cannot modify this!",
  };
}
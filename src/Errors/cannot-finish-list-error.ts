import { ApplicationError } from "@/protocols";

export function cannotFinishListError(): ApplicationError {
  return {
    name: "CannotFinishListError",
    message: "You cannot finish this list!",
  };
}
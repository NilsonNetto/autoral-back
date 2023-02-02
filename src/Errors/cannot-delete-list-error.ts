import { ApplicationError } from "@/protocols";

export function cannotDeleteListError(): ApplicationError {
  return {
    name: "CannotDeleteListError",
    message: "Only list owner can delete this list!",
  };
}
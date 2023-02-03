import { ApplicationError } from "@/protocols";

export function cannotShareListError(): ApplicationError {
  return {
    name: "CannotShareListError",
    message: "Only list owner can share this list!",
  };
}
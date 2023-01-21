import { ApplicationError } from "@/protocols";

export function invalidListIdError(): ApplicationError {
  return {
    name: "InvalidListIdError",
    message: "No list with this listId",
  };
}

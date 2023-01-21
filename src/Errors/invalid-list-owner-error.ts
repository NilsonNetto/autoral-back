import { ApplicationError } from "@/protocols";

export function invalidListOwnerError(): ApplicationError {
  return {
    name: "invalidListOwnerError",
    message: "The user is not owner of this list",
  };
}

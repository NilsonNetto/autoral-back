import { ApplicationError } from "@/protocols";

export function duplicatedUsernameError(): ApplicationError {
  return {
    name: "DuplicatedUsernameError",
    message: "Username already registered",
  };
}

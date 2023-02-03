import { ApplicationError } from "@/protocols";

export function alreadySharedError(): ApplicationError {
  return {
    name: "AlreadySharedError",
    message: "This is already shared with this user!",
  };
}
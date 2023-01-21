import { ApplicationError } from "@/protocols";

export function invalidUserIdError(): ApplicationError {
  return {
    name: "InvalidUserIdError",
    message: "UserId didnt exists",
  };
}
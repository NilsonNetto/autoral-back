import { ApplicationError } from "@/protocols";

export function invalidUserEmailError(): ApplicationError {
  return {
    name: "InvalidUserEmailError",
    message: "User email didnt exists",
  };
}
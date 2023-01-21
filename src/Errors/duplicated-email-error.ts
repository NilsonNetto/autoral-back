import { ApplicationError } from "@/protocols";

export function duplicatedEmailError(): ApplicationError {
  return {
    name: "DuplicatedEmailError",
    message: "Email already registered",
  };
}

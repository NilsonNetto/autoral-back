import { ApplicationError } from "@/protocols";

export function alreadyAnsweredError(): ApplicationError {
  return {
    name: "AlreadyAnsweredError",
    message: "This is already answered!",
  };
}
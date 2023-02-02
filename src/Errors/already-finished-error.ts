import { ApplicationError } from "@/protocols";

export function alreadyFinishedError(): ApplicationError {
  return {
    name: "AlreadyFinishedError",
    message: "This is already finished!",
  };
}
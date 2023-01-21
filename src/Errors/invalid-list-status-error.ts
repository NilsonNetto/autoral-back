import { ApplicationError } from "@/protocols";

export function invalidListStatusError(): ApplicationError {
  return {
    name: "InvalidListStatusError",
    message: "This list is already finished",
  };
}

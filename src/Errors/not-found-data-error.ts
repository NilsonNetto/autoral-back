import { ApplicationError } from "@/protocols";

export function notFoundDataError(): ApplicationError {
  return {
    name: "NotFoundDataError",
    message: "Requested data not found",
  };
}
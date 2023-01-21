import { ApplicationError } from "@/protocols";

export function invalidSchemaError(details: string[]): invalidateSchemaError {
  return {
    name: "InvalidSchemaError",
    message: "Invalid params on data",
    details,
  };
}

type invalidateSchemaError = ApplicationError & {details: string[]}
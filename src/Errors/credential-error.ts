import { ApplicationError } from "@/protocols";

export function credentialError(): ApplicationError {
  return {
    name: "CredentialError",
    message: "Email or password are incorrect",
  };
}
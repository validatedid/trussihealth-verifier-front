import axios from "axios";
import {BACKEND, OPENID} from "../config";
import { I18n } from "../i18n/i18n";

export interface BackendError {
  statusCode: number;
  internalCode: string;
  message: string;
  timestamp: string;
}

export interface ParsedBackendError {
  title: string;
  details?: string;
}

export interface BackendResponse {
  data?: unknown;
  error?: ParsedBackendError;
}

function translateBackendError(error: BackendError): ParsedBackendError {
  console.log(error, error.message);
  const parsedError = {
    title: I18n.t(error.internalCode),
    details: error.message.split("]")[1],
  };
  return parsedError;
}

async function authLogin(code: string) {
  try {
    const body = {
      code: code,
      redirectUri: OPENID.REDIRECT_CALLBACK_LOGIN,
    };

    const url = `${BACKEND.ENDPOINTS.AUTHORIZE}`;

    const response = await axios.post(url, body);
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`${"error de login"} ${response.data}.`);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const parsedError = translateBackendError(
        error.response?.data as BackendError
      );
      return { error: parsedError };
    }
    return { error: { title: "Unknown" } };
  }
}

async function validateEidasSeal(verifiableCredential: object) {
  try {
    const body = {
      verifiableCredential,
    };

    const url = `${BACKEND.ENDPOINTS.VALIDATE}`;

    const response = await axios.post(url, body);
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`${"error de login"} ${response.data}.`);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const parsedError = translateBackendError(
        error.response?.data as BackendError
      );
      return { error: parsedError };
    }
    return { error: { title: "Unknown" } };
  }
}

async function verifyValidCredential(
  statusListId: number,
  credentialId: number
) {
  try {
    const url = `${BACKEND.ENDPOINTS.REVOKED}/statusList/${statusListId}/credentialId/${credentialId}`;

    const response = await axios.get(url);
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`${"error de login"} ${response.data}.`);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const parsedError = translateBackendError(
        error.response?.data as BackendError
      );
      return { error: parsedError };
    }
    return { error: { title: "Unknown" } };
  }
}

export { authLogin, validateEidasSeal, verifyValidCredential };

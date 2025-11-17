import axios from "axios";
import { BookingRequest, BookingResponse } from "../types/booking";

/**
 * Service que hace proxy al API real de AWS.
 * - GET /key -> proxy a AWS /key
 * - POST /booking -> proxy a AWS /booking
 *
 * También simula fallo aleatorio (20%) para reproducir inestabilidad.
 */

const AWS_BASE = "https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com";

export async function getApiKey(): Promise<string> {
  const resp = await axios.get<{ key?: string }>(`${AWS_BASE}/key`, {
    timeout: 8000,
  });
  // algunos endpoints devuelven la key directa; normalizamos:
  return (resp.data && ((resp.data as any).key ?? resp.data)) as string;
}

export async function forwardBooking(
  payload: BookingRequest
): Promise<BookingResponse> {
  // Simular falla aleatoria 20%
  const rnd = Math.random();
  if (rnd < 0.2) {
    const err: any = new Error("Simulated server failure");
    err.code = "SIMULATED_FAILURE";
    throw err;
  }

  // Obtener apiKey desde AWS (proxy)
  const keyResp = await axios.get(`${AWS_BASE}/key`, { timeout: 8000 });
  const apiKey = (keyResp.data as any)?.key ?? keyResp.data;

  const resp = await axios.post<BookingResponse>(
    `${AWS_BASE}/booking`,
    payload,
    {
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      timeout: 10000,
    }
  );

  return resp.data;
}

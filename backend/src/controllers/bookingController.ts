import { Request, Response } from "express";
import { getApiKey, forwardBooking } from "../services/bookingSevices";

/** GET /api/key */
export async function getKeyHandler(_req: Request, res: Response) {
  try {
    const key = await getApiKey();
    return res.json({ key });
  } catch (err: any) {
    console.error("Error getting API key:", err?.message ?? err);
    return res
      .status(502)
      .json({ message: "No se pudo obtener la API key del proveedor." });
  }
}

/** POST /api/booking */
export async function createBookingHandler(req: Request, res: Response) {
  try {
    // validación mínima server-side (defensiva)
    const body = req.body;
    if (
      !body ||
      !body.when ||
      !body.lanes ||
      !body.people ||
      !Array.isArray(body.shoes)
    ) {
      return res.status(400).json({ message: "Payload inválido." });
    }

    const booking = await forwardBooking(body);
    return res.json(booking);
  } catch (err: any) {
    // Distinguimos fallo simulado, timeouts, y errores del proveedor
    if (err?.code === "SIMULATED_FAILURE") {
      return res.status(503).json({
        message: "Tjänsten är tillfälligt otillgänglig. Försök igen.",
      });
    }
    console.error("Error forwarding booking:", err?.message ?? err);
    return res
      .status(502)
      .json({ message: "Fel vid kommunikation med bokningsservice." });
  }
}

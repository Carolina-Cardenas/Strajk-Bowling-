import { Request, Response } from "express";
import { getApiKey, forwardBooking } from "../services/bookingServices";

/** GET /api/key */
export async function getKeyHandler(_req: Request, res: Response) {
  try {
    const key = await getApiKey();
    return res.json({ key });
  } catch (err: any) {
    console.error("Error getting API key:", err?.message ?? err);
    return res.status(502).json({
      message: "The API key from the provider could not be obtained.",
    });
  }
}

/** POST /api/booking */
export async function createBookingHandler(req: Request, res: Response) {
  try {
    // validación mínima server-side (defensiva)
    const body = req.body;

    const lanes = Number(body.lanes);
    const people = Number(body.people);

    if (
      !body ||
      !body.when ||
      isNaN(lanes) ||
      lanes < 1 ||
      isNaN(people) ||
      people < 1 ||
      !Array.isArray(body.shoes)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid payload (Missing or Invalid Fields)." });
    }

    const payload = { ...body, lanes, people };

    const booking = await forwardBooking(payload);
    console.log("Booking forwarded, response:", booking);
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

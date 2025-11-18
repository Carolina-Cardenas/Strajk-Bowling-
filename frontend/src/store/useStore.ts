import create from "zustand";
import { BookingResponse, BookingRequest } from "../types/booking";
import { client } from "../api/client";

/**
 * Zustand store:
 * - bookingData: request en construcción
 * - bookingResponse: respuesta final para Confirmation
 */

type State = {
  bookingData: BookingRequest | null;
  bookingResponse: BookingResponse | null;
  setBookingData: (d: BookingRequest) => void;
  submitBooking: () => Promise<void>;
};

export const useStore = create<State>((set, get) => ({
  bookingData: null,
  bookingResponse: null,
  setBookingData: (d) => set({ bookingData: d }),
  submitBooking: async () => {
    const payload = get().bookingData;
    if (!payload) throw new Error("No booking data");
    const resp = await client.post<BookingResponse>("/booking", payload);
    set({ bookingResponse: resp.data });
  },
}));

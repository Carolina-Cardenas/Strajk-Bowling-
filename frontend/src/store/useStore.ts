import { create } from "zustand";
import { BookingResponse, BookingRequest } from "../types/booking";
import { client } from "../api/client";

/**
 * Zustand store:
 *  Se encarga de almacenar de forma centralizada los datos de la reserva:
 * - bookingData: El payload original de la petición (opcional para referencia).
 * - bookingResponse: La respuesta final y exitosa del servidor (clave para Confirmation).
 */

type State = {
  bookingData: BookingRequest | null;
  bookingResponse: BookingResponse | null;
  setBookingData: (d: BookingRequest) => void;
  setBookingResponse: (r: BookingResponse) => void;
};

export const useStore = create<State>((set) => ({
  bookingData: null,
  bookingResponse: null,

  setBookingData: (d) => set({ bookingData: d }),

  // Implementación de la acción que recibe la respuesta del servidor
  setBookingResponse: (r) => set({ bookingResponse: r }),
}));

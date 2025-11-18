import React, { useState, useEffect } from "react";
import ShoeInputs from "./ShoeInputs";
//
import { useStore } from "../store/useStore";
import { BookingRequest } from "../types/booking";
import { client } from "../api/client";
import { useNavigate } from "react-router-dom";

/**
 * BookingForm: valida localmente y envía al backend local (/api/booking)
 * - Validaciones:
 *   * lanes >=1
 *   * people >=1
 *   * people <= lanes * 4
 *   * shoes.length === people
 *   * tallas entre 20..50
 */

const BookingForm: React.FC = () => {
  const [when, setWhen] = useState<string>(() => {
    const d = new Date();
    d.setHours(18, 0, 0, 0);
    return d.toISOString().slice(0, 16);
  });
  const [lanes, setLanes] = useState<number>(1);
  const [people, setPeople] = useState<number>(1);
  const [shoes, setShoes] = useState<number[]>([44]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const setBookingData = useStore((s) => s.setBookingData);
  const setBookingResponse = useStore(
    (s) => (s as any).setBookingResponse ?? (() => {})
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (people > shoes.length) {
      setShoes((prev) => [...prev, ...Array(people - prev.length).fill(44)]);
    } else if (people < shoes.length) {
      setShoes((prev) => prev.slice(0, people));
    }
  }, [people]);

  const validate = (): string | null => {
    if (!when) return "Selecciona fecha y hora.";
    if (lanes < 1) return "Debes seleccionar al menos 1 pista.";
    if (people < 1) return "Debes seleccionar al menos 1 jugador.";
    const maxPlayers = lanes * 4;
    if (people > maxPlayers)
      return `Con ${lanes} pista(s) el máximo es ${maxPlayers} jugadores.`;
    if (shoes.length !== people)
      return "Debes ingresar una talla por cada jugador.";
    if (shoes.some((s) => !s || s < 20 || s > 50))
      return "Todas las tallas deben estar entre 20 y 50.";
    return null;
  };

  const handleShoeChange = (index: number, value: number) => {
    setShoes((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    const payload: BookingRequest = {
      when: new Date(when).toISOString(),
      lanes,
      people,
      shoes,
    };

    setLoading(true);
    try {
      // Guardar request en store (opcional)
      setBookingData(payload);

      // Llamada directa para mostrar manejo de errores sin depender de zustand
      const resp = await client.post("/booking", payload);
      // resp.data tiene la BookingResponse
      // Guardar manualmente en store para Confirmation
      (useStore.getState() as any).bookingResponse = resp.data;
      navigate("/confirmation");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "No se pudo completar la reserva.";
      setError(`Error al reservar: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Date & time
        <input
          type="datetime-local"
          value={when}
          onChange={(e) => setWhen(e.target.value)}
          required
        />
      </label>

      <label>
        Number of lanes
        <input
          type="number"
          min={1}
          value={lanes}
          onChange={(e) => setLanes(Number(e.target.value))}
        />
      </label>

      <label>
        Number of players
        <input
          type="number"
          min={1}
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
        />
      </label>

      <h3>Shoes</h3>
      <ShoeInputs count={people} values={shoes} onChange={handleShoeChange} />

      {error && (
        <div role="alert" className={styles.error}>
          {error}
        </div>
      )}

      <button type="submit" className={styles.submit} disabled={loading}>
        {loading ? "Reservando..." : "STRIIIKE!"}
      </button>
    </form>
  );
};

export default BookingForm;

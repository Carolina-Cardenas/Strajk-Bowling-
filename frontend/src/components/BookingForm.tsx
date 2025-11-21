import React, { useState, useEffect } from "react";
import ShoeInputs from "./ShoeInputs";
import "../styles/BookingForm.css";
import { useStore } from "../store/useStore";
import { BookingRequest } from "../types/booking";
import { client } from "../api/client";
import { useNavigate } from "react-router-dom";

const BookingForm: React.FC = () => {
  const [when, setWhen] = useState<string>(() => {
    const d = new Date();
    d.setHours(18, 0, 0, 0);
    return d.toISOString().slice(0, 16);
  });
  const [lanes, setLanes] = useState<number>(1);
  const [people, setPeople] = useState<number>(1);
  const [shoes, setShoes] = useState<number[]>([43]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const setBookingData = useStore((s) => s.setBookingData);
  const setBookingResponse = useStore((s) => s.setBookingResponse);
  // const submitBooking = useStore((s) => s.submitBooking);

  const navigate = useNavigate();

  useEffect(() => {
    if (people > shoes.length) {
      setShoes((prev) => [...prev, ...Array(people - prev.length).fill(43)]);
    } else if (people < shoes.length) {
      setShoes((prev) => prev.slice(0, people));
    }
  }, [people]);

  const validate = (): string | null => {
    if (!when) return "Select date and time.";
    if (lanes < 1) return "You must select at least 1 track.";
    if (people < 1) return "You must select at least 1 player.";
    const maxPlayers = lanes * 4;
    if (people > maxPlayers)
      return `With ${lanes} track(s) the maximum is ${maxPlayers} players.`;
    if (shoes.length !== people) return "You must enter one size per player.";
    if (shoes.some((s) => !s || s < 38 || s > 43))
      return "All sizes must be between 38 and 43.";
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
    console.log("Payload to send:", payload);
    setLoading(true);
    try {
      setBookingData(payload);

      // 1. La llamada al backend
      const resp = await client.post("/booking", payload);
      if (!resp || !resp.data) {
        throw new Error("No response was received from the backend.");
      }

      // 2. Guardar la respuesta en el store (ESTO ES CLAVE)

      setBookingResponse(resp.data);

      // 3. Navegar a la página de confirmación
      navigate("/confirmation");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "The reservation could not be completed.";
      setError(`Error booking: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
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
        <div role="alert" className="error">
          {error}
        </div>
      )}

      <button type="submit" className="submit" disabled={loading}>
        {loading ? "Booking..." : "STRIIIKE!"}
      </button>
    </form>
  );
};

export default BookingForm;

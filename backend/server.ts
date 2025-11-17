import express from "express";
import cors from "cors";
import bookingRoutes from "./src/routers/bookingsRouters";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", bookingRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => {
  console.log(`Backend local corriendo en http://localhost:${PORT}/api`);
});

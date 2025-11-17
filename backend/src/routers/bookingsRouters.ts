import { Router } from "express";
import {
  getKeyHandler,
  createBookingHandler,
} from "../controllers/bookingController";

const router = Router();

router.get("/key", getKeyHandler);
router.post("/booking", createBookingHandler);

export default router;

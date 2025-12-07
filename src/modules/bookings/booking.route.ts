import { Router } from "express";
import authorize from "../../middlewares/authorize";
import { bookingControlers } from "./booking.controler";

const router = Router();

// * Create Booking (Admin or user)
router.post("/", authorize("admin", "customer"), bookingControlers.createBooking)

// * Get all Bookin (Role based)
router.get("/", authorize("admin","customer"), bookingControlers.getAllBooking)

export const bookingRoutes = router;
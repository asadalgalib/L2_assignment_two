import { Router } from "express";
import authorize from "../../middlewares/authorize";
import { bookingControlers } from "./booking.controler";

const router = Router();

// * Create Booking (Admin or user)
router.post("/", authorize("admin", "customer"), bookingControlers.createBooking)

// * Get all Booking (Role based)
router.get("/", authorize("admin", "customer"), bookingControlers.getAllBooking);

// * Update  Booking (Role based)
router.put("/:bookingId", authorize("admin", "customer"), bookingControlers.updateBooking)

export const bookingRoutes = router;
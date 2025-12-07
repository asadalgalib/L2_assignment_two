import { Router } from "express";
import { authorizeUser } from "../../middlewares/authorize";
import { bookingControlers } from "./booking.controler";

const router = Router();

// * Create Booking (Admin or user)
router.post("/",authorizeUser(), bookingControlers.createBooking)

export const bookingRoutes = router;
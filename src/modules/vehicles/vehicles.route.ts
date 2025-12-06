import { Router } from "express";
import { vehiclesControlers } from "./vehicles.controler";
import { authorizeAdmin } from "../../middlewares/authorize";

const router = Router();

// * Post Vehicles Route
router.post("/", authorizeAdmin(), vehiclesControlers.createVehicles)

export const vehiclesRoutes = router;
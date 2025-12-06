import { Router } from "express";
import { vehiclesControlers } from "./vehicles.controler";
import { authorizeAdmin } from "../../middlewares/authorize";

const router = Router();

// * Post Vehicles Route(Admin only)
router.post("/", authorizeAdmin(), vehiclesControlers.createVehicles);

// * Get Vehicles Route
router.get("/", vehiclesControlers.getVehicles);

// * Get single Vehicles
router.get("/:vehicleId", vehiclesControlers.getSingleVehicles)

// * Update vehicles (Admin Only)
router.put("/:vehicleId", authorizeAdmin(), vehiclesControlers.updateVehicles);

// * Delete vehicles (Admin only)
router.delete("/:vehicleId", authorizeAdmin(), vehiclesControlers.deleteVehicles)

export const vehiclesRoutes = router;
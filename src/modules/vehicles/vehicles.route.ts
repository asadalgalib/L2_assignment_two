import { Router } from "express";
import { vehiclesControlers } from "./vehicles.controler";
import authorize from "../../middlewares/authorize";

const router = Router();

// * Post Vehicles Route(Admin only)
router.post("/", authorize("admin"), vehiclesControlers.createVehicles);

// * Get Vehicles Route
router.get("/", vehiclesControlers.getVehicles);

// * Get single Vehicles
router.get("/:vehicleId", vehiclesControlers.getSingleVehicles)

// * Update vehicles (Admin Only)
router.put("/:vehicleId", authorize("admin"), vehiclesControlers.updateVehicles);

// * Delete vehicles (Admin only)
router.delete("/:vehicleId", authorize("admin"), vehiclesControlers.deleteVehicles)

export const vehiclesRoutes = router;
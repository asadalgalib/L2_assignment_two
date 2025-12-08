"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesRoutes = void 0;
const express_1 = require("express");
const vehicles_controler_1 = require("./vehicles.controler");
const authorize_1 = __importDefault(require("../../middlewares/authorize"));
const router = (0, express_1.Router)();
// * Post Vehicles Route(Admin only)
router.post("/", (0, authorize_1.default)("admin"), vehicles_controler_1.vehiclesControlers.createVehicles);
// * Get Vehicles Route
router.get("/", vehicles_controler_1.vehiclesControlers.getVehicles);
// * Get single Vehicles
router.get("/:vehicleId", vehicles_controler_1.vehiclesControlers.getSingleVehicles);
// * Update vehicles (Admin Only)
router.put("/:vehicleId", (0, authorize_1.default)("admin"), vehicles_controler_1.vehiclesControlers.updateVehicles);
// * Delete vehicles (Admin only)
router.delete("/:vehicleId", (0, authorize_1.default)("admin"), vehicles_controler_1.vehiclesControlers.deleteVehicles);
exports.vehiclesRoutes = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesControlers = void 0;
const handleError_1 = require("../../helper/handleError");
const vehicles_service_1 = require("./vehicles.service");
const handleOK_1 = require("../../helper/handleOK");
// * Create vehicles
const createVehicles = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehiclesServices.createVehicles(req.body);
        return (0, handleOK_1.successPost)(res, "Vehicle created successfully", result);
    }
    catch (error) {
        return (0, handleError_1.internelServerError)(res, error);
    }
};
// * Get all vehicles
const getVehicles = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehiclesServices.getVehicles();
        if (!result) {
            return (0, handleOK_1.successGPD)(res, "No vehicles found", []);
        }
        return (0, handleOK_1.successGPD)(res, "Vehicles retrieved successfully", result);
    }
    catch (error) {
        return (0, handleError_1.internelServerError)(res, error);
    }
};
// * Get single vehicles
const getSingleVehicles = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const result = await vehicles_service_1.vehiclesServices.getSingleVehicles(vehicleId);
        if (!result) {
            return (0, handleOK_1.successGPD)(res, "No vehicles found", []);
        }
        return (0, handleOK_1.successGPD)(res, "Vehicles retrieved successfully", result);
    }
    catch (error) {
        return (0, handleError_1.internelServerError)(res, error);
    }
};
// * Update Vehicles
const updateVehicles = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const result = await vehicles_service_1.vehiclesServices.updateVehicles(req.body, vehicleId);
        if (!result) {
            return (0, handleError_1.notFound)(res, { message: "Update Failed" });
        }
        return (0, handleOK_1.successPost)(res, "Vehicles Updated successfully", result);
    }
    catch (error) {
        return (0, handleError_1.internelServerError)(res, error);
    }
};
// * Delete vehicle (if not booked)
const deleteVehicles = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const result = await vehicles_service_1.vehiclesServices.deleteVehicles(vehicleId);
        if (result === 1) {
            return (0, handleOK_1.successPost)(res, "Vehicles Deleted successfully", null);
        }
        return (0, handleOK_1.successGPD)(res, "Not available to Delete", { availability_status: "booked" });
    }
    catch (error) {
        return (0, handleError_1.internelServerError)(res, error);
    }
};
exports.vehiclesControlers = {
    createVehicles,
    getVehicles,
    getSingleVehicles,
    updateVehicles,
    deleteVehicles
};

import { Request, Response } from "express";
import { internelServerError, notFound } from "../../helper/handleError";
import { vehiclesServices } from "./vehicles.service";
import { successGPD, successPost } from "../../helper/handleOK";

// * Create vehicles
const createVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesServices.createVehicles(req.body)
        return successPost(res, "Vehicle created successfully", result)
    } catch (error: any) {
        return internelServerError(res, error);
    }
}
// * Get all vehicles
const getVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesServices.getVehicles()
        if (!result) {
            return successGPD(res, "No vehicles found", []);
        }
        return successGPD(res, "Vehicles retrieved successfully", result);
    } catch (error: any) {
        return internelServerError(res, error);
    }
}
// * Get single vehicles
const getSingleVehicles = async (req: Request, res: Response) => {
    try {
        const { vehicleId } = req.params;
        const result = await vehiclesServices.getSingleVehicles(vehicleId as string)
        if (!result) {
            return successGPD(res, "No vehicles found", []);
        }
        return successGPD(res, "Vehicles retrieved successfully", result);
    } catch (error: any) {
        return internelServerError(res, error);
    }
}
// * Update Vehicles
const updateVehicles = async (req: Request, res: Response) => {
    try {
        const { vehicleId } = req.params;
        const result = await vehiclesServices.updateVehicles(req.body, vehicleId as string);
        if (!result) {
            return notFound(res, { message: "Update Failed" })
        }
        return successPost(res, "Vehicles Updated successfully", result);
    } catch (error: any) {
        return internelServerError(res, error);
    }
}
// * Delete vehicle (if not booked)
const deleteVehicles = async (req: Request, res: Response) => {
    try {
        const { vehicleId } = req.params;
        const result = await vehiclesServices.deleteVehicles(vehicleId as string);
        if (result === 1) {
            return successPost(res, "Vehicles Deleted successfully", null);
        }
        return successGPD(res, "Not available to Delete", { availability_status: "booked" })
    } catch (error: any) {
        return internelServerError(res, error);
    }
}

export const vehiclesControlers = {
    createVehicles,
    getVehicles,
    getSingleVehicles,
    updateVehicles,
    deleteVehicles
}
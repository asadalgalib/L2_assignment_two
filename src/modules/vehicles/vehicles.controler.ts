import { Request, Response } from "express";
import { internelServerError } from "../../helper/handleError";
import { vehiclesServices } from "./vehicles.service";
import { successPost } from "../../helper/handleOK";

const createVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesServices.createVehicles(req.body)
        return successPost(res, "Vehicle created successfully", result)
    } catch (error: any) {
        return internelServerError(res, error);
    }
}

export const vehiclesControlers = {
    createVehicles
}
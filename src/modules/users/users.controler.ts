import { Request, Response } from "express";
import { internelServerError } from "../../helper/handleError";
import { userServices } from "./users.service";
import { successGPD } from "../../helper/handleOK";


const getAllUser = async (req: Request, res: Response) => {
    try {
        // * Bussiness logic
        const result = await userServices.getAllUser();
        // * Send response
        if (result.rows.length == 0) {
            return internelServerError(res, { message: "Something Went Wrong" })
        }
        return successGPD(res, "Users retrieved successfully", result.rows)
    } catch (error: any) {
        return internelServerError(res, error)
    }
}

export const userControlers = {
    getAllUser
}
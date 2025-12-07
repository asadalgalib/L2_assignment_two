import { Request, Response } from "express";
import { badRequest, forbiddenError, internelServerError } from "../../helper/handleError";
import { userServices } from "./users.service";
import { successGPD, successPost } from "../../helper/handleOK";

// * Get all user (Admin only)
const getAllUser = async (req: Request, res: Response) => {
    try {
        // * Bussiness logic
        const result = await userServices.getAllUser();
        // * Send response
        if (!result) {
            return internelServerError(res, { message: "Something Went Wrong" })
        }
        return successGPD(res, "Users retrieved successfully", result.rows)
    } catch (error: any) {
        return internelServerError(res, error)
    }
}
// * Update user (Admin or own)
const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const reqId = req.user?.id;
        const { name, email, password, phone, role } = req.body;

        // * validation
        if (password && password.length < 6) {
            return badRequest(res, { message: "Password must be at leat 6 characters" })
        }
        if (email && email.toLowerCase() !== email) {
            return badRequest(res, { message: "email must be in lowercase" })
        }

        // * if Admin
        if (reqId != userId) {;
            const result = await userServices.updateUserAdmin(name, email, password, phone, role, userId as string);
            // * Response
            const { password: pass, ...restData } = result.rows[0]
            return successPost(res, "User Updated successfully", { restData })
        }
        // * if user
        if (role) {
            return forbiddenError(res, { message: "Only Admin can update roles" })
        }
        const result = await userServices.updateUserOwn(name, email, password, phone, userId!);
        // * Response
        const { password: pass, ...restData } = result.rows[0]
        return successPost(res, "User Updated successfully", { restData })
    } catch (error: any) {
        return internelServerError(res, error)
    }
}

export const userControlers = {
    getAllUser,
    updateUser
}
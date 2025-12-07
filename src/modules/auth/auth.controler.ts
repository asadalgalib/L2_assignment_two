import { Request, Response } from "express";
import { badRequest, internelServerError } from "../../helper/handleError";
import { authServices } from "./auth.service";
import { successGPD, successPost } from "../../helper/handleOK";

const signUp = async (req: Request, res: Response) => {
    try {
        // * bussiness logic
        const result = await authServices.signUp(req.body, res);
        // * Send response
        const { password,...restData } = result;
        return successPost(res, "User registered successfully",  restData)
    } catch (error: any) {
        return internelServerError(res, error)
    }
}

const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        // * bussiness logic
        const result = await authServices.signIn(email, password);
        // * Send response
        if (!result) {
            badRequest(res, { message: "Invalid email or password" })
        }
        successGPD(res, "Login successful", result)
    } catch (error: any) {
        return internelServerError(res, error)
    }
}

export const authControlers = {
    signUp,
    signIn
}
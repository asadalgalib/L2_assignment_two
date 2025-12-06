import { Response } from "express";

export const successGPD = (res: Response, message: string, data: any) => {
    return res.status(200).json({
        success: true,
        message,
        data
    })
}
export const successPost = (res: Response, message: string, data: any) => {
    return res.status(201).json({
        success: true,
        message,
        data
    })
}
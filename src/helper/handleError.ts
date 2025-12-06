import { Response } from "express"

export const badRequest = (res: Response, error: any) => {
    return res.status(400).json({
        success: false,
        error: "invalid input",
        message: error.message
    })
}

export const unauthorizedError = (res: Response, error: any) => {
    return res.status(401).json({
        success: false,
        error: "Missing or invalid authentication token",
        message: error.message
    })
}
export const forbiddenError = (res: Response, error: any) => {
    return res.status(403).json({
        success: false,
        error: "Insufficient permissions",
        message: error.message
    })
}

export const notFound = (res: Response, error: any) => {
    return res.status(404).json({
        success: false,
        error: "Resource doesn't exist",
        message: error.message
    })
}

export const internelServerError = (res: Response, error: any) => {
    return res.status(500).json({
        success: false,
        error: "Unexpected server error",
        message: error.message
    })
}

import { NextFunction, Request, Response } from "express";
import { forbiddenError, internelServerError, unauthorizedError } from "../helper/handleError";
import jwt, { JwtPayload } from "jsonwebtoken";
import envSecret from "../config";

export const authorizeAdmin = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // * Got token
            const bearerToken = req.headers.authorization
            // * check if user has token
            if (!bearerToken) {
                return unauthorizedError(res, { message: "Token not found" })
            }
         
            const token = bearerToken.split(" ")[1];
            // * decode the token and set to custom type req.user
            const decoded = jwt.verify(token as string, envSecret.jwtSecret as string) as JwtPayload;
            req.user = decoded;
            // * check if "admin" role not matches with the user role
            if (req.user.role !== "admin") {
                return forbiddenError(res, { message: "You do not have permission" })
            }
            // * Goo Goo Goo
            next()
        } catch (error) {
            internelServerError(res, error);
        }
    }
}
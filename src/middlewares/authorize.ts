import { NextFunction, Request, Response } from "express";
import { forbiddenError, internelServerError, unauthorizedError } from "../helper/handleError";
import jwt, { JwtPayload } from "jsonwebtoken";
import envSecret from "../config";

export const authorize = (...roles: string[]) => {
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
            // * check if roles not matches with the user role
            if (roles.length && !roles.includes(req.user.role)) {
                return forbiddenError(res, { message: "You do not have permission" })
            }
            return next()
        } catch (error) {
            internelServerError(res, error);
        }
    }
}

export default authorize;
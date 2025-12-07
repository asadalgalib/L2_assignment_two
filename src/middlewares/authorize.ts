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
            if (decoded.role === "admin") {
                return next();
            }
            return forbiddenError(res, { message: "You do not have permission" })
            // * Goo Goo Goo

        } catch (error) {
            internelServerError(res, error);
        }
    }
}

export const authorizeUser = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // * Got token
            const bearerToken = req.headers.authorization
            // * check if user has token
            if (!bearerToken) {
                return unauthorizedError(res, { message: "Token not found" })
            }
            const token = bearerToken.split(" ")[1];
            console.log(token);
            // * decode the token and set to custom type req.user
            const decoded = jwt.verify(token as string, envSecret.jwtSecret as string) as JwtPayload;
            req.user = decoded;
            console.log(decoded);
            // * check if "admin" role not matches with the user role
            if (decoded.role === "admin" || decoded.role === "customer") {
                return next()
            }
            return forbiddenError(res, { message: "You do not have permission" })
        } catch (error) {
            internelServerError(res, error);
        }
    }
}

export const authorizeAdminOrOwn = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // * Got user id
            const { userId } = req.params;
            // * Got token
            const bearerToken = req.headers.authorization
            // * check if user has token
            if (!bearerToken) {
                return unauthorizedError(res, { message: "Token not found" })
            }
            // * decode the token and set to custom type req.user
            const token = bearerToken.split(" ")[1];
            const decoded = jwt.verify(token as string, envSecret.jwtSecret as string) as JwtPayload;
            req.user = decoded;
            // * If request id not matches with token id
            if (req.user.id == userId) {
                return next()
            }
            // * check if "admin" role not matches with the token role and 
            if (req.user.role == "admin") {
                return next()
            }
            return forbiddenError(res, { message: "You are not Admin or Owner" })

        } catch (error) {
            internelServerError(res, error);
        }
    }
}
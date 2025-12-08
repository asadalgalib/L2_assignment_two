"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const handleError_1 = require("../helper/handleError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const authorize = (...roles) => {
    return (req, res, next) => {
        try {
            // * Got token
            const bearerToken = req.headers.authorization;
            // * check if user has token
            if (!bearerToken) {
                return (0, handleError_1.unauthorizedError)(res, { message: "Token not found" });
            }
            const token = bearerToken.split(" ")[1];
            // * decode the token and set to custom type req.user
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
            req.user = decoded;
            // * check if roles not matches with the user role
            if (roles.length && !roles.includes(req.user.role)) {
                return (0, handleError_1.forbiddenError)(res, { message: "You do not have permission" });
            }
            return next();
        }
        catch (error) {
            (0, handleError_1.internelServerError)(res, error);
        }
    };
};
exports.authorize = authorize;
exports.default = exports.authorize;

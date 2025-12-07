"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internelServerError = exports.notFound = exports.forbiddenError = exports.unauthorizedError = exports.badRequest = void 0;
const badRequest = (res, error) => {
    return res.status(400).json({
        success: false,
        error: "invalid input",
        message: error.message
    });
};
exports.badRequest = badRequest;
const unauthorizedError = (res, error) => {
    return res.status(401).json({
        success: false,
        error: "Missing or invalid authentication token",
        message: error.message
    });
};
exports.unauthorizedError = unauthorizedError;
const forbiddenError = (res, error) => {
    return res.status(403).json({
        success: false,
        error: "Insufficient permissions",
        message: error.message
    });
};
exports.forbiddenError = forbiddenError;
const notFound = (res, error) => {
    return res.status(404).json({
        success: false,
        error: "Resource doesn't exist",
        message: error.message
    });
};
exports.notFound = notFound;
const internelServerError = (res, error) => {
    return res.status(500).json({
        success: false,
        error: "Unexpected server error",
        message: error.message
    });
};
exports.internelServerError = internelServerError;

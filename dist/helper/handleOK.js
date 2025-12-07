"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successPost = exports.successGPD = void 0;
const successGPD = (res, message, data) => {
    return res.status(200).json({
        success: true,
        message,
        data
    });
};
exports.successGPD = successGPD;
const successPost = (res, message, data) => {
    return res.status(201).json({
        success: true,
        message,
        data
    });
};
exports.successPost = successPost;

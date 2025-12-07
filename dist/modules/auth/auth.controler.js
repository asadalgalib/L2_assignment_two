"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControlers = void 0;
const handleError_1 = require("../../helper/handleError");
const auth_service_1 = require("./auth.service");
const handleOK_1 = require("../../helper/handleOK");
const signUp = async (req, res) => {
    try {
        // * bussiness logic
        const result = await auth_service_1.authServices.signUp(req.body, res);
        // * Send response
        const { password, ...restData } = result;
        return (0, handleOK_1.successPost)(res, "User registered successfully", { restData });
    }
    catch (error) {
        return (0, handleError_1.internelServerError)(res, error);
    }
};
const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        // * bussiness logic
        const result = await auth_service_1.authServices.signIn(email, password);
        // * Send response
        if (!result) {
            (0, handleError_1.badRequest)(res, { message: "Invalid email or password" });
        }
        (0, handleOK_1.successGPD)(res, "Login successful", result);
    }
    catch (error) {
        return (0, handleError_1.internelServerError)(res, error);
    }
};
exports.authControlers = {
    signUp,
    signIn
};

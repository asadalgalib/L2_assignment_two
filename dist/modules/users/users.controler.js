"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControlers = void 0;
const handleError_1 = require("../../helper/handleError");
const users_service_1 = require("./users.service");
const handleOK_1 = require("../../helper/handleOK");
const getAllUser = async (req, res) => {
    try {
        // * Bussiness logic
        const result = await users_service_1.userServices.getAllUser();
        // * Send response
        if (result.rows.length == 0) {
            return (0, handleError_1.internelServerError)(res, { message: "Something Went Wrong" });
        }
        return (0, handleOK_1.successGPD)(res, "Users retrieved successfully", result.rows);
    }
    catch (error) {
        return (0, handleError_1.internelServerError)(res, error);
    }
};
exports.userControlers = {
    getAllUser
};

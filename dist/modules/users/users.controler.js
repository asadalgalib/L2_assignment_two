"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControlers = void 0;
const handleError_1 = require("../../helper/handleError");
const users_service_1 = require("./users.service");
const handleOK_1 = require("../../helper/handleOK");
// * Get all user (Admin only)
const getAllUser = async (req, res) => {
    try {
        // * Bussiness logic
        const result = await users_service_1.userServices.getAllUser();
        // * Send response
        if (!result) {
            return (0, handleError_1.internelServerError)(res, { message: "Something Went Wrong" });
        }
        return (0, handleOK_1.successGPD)(res, "Users retrieved successfully", result.rows);
    }
    catch (error) {
        return (0, handleError_1.internelServerError)(res, error);
    }
};
// * Update user (Admin or own)
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const reqRole = req.user?.role;
        const reqId = req.user?.id;
        const { name, email, password, phone, role } = req.body;
        // * validation
        if (password && password.length < 6) {
            return (0, handleError_1.badRequest)(res, { message: "Password must be at leat 6 characters" });
        }
        if (email && email.toLowerCase() !== email) {
            return (0, handleError_1.badRequest)(res, { message: "email must be in lowercase" });
        }
        // * if user try to change role and he is not admin
        if (role && reqRole !== "admin") {
            return (0, handleError_1.forbiddenError)(res, { message: "Only admin can change roles" });
        }
        // * Bussiness Logic
        const result = await users_service_1.userServices.updateUser(name, email, password, phone, role, reqRole, reqId, userId);
        // * Response
        const { password: pass, ...restData } = result.rows[0];
        return (0, handleOK_1.successPost)(res, "User Updated successfully", restData);
    }
    catch (error) {
        return (0, handleError_1.internelServerError)(res, error);
    }
};
// * Delete user (Admin)
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await users_service_1.userServices.deleteUser(userId);
        if (!result) {
            return (0, handleError_1.notFound)(res, { message: "User booked a Vehicles" });
        }
        if (result.rowCount === 0) {
            console.log("row");
            return (0, handleError_1.notFound)(res, { message: "User not found" });
        }
        return (0, handleOK_1.successGPD)(res, "User deleted successfully", []);
    }
    catch (error) {
        return (0, handleError_1.internelServerError)(res, error);
    }
};
exports.userControlers = {
    getAllUser,
    updateUser,
    deleteUser
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const database_1 = require("../../database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// * Get all user (Admin only)
const getAllUser = async () => {
    const result = await database_1.pool.query(`
        SELECT id, name, email, phone, role FROM users
        `);
    return result;
};
// * Update user (Admin or Own)
const updateUser = async (name, email, password, phone, role, reqRole, reqId, userId) => {
    // * hashing password
    let hashedPass;
    if (password) {
        hashedPass = await bcryptjs_1.default.hash(password, 10);
    }
    const result = await database_1.pool.query(`
            UPDATE users
            SET 
            name = COALESCE($1, name),
            email = COALESCE($2, email),
            password = COALESCE($3, password),
            phone = COALESCE($4, phone),
            role = CASE 
                WHEN $6 = 'admin' THEN COALESCE($5, role) 
                    ELSE role 
                END
            WHERE id=$7 
            RETURNING *`, [name, email, hashedPass ?? password, phone, role, reqRole, reqRole === "admin" ? userId : reqId]);
    return result;
};
const deleteUser = async (id) => {
    const isBooked = await database_1.pool.query(`
        SELECT * FROM bookings
        WHERE customer_id=$1;`, [id]);
    if (isBooked.rows[0] && isBooked.rows[0].status === "active") {
        return false;
    }
    const result = await database_1.pool.query(`
        DELETE FROM users 
            WHERE id =$1`, [id]);
    return result;
};
exports.userServices = {
    getAllUser,
    updateUser,
    deleteUser
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const database_1 = require("../../database");
const getAllUser = async () => {
    const result = await database_1.pool.query(`
        SELECT id, name, email, role, phone FROM users
        `);
    return result;
};
exports.userServices = {
    getAllUser
};

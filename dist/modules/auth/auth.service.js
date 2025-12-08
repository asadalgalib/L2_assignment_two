"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const database_1 = require("../../database");
const handleError_1 = require("../../helper/handleError");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const signUp = async (payload, res) => {
    const { name, email, password, phone, role } = payload;
    // * validation
    if (password.length < 6) {
        return (0, handleError_1.badRequest)(res, { message: "Password must be at leat 6 characters" });
    }
    if (email.toLowerCase() !== email) {
        return (0, handleError_1.badRequest)(res, { message: "email must be in lowercase" });
    }
    // * hashing password
    const hashedPass = await bcryptjs_1.default.hash(password, 10);
    // * bussiness logic
    const result = await database_1.pool.query(`
        INSERT INTO users(name,email,password,phone,role)
        VALUES($1,LOWER($2),$3,$4, COALESCE($5,'customer'))
        RETURNING *;`, [name, email, hashedPass, phone, role]);
    // * send result
    return result.rows[0];
};
const signIn = async (email, password) => {
    // * Search User
    const result = await database_1.pool.query(`
        SELECT * FROM users
        WHERE email=$1;`, [email]);
    const user = result.rows[0];
    // * match hashed password to given password
    const matched = bcryptjs_1.default.compare(password, user.password);
    if (!matched) {
        return false;
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id, name: user.name, role: user.role, email: user.email
    }, config_1.default.jwtSecret, {
        expiresIn: "10d"
    });
    const { password: pass, ...restUser } = user;
    return { token: token, user: restUser };
};
exports.authServices = {
    signUp,
    signIn
};

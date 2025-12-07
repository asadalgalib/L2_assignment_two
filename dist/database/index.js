"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const config_1 = __importDefault(require("../config"));
exports.pool = new pg_1.Pool({
    connectionString: `${config_1.default.connectionString}`
});
const initDb = async () => {
    await exports.pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(50) DEFAULT 'customer' CHECK (role IN ('customer', 'admin'))
        );`);
    await exports.pool.query(` 
        CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(150) NOT NULL,
        type TEXT NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(150) UNIQUE NOT NULL,
        daily_rent_price NUMERIC NOT NULL CHECK (daily_rent_price > 0),
        availability_status VARCHAR(50) DEFAULT 'available' CHECK (availability_status IN ('available', 'booked'))
        );`);
};
exports.default = initDb;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesServices = void 0;
const database_1 = require("../../database");
// * Create Vehicles
const createVehicles = async (payload) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    // * Insert data
    const result = await database_1.pool.query(`
        INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status)
        VALUES($1,COALESCE($2,'car'),$3,$4, COALESCE($5,'available')) 
        RETURNING *;`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);
    // * return result
    return result.rows[0];
};
// * Get all vehicles
const getVehicles = async () => {
    // * search vehicle 
    const result = await database_1.pool.query(`
        SELECT * FROM vehicles
        `);
    // * return result
    return result.rows;
};
// * Get single Vehicles
const getSingleVehicles = async (id) => {
    // * search vehicle 
    const result = await database_1.pool.query(`
        SELECT * FROM vehicles
        WHERE id=$1;`, [id]);
    // * return result
    return result.rows[0];
};
// * Update Vehicles
const updateVehicles = async (payload, id) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    // * Update Data
    const result = await database_1.pool.query(`
            UPDATE vehicles
            SET 
            vehicle_name = COALESCE($1, vehicle_name),
            type = COALESCE($2, type),
            registration_number = COALESCE($3, registration_number),
            daily_rent_price = COALESCE($4, daily_rent_price),
            availability_status = COALESCE($5, availability_status) 
            WHERE id=$6 
            RETURNING *;`, [vehicle_name, type, registration_number, daily_rent_price, availability_status, id]);
    return result.rows[0];
};
// * Delete vehicles (if not booked)
const deleteVehicles = async (id) => {
    // * Check availability
    const vehicles = await database_1.pool.query(`
        SELECT * FROM vehicles
        WHERE id=$1;`, [id]);
    // * If not available return false
    if (vehicles.rows[0].availability_status !== "available") {
        return false;
    }
    // * If available delete vehicles
    const result = await database_1.pool.query(`
            DELETE FROM vehicles 
            WHERE id =$1`, [id]);
    return result.rowCount;
};
exports.vehiclesServices = {
    createVehicles,
    getVehicles,
    getSingleVehicles,
    updateVehicles,
    deleteVehicles
};

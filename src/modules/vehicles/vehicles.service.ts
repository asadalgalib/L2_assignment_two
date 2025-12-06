import { pool } from "../../database";

const createVehicles = async (payload: Record<string, unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;

    const result = await pool.query(`
        INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status)
        VALUES($1,COALESCE($2,'car'),$3,$4, COALESCE($5,'available')) 
        RETURNING *;`,
        [vehicle_name, type, registration_number, daily_rent_price, availability_status]
    )
    return result.rows[0]
}

export const vehiclesServices = {
    createVehicles
}
import { pool } from "../../database";


const createBooking = async (payload: Record<string, any>) => {

    const { customer_id, vehicle_id, rent_start_date, rent_end_date, status } = payload;
    // * Search vehicle
    const vehicle = await pool.query(`
        SELECT vehicle_name,daily_rent_price FROM vehicleS
        WHERE id=$1;`,
        [vehicle_id]
    );
    // * calculation of total price
    const startDate = rent_start_date.split("-")[2];
    const endDate = rent_end_date.split("-")[2];
    const totalDay = (Number(endDate) - Number(startDate));
    const total_price = (Number(vehicle.rows[0].daily_rent_price) * totalDay);
    // * Insert Data 
    const result = await pool.query(`
        INSERT INTO bookings(customer_id, vehicle_id, rent_start_date ,rent_end_date ,total_price ,status)
        VALUES($1, $2, $3, $4, $5, COALESCE($6,'active'))
        RETURNING *;`,
        [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status]
    )
    
    return { ...result.rows[0], vehicle: vehicle.rows[0] }
}

export const bookingService = {
    createBooking
}
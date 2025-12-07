import { pool } from "../../database";
import { Response } from "express";
import { badRequest } from "../../helper/handleError";

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
    // * Update vehicles
    const availability_status = "booked"
    if (result.rows[0]) {
        const vehicleStatus = await pool.query(`
            UPDATE vehicles
            SET availability_status = $1 
            WHERE id=$2
            RETURNING *;`,
            [availability_status, vehicle_id]
        );
    }

    return { ...result.rows[0], vehicle: vehicle.rows[0] }
}

const getAllBooking = async (reqRole: string, reqId: number) => {

    const booking = await pool.query(`
        SELECT * FROM bookings
        WHERE ($1 = 'admin') OR (customer_id=$2);`,
        [reqRole, reqId]
    )
    const bookingResult = booking.rows;

    const allBooking = await Promise.all(bookingResult.map(async (booking) => {

        const customer = await pool.query(`
            SELECT name, email FROM users
            WHERE id=$1;`,
            [booking.customer_id]
        );
        const vehicle = await pool.query(`
            SELECT vehicle_name, registration_number FROM vehicles
            WHERE id=$1;`,
            [booking.vehicle_id]
        )
        return { ...booking, customer: customer.rows[0], vehicle: vehicle.rows[0] }
    })
    )
    return allBooking;
}

const updateBooking = async (res: Response, status: string, reqRole: string, bookingId: string) => {
    // * Searching booking
    const bookingResult = await pool.query(`
        SELECT * FROM bookings
        WHERE id=$1;`, [bookingId]
    )
    const now = new Date();
    const bookingData = bookingResult.rows[0]
    // * Validations
    if (reqRole === 'customer' && bookingData.rent_start_date < now) {
        return badRequest(res, { message: "You can cancel only before start date" })
    }
    // * Update
    const bookingUpdate = await pool.query(`
        UPDATE bookings
        SET 
        status = 
        CASE 
        WHEN $1 = 'customer' THEN 'cancelled' 
        ELSE  'returned'
        END
        WHERE id=$2 ;`,
        [reqRole, bookingId]
    );
    const vehicleUpdate = await pool.query(`
        UPDATE vehicles
        SET
        availability_status = 'available'
        WHERE id=$1
        RETURNING *;`,
        [bookingData.vehicle_id]
    );
    // * system 
    const allStatusUpdate = await pool.query(`
        UPDATE bookings
        SET 
        status = 'returned'
        WHERE NOW() > rent_end_date
        `);
    const result = await pool.query(`
        SELECT * FROM bookings
        WHERE id=$1;`, [bookingId]
    )
    return result.rows[0]
}

export const bookingService = {
    createBooking,
    getAllBooking,
    updateBooking
}
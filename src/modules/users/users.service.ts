import { pool } from "../../database"

const getAllUser = async () => {
    const result = await pool.query(`
        SELECT id, name, email, role, phone FROM users
        `)
    return result
}

export const userServices = {
    getAllUser
}
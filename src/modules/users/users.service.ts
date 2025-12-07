import { pool } from "../../database"
import bcrypt from "bcryptjs";

// * Get all user (Admin only)
const getAllUser = async () => {
    const result = await pool.query(`
        SELECT id, name, email, phone, role FROM users
        `)
    return result
}
// * Update user (Admin or Own)
const updateUser = async (name: string, email: string, password: string, phone: string, role: string, reqRole: string, userId: string) => {
    // * hashing password
    let hashedPass;
    if (password) {
        hashedPass = await bcrypt.hash(password, 10);
    }
    const result = await pool.query(`
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
            RETURNING *`,
        [name, email, hashedPass ?? password, phone, role, reqRole, userId]
    );

    return result;
}

export const userServices = {
    getAllUser,
    updateUser
}
import { pool } from "../../database"
import bcrypt from "bcryptjs";

// * Get all user (Admin only)
const getAllUser = async () => {
    const result = await pool.query(`
        SELECT id, name, email, phone, role FROM users
        `)
    return result
}
// * Update user (Admin)
const updateUserAdmin = async (name: string, email: string, password: string, phone: string, role: string, userId: string) => {
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
            role = COALESCE($5, role) 
            WHERE id=$6 
            RETURNING *`,
        [name, email, hashedPass ?? password, phone, role, userId]
    );
    
    return result;
}
// * Update user (Own)
const updateUserOwn = async (name: string, email: string, password: string, phone: string, userId: string) => {
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
            phone = COALESCE($4, phone)
            WHERE id=$5
            RETURNING *`,
        [name, email, hashedPass ?? password, phone, userId]
    );
    
    return result;
}

export const userServices = {
    getAllUser,
    updateUserAdmin,
    updateUserOwn
}
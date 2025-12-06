import { Response } from "express";
import { pool } from "../../database";
import { badRequest } from "../../helper/handleError";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import envSecret from "../../config";

const signUp = async (payload: Record<string, any>, res: Response) => {
    const { name, email, password, phone, role } = payload

    // * validation
    if (password.length < 6) {
        return badRequest(res, { message: "Password must be at leat 6 characters" })
    }
    if (email.toLowerCase() !== email) {
        return badRequest(res, { message: "email must be in lowercase" })
    }
    // * hashing password
    const hashedPass = await bcrypt.hash(password, 10);
    // * bussiness logic
    const result = await pool.query(`
        INSERT INTO users(name,email,password,phone,role)
        VALUES($1,LOWER($2),$3,$4, COALESCE($5,'customer'))
        RETURNING *;`,
        [name, email, hashedPass, phone, role]
    )
    // * send result
    return result.rows[0];
}

const signIn = async (email: string, password: string) => {
    
    // * Search User
    const result = await pool.query(`
        SELECT * FROM users
        WHERE email=$1;`,
        [email]
    )
    const user = result.rows[0];
    // * match hashed password to given password
    const matched = bcrypt.compare(password, user.password)
    if (!matched) {
        return false
    }

    const token = jwt.sign({
       name: user.name, role: user.role, email: user.email
    },
        envSecret.jwtSecret as string, {
        expiresIn: "10d"
    })
    const {password : pass,...restUser} = user
    return {token: token, user : restUser};
}

export const authServices = {
    signUp,
    signIn
}
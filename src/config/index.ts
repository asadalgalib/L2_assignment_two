import dotenv from 'dotenv';
import path from 'path'

dotenv.config({
    path: path.join(process.cwd(), ".env")
});

const envSecret = {
    port: Number(process.env.PORT),
    connectionString : process.env.CONNECTION_STR,
    jwtSecret : process.env.JWT_SECRET
}

export default envSecret;
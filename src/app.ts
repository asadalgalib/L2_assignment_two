import express, { Request, Response } from "express";
import initDb from "./database";
import { authRoutes } from "./modules/auth/auth.route";
import { userRoutes } from "./modules/users/users.route";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.route";
import './types/express/index.d.ts';


const app = express();
app.use(express.json())

initDb();

app.get("/", (req: Request, res: Response) => {
    res.send("Created App Successfully");
})

// * Auth Routes
app.use("/api/v1/auth", authRoutes)

// * Users Routes
app.use('/api/v1/users', userRoutes);

// * Vehicles Routes
app.use("/api/v1/vehicles", vehiclesRoutes)

export default app;
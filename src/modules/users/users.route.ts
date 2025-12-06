import { Router } from "express";
import { userControlers } from "./users.controler";
import { authorizeAdmin } from "../../middlewares/authorize";

const router = Router();

// * Post user Route (Admin only)
router.get("/", authorizeAdmin(), userControlers.getAllUser);

export const userRoutes = router;
import { Router } from "express";
import { userControlers } from "./users.controler";
import { authorizeAdmin, authorizeAdminOrOwn } from "../../middlewares/authorize";

const router = Router();

// * Post user Route (Admin only)
router.get("/", authorizeAdmin(), userControlers.getAllUser);

// * Update user Route (Admin or own)
router.put("/:userId", authorizeAdminOrOwn(), userControlers.updateUser);

export const userRoutes = router;
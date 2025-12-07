import { Router } from "express";
import { userControlers } from "./users.controler";
import authorize from "../../middlewares/authorize";

const router = Router();

// * Post user Route (Admin only)
router.get("/", authorize("admin"), userControlers.getAllUser);

// * Update user Route (Admin or own)
router.put("/:userId",authorize("admin","customer"), userControlers.updateUser);

// * Delete user Route

export const userRoutes = router;
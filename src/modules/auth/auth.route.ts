import { Router } from "express";
import { authControlers } from "./auth.controler";

const router = Router();
// * Signup Route
router.post("/signup", authControlers.signUp);
// * Signin Route
router.post("/signin",authControlers.signIn);

export const authRoutes = router;
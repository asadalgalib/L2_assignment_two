"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controler_1 = require("./auth.controler");
const router = (0, express_1.Router)();
// * Signup Route
router.post("/signup", auth_controler_1.authControlers.signUp);
// * Signin Route
router.post("/signin", auth_controler_1.authControlers.signIn);
exports.authRoutes = router;

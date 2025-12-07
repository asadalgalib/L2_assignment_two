"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const users_controler_1 = require("./users.controler");
const authorize_1 = require("../../middlewares/authorize");
const router = (0, express_1.Router)();
// * Post user Route (Admin only)
router.get("/", (0, authorize_1.authorizeAdmin)(), users_controler_1.userControlers.getAllUser);
exports.userRoutes = router;

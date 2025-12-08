"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const users_controler_1 = require("./users.controler");
const authorize_1 = __importDefault(require("../../middlewares/authorize"));
const router = (0, express_1.Router)();
// * Post user Route (Admin only)
router.get("/", (0, authorize_1.default)("admin"), users_controler_1.userControlers.getAllUser);
// * Update user Route (Admin or own)
router.put("/:userId", (0, authorize_1.default)("admin", "customer"), users_controler_1.userControlers.updateUser);
// * Delete user Route
router.delete("/:userId", (0, authorize_1.default)("admin"), users_controler_1.userControlers.deleteUser);
exports.userRoutes = router;

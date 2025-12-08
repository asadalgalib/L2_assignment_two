"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const auth_route_1 = require("./modules/auth/auth.route");
const users_route_1 = require("./modules/users/users.route");
const vehicles_route_1 = require("./modules/vehicles/vehicles.route");
const booking_route_1 = require("./modules/bookings/booking.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, database_1.default)();
app.get("/", (req, res) => {
    res.send("Created App Successfully");
});
// * Auth Routes
app.use("/api/v1/auth", auth_route_1.authRoutes);
// * Users Routes
app.use('/api/v1/users', users_route_1.userRoutes);
// * Vehicles Routes
app.use("/api/v1/vehicles", vehicles_route_1.vehiclesRoutes);
// * Booking Routes
app.use("/api/v1/bookings", booking_route_1.bookingRoutes);
exports.default = app;

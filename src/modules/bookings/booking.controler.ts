import { Request, Response } from "express"
import { successGPD, successPost } from "../../helper/handleOK";
import { badRequest, internelServerError } from "../../helper/handleError";
import { bookingService } from "./booking.service";

// * Create Booking (Admin or User)
const createBooking = async (req: Request, res: Response) => {
    try {
        if (!req.body.customer_id) {
            badRequest(res, { message: "Customer id cannot be null" })
        }
        const result = await bookingService.createBooking(req.body)
        return successPost(res, "Booking created successfully", result)
    } catch (error: any) {
        return internelServerError(res, error);
    }
}

const getAllBooking = async (req: Request, res: Response) => {
    try {
        const reqRole = req.user?.role;
        const reqId = req.user?.id;

        const result = await bookingService.getAllBooking(reqRole, reqId)
        return successGPD(res, "Booking retrieved  successfully", result)
    } catch (error: any) {
        return internelServerError(res, error);
    }
}

const updateBooking = async () => {

}
const deleteBooking = async () => {

}

export const bookingControlers = {
    createBooking,
    getAllBooking
}
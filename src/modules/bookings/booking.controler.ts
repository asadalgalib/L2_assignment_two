import { Request, Response } from "express"
import { successPost } from "../../helper/handleOK";
import { internelServerError } from "../../helper/handleError";
import { bookingService } from "./booking.service";

// * Create Booking (Admin or User)
const createBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.createBooking(req.body)
        return successPost(res, "Booking created successfully", result)
    } catch (error: any) {
        return internelServerError(res, error);
    }
}

const updateBooking = async () => {

}
const deleteBooking = async () => {

}

export const bookingControlers = {
    createBooking
}
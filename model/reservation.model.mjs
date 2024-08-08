import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    seats: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    special_request: {
        type: String,
        required: true,
    },
    cancelled: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const resrvationModel = mongoose.model("Reservation_Resturant", reservationSchema)

export default resrvationModel
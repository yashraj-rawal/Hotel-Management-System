import mongoose, { Schema, models, model } from "mongoose";

const BookingSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },

    checkInDate: {
        type: Date,
        required: true
    },

    checkOutDate: {
        type: Date,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled", "CheckedIn", "CheckedOut"],
        default: "Pending"
    },

    paymentStatus: {
        type: String,
        enum: ["Unpaid", "Paid"],
        default: "Unpaid"
    }

}, {timestamps: true})

const Booking = models.Booking || model("Booking", BookingSchema)

export default Booking
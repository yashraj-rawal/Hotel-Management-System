import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Booking from "@/models/Booking";
import Room from "@/models/Room";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if(!session || !session.user)
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        await dbConnect()
        const {roomId, checkInDate, checkOutDate, totalAmount } = await req.json()

        // prevent overlapping of booking
        const overLappingBooking = await Booking.findOne({
            room: roomId,
            status: {$ne: "Cancelled"},
            $and: [
                {checkInDate: {$lt: new Date(checkOutDate)}},
                {checkOutDate: {$gt: new Date(checkInDate)}}
            ]
        })

        if(overLappingBooking){
            return NextResponse.json({error: "Room is already booked for these dates"}, {status: 400})
        }

        // create Booking

        await Booking.create({
            user: session.user.id,
            room: roomId,
            checkInDate: new Date(checkInDate),
            checkOutDate: new Date(checkOutDate),
            totalAmount,
            status: "Confirmed",
            paymentStatus: "Unpaid"

        })

        return NextResponse.json({message: "New Booking"}, {status: 201})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
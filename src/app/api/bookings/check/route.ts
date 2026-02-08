import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";

export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url)
        const roomId = searchParams.get("roomId")
        const checkInDate = searchParams.get("checkInDate")
        const checkOutDate = searchParams.get("checkOutDate")

        if(!roomId && !checkInDate && !checkOutDate){
            return NextResponse.json({error: "Missing Parameters"}, {status: 403})
        }

        const checkIn = new Date(checkInDate!);
        const checkOut = new Date(checkOutDate!);


        await dbConnect()

        const overLappingBooking = await Booking.findOne({
            room: roomId,
            status: {$ne: "Cancelled"},
            $and: [
                {checkInDate: {$lt: new Date(checkOut)}},
                {checkOutDate: {$lt: new Date(checkIn)}},
            ]
        })

        if(overLappingBooking){
            return NextResponse.json({available: false, message: "Room is occupied"})
        }

        return NextResponse.json({available: true, message: "Room is available"})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 504})
    }
}
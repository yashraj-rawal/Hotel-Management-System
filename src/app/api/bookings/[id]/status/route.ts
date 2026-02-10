import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import Room from "@/models/Room"; // Must import to register the model for populate

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;

    // 1. First, check if this ID belongs to a Room
    const room = await Room.findById(id);

    if (room) {
      // If it's a room, we also want to see if there's an active booking for it
      const activeBooking = await Booking.findOne({ 
        room: id, 
        status: { $in: ["Confirmed", "CheckedIn"] } 
      }).select('status _id');

      return NextResponse.json({
        ...room.toObject(),
        bookingStatus: activeBooking ? activeBooking.status : "None",
        activeBookingId: activeBooking ? activeBooking._id : null
      });
    }

    // 2. Fallback: Check if the ID belongs to a Booking (just in case)
    const booking = await Booking.findById(id).populate("room");
    if (booking) {
      return NextResponse.json({
        ...booking.room.toObject(),
        bookingStatus: booking.status,
        bookingId: booking._id
      });
    }

    return NextResponse.json({ error: "No data found for this ID" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Keep your status update logic in a PATCH function
export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const { status } = await request.json(); // Valid in PATCH

    const updatedBooking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    
    if (!updatedBooking) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Update Room availability based on status
    if (status === "CheckedIn") {
      await Room.findByIdAndUpdate(updatedBooking.room, { isAvailable: false });
    } else if (status === "CheckedOut") {
      await Room.findByIdAndUpdate(updatedBooking.room, { isAvailable: true, housekeepingStatus: "Dirty" });
    }

    return NextResponse.json(updatedBooking);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
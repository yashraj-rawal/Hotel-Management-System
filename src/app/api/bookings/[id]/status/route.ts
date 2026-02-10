import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import Room from "@/models/Room";

export async function PATCH(request: NextRequest, context: { params : Promise< { id: string }> }) {
  try {
    await dbConnect();
    const { status } = await request.json();
     const { id } = await context.params;

    // BUG FIX: Added 'await' here. 
    // Without it, updatedBooking is a Query object, not the result.
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // 2. LOGIC: If status is 'CheckedOut', update the Room status
    if (status === "CheckedOut") {
      await Room.findByIdAndUpdate(updatedBooking.room, {
        housekeepingStatus: "Dirty",
        isAvailable: true, 
      });
    }

    // 3. LOGIC: If status is 'CheckedIn', mark room as occupied
    if (status === "CheckedIn") {
      await Room.findByIdAndUpdate(updatedBooking.room, {
        isAvailable: false,
      });
    }

    return NextResponse.json(updatedBooking);
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
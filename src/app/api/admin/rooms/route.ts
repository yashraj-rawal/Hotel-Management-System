import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Room from "@/models/Room";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    // Check if room number already exists
    const existingRoom = await Room.findOne({ roomNumber: data.roomNumber });
    if (existingRoom) {
      return NextResponse.json({ error: "Room number already exists" }, { status: 400 });
    }

    const newRoom = await Room.create(data);
    return NextResponse.json(newRoom, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
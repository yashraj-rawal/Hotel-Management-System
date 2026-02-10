import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Room from "@/models/Room";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    // 1. Validation: Check if room number already exists
    const existingRoom = await Room.findOne({ roomNumber: data.roomNumber });
    if (existingRoom) {
      return NextResponse.json({ error: "Room number already exists" }, { status: 400 });
    }

    // 2. Data Transformation
    // We transform the flat form data into the structure the Mongoose model expects
    const roomToCreate = {
      ...data,
      pricePerNight: Number(data.pricePerNight), // Ensure it's a number
      images: data.imageUrl ? [data.imageUrl] : [], // Convert single string to Array
    };

    const newRoom = await Room.create(roomToCreate);
    return NextResponse.json(newRoom, { status: 201 });
    
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
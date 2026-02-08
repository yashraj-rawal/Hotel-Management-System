import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST (request: NextRequest) {
    try {
        await dbConnect()
        const { name, email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user"
        })

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
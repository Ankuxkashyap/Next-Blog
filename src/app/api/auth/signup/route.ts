import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
  const { email, password, username } = await req.json();
  connectToDatabase();
  try {
    if (!email || !password || !username) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const existingUser = await User.find({ email });
    if (existingUser.length) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, password:hashedPassword, username });
    await user.save();
    
    const response =  NextResponse.json(
      { message: "User created successfully",  },
      { status: 201 }
    );
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY || "your_jwt_secret_key",
      { expiresIn: "1d" } 
    )

    response.cookies.set(
        "token",
        token,
        { httpOnly: true, maxAge: 24 * 60 * 60 }
    );
    
    return response;
  } catch (error) {
    console.error("Error during user signup:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export function GET(res: Response) {
  return NextResponse.json({ message: "Hello from signup GET" });
}

import { NextRequest, NextResponse } from "next/server";
("next/server");
import User from "@/models/User.model";
import { connectToDatabase } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export  async function POST(req: Request) {
  const { email, password } = await req.json();
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY || "your_jwt_secret_key",
      { expiresIn: "1d" }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    });
    return response;
  } catch (error) {
    console.error("Error during user signup:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export  function GET(res:Request){
    return NextResponse.json({ message: "Hello from login GET" });
}
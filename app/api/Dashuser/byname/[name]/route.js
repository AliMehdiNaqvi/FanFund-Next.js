import connectDB from "@/db/connectDB";
import Dashuser from "@/models/Dashuser";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { name } = params;

  try {
    await connectDB();

    const regex = new RegExp(`^${name}`, 'i'); // case-insensitive match
    const user = await Dashuser.findOne({ userEmail: { $regex: regex } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

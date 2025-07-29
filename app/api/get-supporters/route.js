import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Payment from "@/models/Payment";
export async function GET() {
    try {
    await connectDB();
    const supporters = await Payment.find().sort({ createdAt: -1 }).limit(10);
    return NextResponse.json(supporters);
  }catch (error) {
    console.error("Error fetching supporters:", error);
    return NextResponse.json({ error: 'Failed to fetch supporters' }, { status: 500 });
  }
}

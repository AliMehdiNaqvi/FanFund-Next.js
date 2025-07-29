import { NextResponse } from 'next/server';
import connectDB from '@/db/connectDB';
import Dashuser from '@/models/Dashuser';
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { userEmail,username, Profession, profilePic, coverPic, StripeKey, StripeSecret } = body;

    const existing = await Dashuser.findOne({ userEmail });

    if (existing) {
      // Update existing user
      await Dashuser.updateOne(
        { userEmail },
        { username,Profession, profilePic, coverPic, StripeKey, StripeSecret }
      );
    } else {
      // Create new user
      await Dashuser.create({ userEmail,username, Profession, profilePic, coverPic, StripeKey, StripeSecret });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving fan user data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

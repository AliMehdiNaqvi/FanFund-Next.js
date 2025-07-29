import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import connectDB from '@/db/connectDB'
import Payment from '@/models/Payment'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {

  try {
    //step-1 connect mongoDB
    await connectDB();
    //step-2 get datails from frentend
    const { amount, description, name, to_user, message } = await req.json()  // ✅ await is required

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: description },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    })
    //new payment creation after session
    const newPayment = new Payment({
      name: name,
      to_user: to_user,         // receiver
      message: description || '',   // optional message
      amount: amount,           // amount in cents
      oid: session.id,          // Stripe session ID
      done: false               // default false, mark true after webhook (optional)


    })
    await newPayment.save();    // Save payment in DB

    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    console.error('Stripe Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

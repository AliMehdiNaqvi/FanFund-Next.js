"use client"
import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function CheckoutForm() {
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        setLoading(true)
        const res = await fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: 500, // in cents (e.g. $5.00 = 500)
                description: "Support for Creator"
            })
        })
        const data = await res.json()
        const stripe = await stripePromise

        const result = await stripe.redirectToCheckout({
            sessionId: data.sessionId,
        })
        if (result.error) {
            console.error(result.error.message)
        }

        setLoading(false)
    }
    return (
        <button onClick={handleClick} disabled={loading} className="bg-purple-600 text-white px-4 py-2 rounded">
            {loading ? "Processing..." : "Support Now"}
        </button>
    )

}



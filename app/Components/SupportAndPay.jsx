'use client';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from "next-auth/react"
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY); // add this key in .env.local

export default function SupportAndPay() {
  const { data: session } = useSession()

  const [amount, setAmount] = useState('');
  const [message, setmessage] = useState('');
  const [name, setname] = useState('')
  const [supporters, setsupporters] = useState([])

  const [loading, setLoading] = useState(false);
  //dynamic fetching of supporters
  useEffect(() => {
    const fetchSupporters = async () => {
      try {
        const res = await fetch('/api/get-supporters')
        const data = await res.json()
        setsupporters(data)


      } catch (err) {
        console.error("Error fetching supporters:", err);
      }
    }
    fetchSupporters();
  }, [])


  const presetAmounts = [10, 30, 50, 100];

  const handlePay = async () => {
    if (!amount || parseInt(amount) < 1) return alert("Please enter a valid amount.");
    setLoading(true);

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseInt(amount) * 100, // Stripe works in cents
          description: message,
          name: name, // Replace this with a dynamic user name if available
          to_user: `${session.user.name}` // Replace with actual creator / receiver
        })
      });

      const checkoutSession = await res.json();
      if (!res.ok) throw new Error(checkoutSession.error || "Payment initiation failed");

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSession.sessionId,
      });

      if (error) console.error("Stripe redirect error:", error);
    } catch (err) {
      console.error(err.message);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-6">
      {/* Supporters Container */}
      <div className="w-full md:w-1/2 bg-white rounded-xl shadow p-5 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">🎉 Recent Supporters</h2>
        <div className="space-y-4">
          {supporters.map((s, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-lg p-3 shadow-sm bg-gray-50"
            >
              <p className="text-sm font-semibold text-gray-700">{s.name}</p>
              <p className="text-sm text-green-600 font-bold">{s.amount} Rs.</p>
              <p className="text-xs text-gray-500 italic">"{s.message}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Container */}
      <div className="w-full md:w-1/2 bg-white rounded-xl shadow p-5 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">💖 Support this Creator</h2>

        {/* Preset Buttons */}
        <div className="flex gap-3 mb-4">
          {presetAmounts.map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt.toString())}
              className={`px-4 py-2 rounded-lg border ${amount === amt.toString()
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
                }`}
            >
              ${amt}
            </button>
          ))}
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Pay Button */}
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Pay ${amount || '...'}
        </button>
      </div>
    </div>
  );
}

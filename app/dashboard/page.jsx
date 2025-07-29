"use client"
import React from 'react'
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
const dashboard = () => {

  const { data: session } = useSession()
  const router = useRouter()
  useEffect(() => {

    if (!session) {

      router.push('/login')
    }


  }, [session, router])

  const [form, setForm] = useState({

    email: '',
    // username: '',
    Profession: '',
    profilePic: '',
    coverPic: '',
    StripeKey: '',
    StripeSecret: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!session?.user?.email) return alert("User not logged in");
    const dataToSend = {
      userEmail: session.user.email,
      ...form,
    };
    try {
      const res = await fetch("/api/Dashuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();
      if (data.success) {
        alert("Dashboard data saved successfully!");
      } else {
        alert("Error saving data");
      }
    } catch (err) {
      console.error("Save failed:", err);
      alert("Something went wrong!");
    }

    ;
  };

  return (

    <motion.div

      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">🧾 Creator Dashboard</h1>

        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 space-y-5">
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Public username"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              name="Profession"
              value={form.Profession}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>


          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          {/* Username */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          {/* Profile Pic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
            <input
              type="text"
              name="profilePic"
              value={form.profilePic}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Cover Pic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Picture URL</label>
            <input
              type="text"
              name="coverPic"
              value={form.coverPic}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Stripe Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stripe Key</label>
            <input
              type="text"
              name="StripeKey"
              value={form.StripeKey}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Stripe Secret */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stripe Secret</label>
            <input
              type="password"
              name="StripeSecret"
              value={form.StripeSecret}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-pink-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </motion.div>

  )
}

export default dashboard
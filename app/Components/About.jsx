"use client";
import { motion } from "framer-motion";
import { FaSmile, FaHandsHelping, FaStar } from "react-icons/fa";

export default function AboutSection() {
  return (
    <section className="bg-gradient-to-b from-white to-pink-50 py-20 px-6 md:px-24 text-center">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-pink-600 mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Why FanFund is Different 💖
      </motion.h2>

      <motion.p
        className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        FanFund isn’t just a platform — it's a celebration of dreams, emotions, and pure connection. We believe in empowering creators not just with funds, but with love. Every contribution is a digital hug, every project a heartbeat. Welcome to a world where kindness and creativity meet.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <FaSmile className="text-5xl text-pink-400 mb-4" />
          <h3 className="text-xl font-semibold text-pink-700">Joyful Giving</h3>
          <p className="text-gray-600 mt-2 text-sm">Support isn’t transactional here. It’s personal, kind, and joyful.</p>
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <FaHandsHelping className="text-5xl text-pink-400 mb-4" />
          <h3 className="text-xl font-semibold text-pink-700">Built on Bonds</h3>
          <p className="text-gray-600 mt-2 text-sm">Creators and fans aren't separate — they grow, thrive, and dream together.</p>
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <FaStar className="text-5xl text-pink-400 mb-4" />
          <h3 className="text-xl font-semibold text-pink-700">Celebrate Uniqueness</h3>
          <p className="text-gray-600 mt-2 text-sm">Every creator is a star, and FanFund is their sky. Shine in your own way.</p>
        </motion.div>
      </div>
    </section>
  );
}
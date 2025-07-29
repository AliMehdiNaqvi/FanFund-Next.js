"use client";
import { motion } from "framer-motion";
import { FaUserFriends, FaCoins, FaGlobeAmericas, FaHeart } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="bg-white text-center py-16 px-4 md:px-20">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 flex justify-center items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        FanFund <FaHeart className="text-red-500 animate-bounce" />
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        A funding platform for creators to get fundings from their fans.
      </motion.p>

      <motion.hr
        className="my-8 border-t-4 border-pink-200 w-1/2 mx-auto rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ transformOrigin: "center" }}
      />

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12">
        <motion.div
          className="bg-pink-100 p-8 rounded-full shadow-lg w-48 h-48 flex flex-col justify-center items-center hover:scale-105 transition"
          whileHover={{ scale: 1.05 }}
        >
          <FaUserFriends className="text-4xl text-pink-600 mb-2" />
          <h2 className="text-xl font-semibold text-pink-700">Fund Yourself</h2>
        </motion.div>

        <motion.div
          className="bg-pink-100 p-8 rounded-full shadow-lg w-48 h-48 flex flex-col justify-center items-center hover:scale-105 transition"
          whileHover={{ scale: 1.05 }}
        >
          <FaCoins className="text-4xl text-pink-600 mb-2" />
          <h2 className="text-xl font-semibold text-pink-700">Invest Your Funds</h2>
        </motion.div>

        <motion.div
          className="bg-pink-100 p-8 rounded-full shadow-lg w-48 h-48 flex flex-col justify-center items-center hover:scale-105 transition"
          whileHover={{ scale: 1.05 }}
        >
          <FaGlobeAmericas className="text-4xl text-pink-600 mb-2" />
          <h2 className="text-xl font-semibold text-pink-700">Get Funds from Fans</h2>
        </motion.div>
      </div>
    </section>
  );
}

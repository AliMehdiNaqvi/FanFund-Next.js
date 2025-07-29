"use client";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      className="bg-pink-200 text-pink-700 text-center py-6 shadow-inner"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-sm">
        Made with <FaHeart className="inline text-red-500 animate-pulse" /> by the FanFund Team.
      </p>
      <p className="text-xs mt-1">&copy; {new Date().getFullYear()} FanFund. All rights reserved.</p>
    </motion.footer>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import SupportAndPay from "../Components/SupportAndPay";


const Username = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const rawUsername = params.username;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/Dashuser/byname/${rawUsername}`);
        const result = await res.json();

        if (!res.ok) throw new Error(result.error || "Failed to load user");

        setUserData(result.user);
      } catch (err) {
        console.error("Fetch error:", err.message);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    if (rawUsername) fetchData();
  }, [rawUsername]);

  const defaultCover =
    "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1400&q=80";
  const defaultProfile =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full mx-auto mt-8"
    >
      {/* Banner */}
      <div className="relative w-full h-60 md:h-80 rounded-2xl overflow-hidden shadow-xl">
        <Image
          src={userData?.coverPic || defaultCover}
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
          priority
        />
      </div>

      {/* Profile */}
      <div className="absolute top-44 left-1/2 transform -translate-x-1/2 md:top-56 z-10">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden">
          <Image
            src={userData?.profilePic || defaultProfile}
            alt="Profile"
            width={160}
            height={160}
            className="rounded-full"
            priority
          />
        </div>
      </div>

      {/* Details */}
      <div className="pt-20 text-center">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : userData ? (
          <>
            <p className="text-xl font-bold text-black">
              {userData.userEmail.split("@gmail.com") || "Creator"}
            </p>
            <p className="text-sm text-gray-600">{userData.Profession}</p>
          </>
        ) : (
          <p className="text-red-500">User not found</p>
        )}
      </div>

      {/* Static Stats */}
      <div className="grid grid-cols-4 gap-4 mt-4 text-center text-xs text-gray-600">
        <div>
          <p className="text-base font-bold text-gray-900">24</p>
          <p>Posts</p>
        </div>
        <div>
          <p className="text-base font-bold text-gray-900">3.5k</p>
          <p>Members</p>
        </div>
        <div>
          <p className="text-base font-bold text-gray-900">8</p>
          <p>Releases</p>
        </div>
        <div>
          <p className="text-base font-bold text-green-600">$2,560</p>
          <p>Earned</p>
        </div>
      </div>

      <SupportAndPay />
    </motion.section>
  );
};

export default Username;

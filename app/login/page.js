"use client"
import React from 'react'
import { useEffect } from 'react';
import { motion } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import {
  FaGoogle,
  FaFacebookF,
  FaGithub,
  FaTwitter,
  FaLinkedinIn,
  FaApple,
} from "react-icons/fa";

const Page = () => {
  const { data: session } = useSession()
  const router = useRouter()
  useEffect(() => {

    if (session) {

      router.push('/dashboard')
    }


  }, [session, router])


  return (
    <motion.div

      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className='container justify-center items-center mx-auto my-auto  flex flex-col'>
        <h2 className='text-3xl font-bold text-white mt-5 my-16 '>Login to get your fans to support you.</h2>
        <div className="flex flex-col gap-4 w-full max-w-sm mx-auto ">
          {/* Google */}
          <button className="flex items-center justify-center gap-3 bg-pink-500 text-white rounded-md shadow-lg py-2 px-4 hover:bg-gray-300   hover:cursor-pointer">
            <FaGoogle className="text-white text-2xl" />
            Continue with Google
          </button>

          {/* Facebook */}
          <button className="flex items-center justify-center gap-3 bg-pink-500 text-white rounded-md shadow-lg py-2 px-4 hover:bg-gray-300  hover:cursor-pointer">
            <FaFacebookF className="text-white text-2xl" />
            Continue with Facebook
          </button>

          {/* GitHub */}
          <button className="flex items-center justify-center gap-3 bg-pink-500 text-white rounded-md shadow-lg py-2 px-4 hover:bg-gray-300  hover:cursor-pointer" onClick={() => { signIn("github") }}>
            <FaGithub className="text-white text-2xl" />
            Continue with GitHub
          </button>

          {/* Twitter */}
          <button className="flex items-center justify-center gap-3 bg-pink-500 text-white rounded-md shadow-lg py-2 px-4 hover:bg-gray-300  hover:cursor-pointer">
            <FaTwitter className="text-white text-2xl" />
            Continue with Twitter
          </button>

          {/* LinkedIn */}
          <button className="flex items-center justify-center gap-3 bg-pink-500 text-white rounded-md shadow-lg py-2 px-4 hover:bg-gray-300  hover:cursor-pointer">
            <FaLinkedinIn className="text-white text-2xl" />
            Continue with LinkedIn
          </button>

          {/* Apple */}
          <button className="flex items-center justify-center gap-3 bg-pink-500 text-white rounded-md shadow-lg py-2 px-4 hover:bg-gray-300  hover:cursor-pointer">
            <FaApple className="text-white text-2xl" />
            Continue with Apple
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Page


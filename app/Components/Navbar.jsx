"use client";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FiUser, FiSettings, FiDollarSign, FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.nav
      className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center p-4 md:px-16 bg-pink-200 shadow-sm sticky top-0 z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Link
        href="/"
        className="text-2xl font-bold text-pink-600 flex items-center gap-2"
      >
        FanFund <FaHeart className="text-red-500 animate-pulse" />
      </Link>

      {mounted && session && (
        <div className="relative inline-block text-left">
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="inline-flex justify-center items-center rounded-xl bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300">
                Welcome {session.user.email} 💖
                <ChevronDownIcon
                  className="ml-2 -mr-1 h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-2xl ring-1 ring-black/10 focus:outline-none z-50">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/dashboard"
                        className={`${
                          active
                            ? "bg-pink-50 text-pink-600"
                            : "text-gray-800"
                        } flex items-center gap-2 px-4 py-2 text-sm`}
                      >
                        <FiUser className="text-pink-500" /> Dashboard
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href={`/${session.user.name}`}
                        className={`${
                          active
                            ? "bg-pink-50 text-pink-600"
                            : "text-gray-800"
                        } flex items-center gap-2 px-4 py-2 text-sm`}
                      >
                        <FiSettings className="text-pink-500" /> Your page
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/earnings"
                        className={`${
                          active
                            ? "bg-pink-50 text-pink-600"
                            : "text-gray-800"
                        } flex items-center gap-2 px-4 py-2 text-sm`}
                      >
                        <FiDollarSign className="text-pink-500" /> Earnings
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        onClick={() => {
                          signOut();
                        }}
                        href="/signout"
                        className={`${
                          active
                            ? "bg-red-50 text-red-600"
                            : "text-gray-800"
                        } flex items-center gap-2 px-4 py-2 text-sm`}
                      >
                        <FiLogOut className="text-red-500" /> Sign out
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}

      <div className="flex gap-3 items-center">
        {mounted && session && (
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-5 py-2 text-sm shadow"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </button>
        )}
        {mounted && !session && (
          <Link href="/login">
            <button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-5 py-2 text-sm shadow">
              Login
            </button>
          </Link>
        )}
      </div>
    </motion.nav>
  );
}

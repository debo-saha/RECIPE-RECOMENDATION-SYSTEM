"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function Page() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/95 backdrop-blur-sm">
      <div className="w-full max-w-md transform transition-all duration-300 ease-out">
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-100">
          {/* Header with animated checkmark */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 pt-16 pb-12 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
              <svg
                className="h-12 w-12 text-emerald-500 animate-checkmark"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 0.2
                  }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
          </div>

          {/* Content */}

          <div className="px-6 py-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900">
              Donation Successful!
            </h3>
            <p className="mt-2 text-gray-600">
              Thank you for your generous support. Your contribution helps us
              continue our important work.
            </p>

            {/* Confetti effect would be implemented here with a library like react-confetti */}

            <div className="mt-8">
              <Link
                href="/SupportUs"
                className="inline-flex items-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Return to Support Page
              </Link>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default Page;
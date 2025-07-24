// src/app/admin/user-list/[id]/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link"; // Link is not used, can be removed if not needed

// Full initial user data (re-declared here for self-contained example, ideally shared or fetched)
const initialUsersData = [
    {
      id: "5089",
      customer: {
        name: "Jane Cooper",
        avatar: "https://images.pexels.com/photos/1250655/pexels-photo-1250655.jpeg",
      },
      joinDate: "6 April, 2023",
      status: "Active",
      email: "jane.cooper@example.com",
      phone: "664 333 224",
    },
    {
      id: "5090",
      customer: {
        name: "Jerome Bell",
        avatar: "https://placehold.co/40x40/33FF57/FFFFFF?text=JB",
      },
      joinDate: "6 April, 2023",
      status: "Blocked",
      email: "jerome.bell@example.com",
      phone: "123 456 789",
    },
    {
      id: "5091",
      customer: {
        name: "Jenny Wilson",
        avatar: "https://placehold.co/40x40/5733FF/FFFFFF?text=JW",
      },
      joinDate: "6 April, 2023",
      status: "Active",
      email: "jenny.wilson@example.com",
      phone: "987 654 321",
    },
    {
      id: "5092",
      customer: {
        name: "Ralph Edwards",
        avatar: "https://placehold.co/40x40/FF33A1/FFFFFF?text=RE",
      },
      joinDate: "6 April, 2023",
      status: "Blocked",
      email: "ralph.edwards@example.com",
      phone: "555 123 456",
    },
    {
      id: "5093",
      customer: {
        name: "Alice Johnson",
        avatar: "https://placehold.co/40x40/33A1FF/FFFFFF?text=AJ",
      },
      joinDate: "7 April, 2023",
      status: "Active",
      email: "alice.j@example.com",
      phone: "111 222 333",
    },
    {
      id: "5094",
      customer: {
        name: "Bob Williams",
        avatar: "https://placehold.co/40x40/A133FF/FFFFFF?text=BW",
      },
      joinDate: "7 April, 2023",
      status: "Blocked",
      email: "bob.w@example.com",
      phone: "444 555 666",
    },
    {
      id: "5095",
      customer: {
        name: "Charlie Brown",
        avatar: "https://placehold.co/40x40/FFC133/FFFFFF?text=CB",
      },
      joinDate: "8 April, 2023",
      status: "Active",
      email: "charlie.b@example.com",
      phone: "777 888 999",
    },
    {
      id: "5096",
      customer: {
        name: "Diana Miller",
        avatar: "https://placehold.co/40x40/33FFC1/FFFFFF?text=DM",
      },
      joinDate: "8 April, 2023",
      status: "Blocked",
      email: "diana.m@example.com",
      phone: "222 333 444",
    },
    {
      id: "5097",
      customer: {
        name: "Eve Davis",
        avatar: "https://placehold.co/40x40/C133FF/FFFFFF?text=ED",
      },
      joinDate: "9 April, 2023",
      status: "Active",
      email: "eve.d@example.com",
      phone: "999 000 111",
    },
    {
      id: "5098",
      customer: {
        name: "Frank White",
        avatar: "https://placehold.co/40x40/FF3366/FFFFFF?text=FW",
      },
      joinDate: "9 April, 2023",
      status: "Blocked",
      email: "frank.w@example.com",
      phone: "333 444 555",
    },
];


export default function UserDetailsPage({ params }) {
  const router = useRouter();
  // Unwrap params if it's a Promise (Next.js 14+)
  const unwrappedParams = typeof params.then === "function" ? React.use(params) : params;
  const userId = unwrappedParams.id;
  const [mounted, setMounted] = useState(false);

  // Find the user from the initialUsersData array
  const user = initialUsersData.find(u => u.id === userId);

  useEffect(() => {
    setMounted(true);
    // document.body.style.overflow = "hidden"; // This might cause issues if other modals are open
    // Consider using a more targeted approach for overflow, or allow scrolling in the background
    return () => {
      // document.body.style.overflow = "auto";
    };
  }, []);

  if (!user || !mounted) {
    // You might want a better loading/error state here
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center text-white">
        Loading user details...
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4" // Added padding for smaller screens
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-[#3D3D3D] text-white p-6 rounded-lg shadow-lg w-full max-w-md relative border border-gray-600" // Added border
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <button
            className="absolute top-2 right-2 text-white text-xl font-bold hover:text-red-500"
            onClick={() => router.back()}
          >
            &times;
          </button>
          <div className="w-full h-48 rounded-lg overflow-hidden mb-4 bg-gray-700 flex items-center justify-center"> {/* Added bg for placeholder */}
            {user.customer.avatar ? (
              <Image
                src={user.customer.avatar}
                alt={user.customer.name}
                width={400}
                height={200}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://placehold.co/400x200/CCCCCC/000000?text=Image+Not+Found" }} // Fallback for image
              />
            ) : (
                <span className="text-gray-400">No Image</span>
            )}
          </div>
          <h2 className="text-2xl font-bold mb-2">{user.customer.name}</h2>
          <p className="text-gray-300 mb-1">Email: {user.email}</p> {/* Added labels */}
          <p className="text-gray-300 mb-1">Phone: {user.phone}</p> {/* Added labels */}
          <p className="text-sm text-gray-400 mt-2">
            Account status: <span className={`font-bold ${user.status === "Active" ? "text-green-400" : "text-red-400"}`}>{user.status}</span>
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Joined: <span className="font-bold">{user.joinDate}</span>
          </p>
          <p className="text-sm text-gray-400 mt-1">
            User ID: <span className="font-bold">#{user.id}</span>
          </p>

          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 transition-colors duration-200"
            >
              Close
            </button>
            <button className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition-colors duration-200">
              {user.status === "Active" ? "Block Account" : "Activate Account"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// // import AvatarImage from "../../../../components/AvatarImage"; // Adjust path as needed

// export default function UserDetailsPage({ params }) {
//   const router = useRouter();
//   const { id } = params; // Get the dynamic ID from the URL

//   // Dummy data (replace with actual data fetching from an API or database)
//   const allUsers = [
//     {
//       id: "#5089",
//       customer: {
//         name: "Jane Cooper",
//         avatar: "https://placehold.co/40x40/FF5733/FFFFFF?text=JC",
//         email: "janecooper@example.com",
//         phone: "664-333-224",
//       },
//       joinDate: "6 April, 2023",
//       status: "Active",
//     },
//     {
//       id: "#5090",
//       customer: {
//         name: "Jerome Bell",
//         avatar: "https://placehold.co/40x40/33FF57/FFFFFF?text=JB",
//         email: "jeromebell@example.com",
//         phone: "123-456-7890",
//       },
//       joinDate: "6 April, 2023",
//       status: "Blocked",
//     },
//     {
//       id: "#5091",
//       customer: {
//         name: "Jenny Wilson",
//         avatar: "https://placehold.co/40x40/5733FF/FFFFFF?text=JW",
//         email: "jennywilson@example.com",
//         phone: "987-654-3210",
//       },
//       joinDate: "6 April, 2023",
//       status: "Active",
//     },
//     {
//       id: "#5092",
//       customer: {
//         name: "Ralph Edwards",
//         avatar: "https://placehold.co/40x40/FF33A1/FFFFFF?text=RE",
//         email: "ralphedwards@example.com",
//         phone: "555-123-4567",
//       },
//       joinDate: "6 April, 2023",
//       status: "Blocked",
//     },
//     {
//       id: "#5093",
//       customer: {
//         name: "Alice Johnson",
//         avatar: "https://placehold.co/40x40/33A1FF/FFFFFF?text=AJ",
//         email: "alicej@example.com",
//         phone: "111-222-3333",
//       },
//       joinDate: "7 April, 2023",
//       status: "Active",
//     },
//     {
//       id: "#5094",
//       customer: {
//         name: "Bob Williams",
//         avatar: "https://placehold.co/40x40/A133FF/FFFFFF?text=BW",
//         email: "bobw@example.com",
//         phone: "444-555-6666",
//       },
//       joinDate: "7 April, 2023",
//       status: "Blocked",
//     },
//     {
//       id: "#5095",
//       customer: {
//         name: "Charlie Brown",
//         avatar: "https://placehold.co/40x40/FFC133/FFFFFF?text=CB",
//         email: "charlieb@example.com",
//         phone: "777-888-9999",
//       },
//       joinDate: "8 April, 2023",
//       status: "Active",
//     },
//     {
//       id: "#5096",
//       customer: {
//         name: "Diana Miller",
//         avatar: "https://placehold.co/40x40/33FFC1/FFFFFF?text=DM",
//         email: "dianam@example.com",
//         phone: "000-111-2222",
//       },
//       joinDate: "8 April, 2023",
//       status: "Blocked",
//     },
//     {
//       id: "#5097",
//       customer: {
//         name: "Eve Davis",
//         avatar: "https://placehold.co/40x40/C133FF/FFFFFF?text=ED",
//         email: "eved@example.com",
//         phone: "333-444-5555",
//       },
//       joinDate: "9 April, 2023",
//       status: "Active",
//     },
//     {
//       id: "#5098",
//       customer: {
//         name: "Frank White",
//         avatar: "https://placehold.co/40x40/FF3366/FFFFFF?text=FW",
//         email: "frankw@example.com",
//         phone: "666-777-8888",
//       },
//       joinDate: "9 April, 2023",
//       status: "Blocked",
//     },
//   ];

//   // Find the user based on the ID from the URL
//   const user = allUsers.find((u) => u.id === id);

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-[#2D2D2D] text-white flex items-center justify-center">
//         <p className="text-xl">User not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#2D2D2D] text-white p-6 sm:p-8 font-sans">
//       {/* Back Button */}
//       <div className="flex items-center mb-6">
//         <button onClick={() => router.back()} className="text-gray-400 hover:text-white flex items-center">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6 mr-2"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M10 19l-7-7m0 0l7-7m-7 7h18"
//             />
//           </svg>
//           <span className="text-lg">Back to User List</span>
//         </button>
//       </div>

//       {/* User Details Card */}
//       <div className="bg-[#2D2D2D] rounded-lg shadow-lg p-6 w-full max-w-md mx-auto border border-gray-700">
//         <div className="flex flex-col items-center mb-6">
//           <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-gray-600 mb-4">
//             {/* <AvatarImage src={user.customer.avatar} alt={user.customer.name} /> */}
//           </div>
//           <h4 className="text-2xl font-bold mb-1">{user.customer.name}</h4>
//           <p className="text-gray-400 text-sm">Join Date: {user.joinDate}</p>
//         </div>

//         <div className="space-y-4 mb-6">
//           <div>
//             <label className="block text-gray-400 text-sm font-medium mb-1">
//               Email
//             </label>
//             <input
//               type="text"
//               value={user.customer.email || "N/A"}
//               readOnly
//               className="w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-400 text-sm font-medium mb-1">
//               Phone
//             </label>
//             <input
//               type="text"
//               value={user.customer.phone || "N/A"}
//               readOnly
//               className="w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-400 text-sm font-medium mb-1">
//               Account Status
//             </label>
//             <input
//               type="text"
//               value={user.status}
//               readOnly
//               className={`w-full p-2 rounded-md border focus:outline-none ${
//                 user.status === "Active"
//                   ? "bg-green-700 text-white border-green-600"
//                   : "bg-red-700 text-white border-red-600"
//               }`}
//             />
//           </div>
//         </div>

//         {/* Action buttons (if needed on this page, otherwise remove) */}
//         <div className="flex justify-end space-x-4">
//           {/* Example: A button to toggle block/unblock status if this page should allow it */}
//           {/* <button
//             onClick={() => alert('Implement block/unblock logic here for ' + user.id)}
//             className={`px-6 py-2 rounded-lg text-white transition-colors ${
//               user.status === "Active"
//                 ? "bg-red-600 hover:bg-red-700"
//                 : "bg-green-600 hover:bg-green-700"
//             }`}
//           >
//             {user.status === "Active" ? "Block Account" : "Unblock Account"}
//           </button> */}
//         </div>
//       </div>
//     </div>
//   );
// }

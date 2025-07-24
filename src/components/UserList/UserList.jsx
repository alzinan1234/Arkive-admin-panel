"use client";

import React, { useState } from "react";

// AvatarImage client component for fallback avatar
function AvatarImage({ src, alt }) {
  const [imgSrc, setImgSrc] = React.useState(src);
  return (
    <img
      className="h-full w-full object-cover"
      src={imgSrc}
      alt={alt}
      onError={() =>
        setImgSrc("https://placehold.co/40x40/CCCCCC/000000?text=NA")
      }
    />
  );
}

// Main App component
export default function UserList() {
  // Initial user data
  const initialUsers = [
    {
      id: "#5089",
      customer: {
        name: "Jane Cooper",
        avatar: "https://placehold.co/40x40/FF5733/FFFFFF?text=JC", // Placeholder image
      },
      joinDate: "6 April, 2023",
      status: "Active",
    },
    {
      id: "#5090", // Changed ID
      customer: {
        name: "Jerome Bell",
        avatar: "https://placehold.co/40x40/33FF57/FFFFFF?text=JB", // Placeholder image
      },
      joinDate: "6 April, 2023",
      status: "Blocked",
    },
    {
      id: "#5091", // Changed ID
      customer: {
        name: "Jenny Wilson",
        avatar: "https://placehold.co/40x40/5733FF/FFFFFF?text=JW", // Placeholder image
      },
      joinDate: "6 April, 2023",
      status: "Active",
    },
    {
      id: "#5092", // Changed ID
      customer: {
        name: "Ralph Edwards",
        avatar: "https://placehold.co/40x40/FF33A1/FFFFFF?text=RE", // Placeholder image
      },
      joinDate: "6 April, 2023",
      status: "Blocked",
    },
    {
      id: "#5093", // New entry
      customer: {
        name: "Alice Johnson",
        avatar: "https://placehold.co/40x40/33A1FF/FFFFFF?text=AJ",
      },
      joinDate: "7 April, 2023",
      status: "Active",
    },
    {
      id: "#5094", // New entry
      customer: {
        name: "Bob Williams",
        avatar: "https://placehold.co/40x40/A133FF/FFFFFF?text=BW",
      },
      joinDate: "7 April, 2023",
      status: "Blocked",
    },
    {
      id: "#5095", // New entry
      customer: {
        name: "Charlie Brown",
        avatar: "https://placehold.co/40x40/FFC133/FFFFFF?text=CB",
      },
      joinDate: "8 April, 2023",
      status: "Active",
    },
    {
      id: "#5096", // New entry
      customer: {
        name: "Diana Miller",
        avatar: "https://placehold.co/40x40/33FFC1/FFFFFF?text=DM",
      },
      joinDate: "8 April, 2023",
      status: "Blocked",
    },
    {
      id: "#5097", // New entry
      customer: {
        name: "Eve Davis",
        avatar: "https://placehold.co/40x40/C133FF/FFFFFF?text=ED",
      },
      joinDate: "9 April, 2023",
      status: "Active",
    },
    {
      id: "#5098", // New entry
      customer: {
        name: "Frank White",
        avatar: "https://placehold.co/40x40/FF3366/FFFFFF?text=FW",
      },
      joinDate: "9 April, 2023",
      status: "Blocked",
    },
  ];

  // State for all functionalities
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [modalUser, setModalUser] = useState(null);
  const [showDateFilter, setShowDateFilter] = useState(false);

  // Helper: parse date string to Date object
  function parseDate(str) {
    // Format: "6 April, 2023"
    const [day, monthStr, year] = str.replace(",", "").split(" ");
    return new Date(`${year}-${("0" + (new Date(`${monthStr} 1`).getMonth() + 1)).slice(-2)}-${("0" + day).slice(-2)}`);
  }

  // Filtered users
  let filtered = initialUsers.filter((u) => {
    // Search by name or ID
    const searchMatch =
      u.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase());
    // Status filter
    const statusMatch = status === "All" || u.status === status;
    // Date range filter only if showDateFilter is true
    let dateMatch = true;
    if (showDateFilter) {
      if (dateRange.from) {
        dateMatch = dateMatch && parseDate(u.joinDate) >= new Date(dateRange.from);
      }
      if (dateRange.to) {
        dateMatch = dateMatch && parseDate(u.joinDate) <= new Date(dateRange.to);
      }
    }
    return searchMatch && statusMatch && dateMatch;
  });

  // Pagination
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Handlers
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };
  const handlePageSize = (e) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  };
  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
    setPage(1);
  };
  const handlePage = (p) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };
  
  const handleDelete = (user) => {
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  };
  const handleBlockUnblock = (user) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" }
          : u
      )
    );
  };

  return (
    <div className="w-full text-white px-6 py-5 bg-[#2D2D2D] rounded-[20px] shadow-[0px_2px_12px_0px_rgba(44,120,220,0.08)] font-sans">
      <h2 className="text-xl sm:text-2xl font-semibold p-4 sm:p-6 ">User List</h2>
      {/* Header with Search, Status, and Date Filter Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 border-gray-700">
        <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
          {/* Search */}
          <div className="relative w-full sm:w-64 mr-0 sm:mr-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-5 pr-4 py-2 rounded-lg border border-[#E9E7FD] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={handleSearch}
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          {/* Status filter */}
          <div className="relative border border-[#E9E7FD] rounded-lg ml-2">
            <select
              className="appearance-none text-gray-300 py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={status}
              onChange={handleStatus}
            >
              <option value="All">Status : All</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
              </svg>
            </div>
          </div>
        </div>
        {/* Filter by date range button */}
        <button
          className="border border-[#E9E7FD] text-gray-300 py-2 px-4 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center cursor-pointer"
          onClick={() => setShowDateFilter((prev) => !prev)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
              stroke="currentColor"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Filter by date range
        </button>
      </div>
      {/* Date range filter UI (toggle) */}
      {showDateFilter && (
        <div className="flex items-center justify-end space-x-2 mb-4">
          <input
            type="date"
            name="from"
            value={dateRange.from}
            onChange={handleDateChange}
            className="border border-[#E9E7FD] text-gray-300 py-2 px-2 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-400">to</span>
          <input
            type="date"
            name="to"
            value={dateRange.to}
            onChange={handleDateChange}
            className="border border-[#E9E7FD] text-gray-300 py-2 px-2 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
              <th className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                <div className="flex items-center">Customer
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <path opacity="0.4" d="M16.18 13.4399L12.39 8.38989H6.78C5.82 8.38989 5.34 9.54989 6.02 10.2299L11.2 15.4099C12.03 16.2399 13.38 16.2399 14.21 15.4099L16.18 13.4399Z" fill="#DBDADE" />
                    <path d="M18.62 8.38989H12.39L16.18 13.4399L19.39 10.2299C20.06 9.54989 19.58 8.38989 18.62 8.38989Z" fill="#DBDADE" />
                  </svg>
                </div>
              </th>
              <th className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Join Date</th>
              <th className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400">No users found.</td>
              </tr>
            ) : (
              paginated.map((user, index) => (
                <tr key={user.id}>
                  <td className="px-3 py-3 sm:px-6 whitespace-nowrap text-sm font-medium text-gray-300">{user.id}</td>
                  <td className="px-3 py-3 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden">
                        <AvatarImage src={user.customer.avatar} alt={user.customer.name} />
                      </div>
                      <div className="ml-2 sm:ml-4">
                        <div className="text-sm font-medium text-gray-200">{user.customer.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 sm:px-6 whitespace-nowrap text-sm text-gray-300">{user.joinDate}</td>
                  <td className="px-3 py-3 sm:px-6 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{user.status}</span>
                  </td>
                  <td className="px-3 py-3 sm:px-6 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {/* Eye icon for view */}
                      <button onClick={() => handleView(user)} title="View details">
                        <svg className="h-5 w-5 text-orange-400 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      </button>
                      {/* Action icon based on status */}
                      {user.status === "Active" ? (
                        <button onClick={() => handleBlockUnblock(user)} title="Block user">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="cursor-pointer">
                            <g clipPath="url(#clip0_0_736)">
                              <path d="M7.6001 0.209961C3.75283 0.209961 0.600098 3.3627 0.600098 7.20996C0.600098 11.0572 3.75283 14.21 7.6001 14.21C11.4474 14.21 14.6001 11.0572 14.6001 7.20996C14.6001 3.3627 11.4474 0.209961 7.6001 0.209961ZM2.26807 7.20996C2.26807 4.27321 4.66335 1.87793 7.6001 1.87793C8.70749 1.87793 9.77395 2.22243 10.6845 2.87048L7.6001 5.95486L3.26067 10.2943C2.61257 9.38376 2.26807 8.31736 2.26807 7.20996ZM7.6001 12.542C6.4927 12.542 5.42624 12.1974 4.51572 11.5494L11.9396 4.12556C12.5876 5.03611 12.9321 6.10251 12.9321 7.20996C12.9321 10.1467 10.5368 12.542 7.6001 12.542Z" fill="#FF3636" />
                              <path d="M14.6001 7.20996C14.6001 11.0572 11.4474 14.21 7.6001 14.21V12.542C10.5368 12.542 12.9321 10.1467 12.9321 7.20996C12.9321 6.10251 12.5876 5.03611 11.9395 4.12559L7.6001 8.46501V5.95486L10.6845 2.87048C9.77395 2.22243 8.70749 1.87793 7.6001 1.87793V0.209961C11.4474 0.209961 14.6001 3.3627 14.6001 7.20996Z" fill="#F40000" />
                            </g>
                            <defs>
                              <clipPath id="clip0_0_736">
                                <rect width="14" height="14" fill="white" transform="translate(0.600098 0.209961)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      ) : (
                        <button onClick={() => handleBlockUnblock(user)} title="Unblock user">
                          <svg className="h-5 w-5 text-green-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                          </svg>
                        </button>
                      )}
                      {/* Delete icon */}
                      <button onClick={() => handleDelete(user)} title="Delete user">
                        <svg className="h-5 w-5 text-red-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 sm:p-6 border-t border-gray-700">
        {/* Page size dropdown */}
        <div className="relative inline-block text-left">
          <select
            className="appearance-none text-gray-300 border border-[#E9E7FD] py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={pageSize}
            onChange={handlePageSize}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
            </svg>
          </div>
        </div>
        <div className="text-sm text-gray-300 ml-2">
          of <span className="font-semibold">{total}</span>
        </div>
        <div className="flex items-center space-x-2 ml-auto">
          <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-700" onClick={() => handlePage(page - 1)} disabled={page === 1}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`px-3 py-1 rounded-lg text-sm font-semibold ${p === page ? "bg-[#DCF3FF] text-black" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
              onClick={() => handlePage(p)}
            >
              {p}
            </button>
          ))}
          <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-700" onClick={() => handlePage(page + 1)} disabled={page === totalPages}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      
    </div>
  );
}
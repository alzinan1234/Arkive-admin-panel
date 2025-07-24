// components/EarningsTable.js
"use client";

import React, { useState } from "react";

// Dummy data for demonstration
const dummyData = Array.from({ length: 50 }).map((_, i) => ({
  serial: "#01",
  name: "Robert",
  itemNumber: "#A12345",
  salePrice: "$123.00",
  commission: "10%",
  profit: "80.00",
  date: "12 June 2025",
}));

const itemsPerPage = 10;

export default function EarningsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dummyData.length / itemsPerPage);
  const paginatedData = dummyData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className=" min-h-screen p-8">
      <h2 className="text-white text-xl font-bold mb-4">Earning Overview</h2>
      <div className="bg-[#DCF3FF] rounded-lg p-4 mb-6 w-[400px]">
        <div className="text-[#181818] text-md">Total Earning</div>
        <div className="text-3xl font-bold text-[#181818]">$25,215</div>
      </div>
      <div className="bg-[#232323] rounded-xl p-6">
        <table className="w-full text-sm text-white">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-4">Serial</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Item Number</th>
              <th className="py-2 px-4">Sale Price</th>
              <th className="py-2 px-4">Commission %</th>
              <th className="py-2 px-4">Seller's Profit</th>
              <th className="py-2 px-4">Transaction Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, idx) => (
              <tr key={idx} className="border-b border-[#333]">
                <td className="py-2 px-4">{item.serial}</td>
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.itemNumber}</td>
                <td className="py-2 px-4">{item.salePrice}</td>
                <td className="py-2 px-4">{item.commission}</td>
                <td className="py-2 px-4">{item.profit}</td>
                <td className="py-2 px-4">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4 text-white">
        <div>
          Showing{" "}
          <select className="bg-[#232323] border border-[#333] rounded px-2 py-1">
            <option>10</option>
          </select>{" "}
          of {dummyData.length}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded bg-[#232323] border border-[#333] disabled:opacity-50"
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-2 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-[#DCF3FF] text-[#181818]"
                  : "bg-[#232323] border border-[#333]"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded bg-[#232323] border border-[#333] disabled:opacity-50"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

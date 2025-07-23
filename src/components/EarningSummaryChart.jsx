"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle // Used for custom bar shape
} from "recharts";

const EarningOverviewChart = () => {
  // State to manage the selected year for the chart
  const [selectedYear, setSelectedYear] = useState(2025);
  // State to manage the visibility of the year dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // State to hold the earning data, which will change based on the selected year
  const [currentEarningData, setCurrentEarningData] = useState([]);

  // Define the available years for the dropdown
  const years = [2023, 2024, 2025, 2026];

  // Function to simulate fetching/generating earning data based on the year
  // This function ensures the active bar for 'Jun' remains highlighted as per original design.
  const generateEarningData = useCallback((year) => {
    const baseData = [
      { month: "Jan", height: 58, value: 5800, active: false },
      { month: "Feb", height: 142, value: 14200, active: false },
      { month: "Mar", height: 98, value: 9800, active: false },
      { month: "Apr", height: 112, value: 11200, active: false },
      { month: "May", height: 90, value: 9000, active: false },
      { month: "Jun", height: 161, value: 16100, active: true }, // Always highlight June for demonstration
      { month: "Jul", height: 78, value: 7800, active: false },
      { month: "Aug", height: 142, value: 14200, active: false },
      { month: "Sep", height: 39, value: 3900, active: false },
      { month: "Oct", height: 112, value: 11200, active: false },
      { month: "Nov", height: 63, value: 6300, active: false },
      { month: "Dec", height: 98, value: 9800, active: false },
    ];

    // Apply a simple variation to heights and values based on the year to show dynamic data
    return baseData.map((item) => {
      let newHeight = item.height;
      let newValue = item.value;
      if (year === 2024) {
        newHeight = Math.max(20, item.height - 20); // Slightly lower for 2024
        newValue = Math.max(2000, item.value - 2000);
      } else if (year === 2023) {
        newHeight = Math.max(20, item.height - 40); // Even lower for 2023
        newValue = Math.max(2000, item.value - 4000);
      } else if (year === 2026) {
        newHeight = Math.min(180, item.height + 10); // Slightly higher for 2026
        newValue = Math.min(18000, item.value + 1000);
      }
      return {
        ...item,
        height: newHeight,
        value: newValue,
        active: item.month === "Jun", // Ensure 'Jun' remains active
      };
    });
  }, []); // useCallback to memoize the function

  // Effect hook to update earning data whenever the selected year changes
  useEffect(() => {
    setCurrentEarningData(generateEarningData(selectedYear));
  }, [selectedYear, generateEarningData]); // Add generateEarningData to dependencies

  // Define chart dimensions for Recharts
  const chartHeight = 161; // Max height for bars
  const chartWidth = 737; // Overall chart width for Recharts ResponsiveContainer

  // Custom Bar component to use a div with Tailwind classes for the active bar
  const CustomBar = (props) => {
    const { x, y, width, height, payload } = props;
    const isActive = payload.active;
    // Use a div for the bar, styled with Tailwind classes
    return (
      <foreignObject x={x} y={y} width={width} height={height} style={{ overflow: 'visible' }}>
        <div
          style={{ width: width, height: height, background: isActive ? '#DCF3FF' : undefined }}
          className={`w-10 ${isActive ? 'h-40' : 'bg-zinc-700'} rounded-lg`}
        />
      </foreignObject>
    );
  };

  // Custom Tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-zinc-700 rounded shadow-lg text-white text-xs font-montserrat">
          <p className="font-bold">{label}</p>
          <p className="text-blue-200">{`Earning: $${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle year selection from the dropdown
  const handleYearSelect = (year, event) => {
    event.stopPropagation(); // Prevent the click from bubbling up and re-toggling the dropdown
    setSelectedYear(year);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="h-full w-full px-6 py-5 bg-[#2D2D2D] rounded-[20px] shadow-[0px_2px_12px_0px_rgba(44,120,220,0.08)] flex flex-col justify-start items-start gap-2.5">
      {/* Header Section */}
      <div className="self-stretch flex flex-col justify-start items-start gap-14">
        <div className="self-stretch flex justify-between items-center">
          <div className="text-white text-xl font-bold font-montserrat leading-tight">
            Earning Overview
          </div>
          {/* Year Dropdown */}
          <div className="relative">
            <div
              className="p-2 bg-zinc-700 rounded flex justify-start items-center gap-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              <div className="text-right text-white text-xs font-semibold font-montserrat leading-[10px]">
                {selectedYear}
              </div>
              {/* Dropdown Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-2.5 w-2.5 text-white transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown Options */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-20 bg-white text-black rounded shadow-lg z-50">
                {years.map((year) => (
                  <div
                    key={year}
                    className="px-4 py-2 text-black text-xs font-semibold font-montserrat leading-[10px] hover:bg-zinc-600 cursor-pointer"
                    onClick={(e) => handleYearSelect(year, e)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chart Section */}
        <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
          <div className=" flex items-center gap-4 relative w-full">
            {/* Top dashed line and value */}
            {/* This is positioned absolutely to overlay the chart area */}
            <div className="absolute top-0 left-0 w-full h-0 border-t border-dashed border-blue-200 z-10"></div>
            <div className="absolute  right-0 bg-[#2D2D2D] text-xs font-medium font-montserrat leading-tight z-10">
              $179
            </div>
          </div>

          {/* Recharts Bar Chart */}
          <div
            className="w-full"
            style={{ height: `${chartHeight + 20}px` }} // Added some padding for XAxis labels
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={currentEarningData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="month"
                  axisLine={false} // Hide X-axis line
                  tickLine={false} // Hide X-axis tick marks
                  interval={0} // Show all labels
                  tick={{
                    fill: "#94a3b8", // slate-400
                    fontSize: 12, // text-xs
                    fontWeight: 500, // font-medium
                    fontFamily: "Montserrat",
                  }}
                  height={30} // Height for labels
                />
                <YAxis
                  hide // Hide Y-axis as per original design
                  domain={[0, 180]} // Set domain to match max bar height (161) and leave room for $179 line
                />
                <Tooltip cursor={false} content={<CustomTooltip />} />
                <Bar
                  dataKey="height"
                  shape={<CustomBar />} // Use custom bar component for styling
                  isAnimationActive={false} // Disable animation for instant rendering
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningOverviewChart;

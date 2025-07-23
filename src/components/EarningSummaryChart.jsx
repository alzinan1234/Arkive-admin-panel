// components/EarningOverviewChart.js
import React from 'react';

const EarningOverviewChart = () => {
  // Data for bars and months
  const earningData = [
    { month: 'Jan', height: 58, active: false },
    { month: 'Feb', height: 142, active: false },
    { month: 'Mar', height: 98, active: false },
    { month: 'Apr', height: 112, active: false },
    { month: 'May', height: 90, active: false },
    { month: 'Jun', height: 161, active: true }, // Highlighted bar
    { month: 'Jul', height: 78, active: false },
    { month: 'Aug', height: 142, active: false },
    { month: 'Sep', height: 39, active: false },
    { month: 'Oct', height: 112, active: false },
    { month: 'Nov', height: 63, active: false },
    { month: 'Dec', height: 98, active: false },
  ];

  // These values are derived from the original inline styles for precise spacing
  const chartWidth = 737;
  const chartHeight = 161;
  const barWidth = 39.61; // Tailwind's w-10 is 40px, so this is very close
  // Calculate spacing based on total width and number of bars
  const totalBarWidth = earningData.length * barWidth;
  const totalSpacingWidth = chartWidth - totalBarWidth;
  const barSpacing = totalSpacingWidth / (earningData.length - 1); // Space between bars

  return (
    <div className=" h-full w-[900px] px-6 py-5 bg-zinc-800 rounded-[20px] shadow-[0px_2px_12px_0px_rgba(44,120,220,0.08)] flex flex-col justify-start items-start gap-2.5">
      {/* Header Section */}
      <div className="self-stretch flex flex-col justify-start items-start gap-14">
        <div className="self-stretch flex justify-between items-center">
          <div className="text-white text-xl font-bold font-montserrat leading-tight">
            Earning Overview
          </div>
          <div className="p-2 bg-zinc-700 rounded flex justify-start items-center gap-2">
            <div className="text-right text-white text-xs font-semibold font-montserrat leading-[10px]">
              2025
            </div>
            {/* Dropdown Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-2.5 w-2.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Chart Section */}
        <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
          <div className="self-stretch flex flex-col justify-start items-start">
            {/* Top dashed line and value */}
            <div className="relative w-full">
              {/* The width of the line is adjusted to match the original 703px */}
              <div className="w-[703px] h-0 border-t border-dashed border-blue-200"></div>
              <div className="absolute top-[-10px] right-0 text-blue-200 text-xs font-medium font-montserrat leading-tight">
                $179
              </div>
            </div>

            {/* Bars Container */}
            <div
              className="relative w-full"
              style={{ height: `${chartHeight}px`, width: `${chartWidth}px` }}
            >
              {earningData.map((data, i) => {
                // Calculate left position for each bar to maintain original spacing
                const left = i * (barWidth + barSpacing);
                return (
                  <div
                    key={i}
                    className={`absolute rounded-lg ${
                      data.active ? 'bg-blue-200' : 'bg-zinc-700'
                    }`}
                    style={{
                      width: `${barWidth}px`,
                      height: `${data.height}px`,
                      left: `${left}px`,
                      top: `${chartHeight - data.height}px`, // Position from bottom
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Month Labels */}
          <div
            className="w-full flex flex-row justify-between items-center mt-2"
            style={{ width: `${chartWidth}px` }}
          >
            {earningData.map((data, i) => (
              <div
                key={i}
                className="w-10 text-center text-slate-400 text-xs font-medium font-montserrat leading-tight"
              >
                {data.month}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningOverviewChart;

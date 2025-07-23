// components/RecentSubscriber.js
"use client";
import React, { useState } from 'react';

// Client component for avatar image with fallback
function AvatarImage({ src, alt, fallbackText }) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <img
      className="w-8 h-8 rounded-full object-cover"
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(`https://placehold.co/34x34/CCCCCC/000000?text=${fallbackText}`)}
    />
  );
}
const RecentSubscriber = () => {
  // Sample data for recent subscribers
  const subscribers = [
    {
      id: 1,
      name: 'Alex Manda',
      time: 'Today, 16:36',
      avatar: 'https://placehold.co/34x34/60A5FA/FFFFFF?text=AM', // Placeholder image URL
    },
    {
      id: 2,
      name: 'Jane Doe',
      time: 'Yesterday, 10:00',
      avatar: 'https://placehold.co/34x34/F87171/FFFFFF?text=JD', // Placeholder image URL
    },
    {
      id: 3,
      name: 'John Smith',
      time: '2 days ago, 09:15',
      avatar: 'https://placehold.co/34x34/34D399/FFFFFF?text=JS', // Placeholder image URL
    },
  ];

  return (
    <div className=" w-full px-6 py-6 bg-zinc-800 rounded-[20px] shadow-[0px_2px_12px_0px_rgba(44,120,220,0.08)] flex flex-col justify-start items-start gap-3">
      {/* Card Title */}
      <div className="self-stretch text-blue-200 text-xl font-bold font-montserrat leading-loose">
        Recent Subscriber
      </div>

      {/* Subscriber List */}
      <div className="self-stretch flex flex-col justify-start items-end gap-3">
        <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
          {subscribers.map((subscriber) => (
            <div
              key={subscriber.id}
              className="self-stretch py-2 border-b border-neutral-700 flex justify-start items-center gap-12"
            >
              <div className="flex-1 flex justify-start items-center gap-3">
                <AvatarImage
                  src={subscriber.avatar}
                  alt={subscriber.name}
                  fallbackText={subscriber.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                />
                <div className="flex-1 flex flex-col justify-start items-start">
                  <div className="text-blue-200 text-sm font-semibold font-montserrat leading-normal">
                    {subscriber.name}
                  </div>
                  <div className="self-stretch text-slate-400 text-xs font-medium font-montserrat leading-tight">
                    {subscriber.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <button className="inline-flex justify-start items-center gap-[5px] cursor-pointer focus:outline-none">
          <div className="text-white text-base font-semibold font-montserrat leading-7">
            View all
          </div>
          {/* Arrow Icon */}
         <div class="w-6 h-6 relative origin-top-left -rotate-180 overflow-hidden">
    <div class="w-6 h-6 left-0 top-0 absolute"></div>
    <div class="w-4 h-3 left-[3px] top-[6px] absolute bg-text-color"></div>
</div>
        </button>
      </div>
    </div>
  );
};

export default RecentSubscriber;

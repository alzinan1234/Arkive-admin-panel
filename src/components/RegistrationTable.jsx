"use client";
import React from "react";

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
export default function RegistrationTable() {
  const users = [
    {
      id: "#5089",
      customer: {
        name: "Jane Cooper",
        avatar: "https://placehold.co/40x40/FF5733/FFFFFF?text=JC", // Placeholder image
      },
      joinDate: "6 April, 2023",
      status: "Active",
      // Based on the image, Active users have the 'delete' action icon.
      // We can derive actionType from status for consistency.
      // actionType: "delete", // Original: 'delete' for red icon, 'lock' for green icon
    },
    {
      id: "#5089",
      customer: {
        name: "Jerome Bell",
        avatar: "https://placehold.co/40x40/33FF57/FFFFFF?text=JB", // Placeholder image
      },
      joinDate: "6 April, 2023",
      status: "Blocked",
      // Based on the image, Blocked users have the 'lock' action icon.
      // actionType: "blocked", // Original
    },
    {
      id: "#5089",
      customer: {
        name: "Jenny Wilson",
        avatar: "https://placehold.co/40x40/5733FF/FFFFFF?text=JW", // Placeholder image
      },
      joinDate: "6 April, 2023",
      status: "Active",
      // Based on the image, Active users have the 'delete' action icon.
      // actionType: "active", // Original
    },
    {
      id: "#5089",
      customer: {
        name: "Ralph Edwards",
        avatar: "https://placehold.co/40x40/FF33A1/FFFFFF?text=RE", // Placeholder image
      },
      joinDate: "6 April, 2023",
      status: "Blocked",
      // Based on the image, Blocked users have the 'lock' action icon.
      // actionType: "blocked", // Original
    },
  ];

  return (
    <div className=" w-full text-white px-6 py-5 bg-[#2D2D2D] rounded-[20px] shadow-[0px_2px_12px_0px_rgba(44,120,220,0.08)]  flex  font-sans">
      <div className="w-full  rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-xl sm:text-2xl font-semibold p-4 sm:p-6 border-b border-gray-700">
          User List
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    Customer
                    {/* Dropdown arrow for customer column */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <path
                        opacity="0.4"
                        d="M16.18 13.4399L12.39 8.38989H6.78C5.82 8.38989 5.34 9.54989 6.02 10.2299L11.2 15.4099C12.03 16.2399 13.38 16.2399 14.21 15.4099L16.18 13.4399Z"
                        fill="#DBDADE"
                      />
                      <path
                        d="M18.62 8.38989H12.39L16.18 13.4399L19.39 10.2299C20.06 9.54989 19.58 8.38989 18.62 8.38989Z"
                        fill="#DBDADE"
                      />
                    </svg>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Join Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map((user, index) => (
                <tr key={index} className="">
                  <td className="px-3 py-3 sm:px-6 whitespace-nowrap text-sm font-medium text-gray-300">
                    {user.id}
                  </td>
                  <td className="px-3 py-3 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden">
                        <AvatarImage
                          src={user.customer.avatar}
                          alt={user.customer.name}
                        />
                      </div>

                      <div className="ml-2 sm:ml-4">
                        <div className="text-sm font-medium text-gray-200">
                          {user.customer.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 sm:px-6 whitespace-nowrap text-sm text-gray-300">
                    {user.joinDate}
                  </td>
                  <td className="px-3 py-3 sm:px-6 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 sm:px-6 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {/* Eye icon for view */}
                      <svg
                        className="h-5 w-5 text-orange-400 cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        ></path>
                      </svg>
                      {/* Action icon based on status */}
                      {user.status === "Active" ? (
                        // Red delete icon for Active status
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_0_736)">
                            <path
                              d="M7.6001 0.209961C3.75283 0.209961 0.600098 3.3627 0.600098 7.20996C0.600098 11.0572 3.75283 14.21 7.6001 14.21C11.4474 14.21 14.6001 11.0572 14.6001 7.20996C14.6001 3.3627 11.4474 0.209961 7.6001 0.209961ZM2.26807 7.20996C2.26807 4.27321 4.66335 1.87793 7.6001 1.87793C8.70749 1.87793 9.77395 2.22243 10.6845 2.87048L7.6001 5.95486L3.26067 10.2943C2.61257 9.38376 2.26807 8.31736 2.26807 7.20996ZM7.6001 12.542C6.4927 12.542 5.42624 12.1974 4.51572 11.5494L11.9396 4.12556C12.5876 5.03611 12.9321 6.10251 12.9321 7.20996C12.9321 10.1467 10.5368 12.542 7.6001 12.542Z"
                              fill="#FF3636"
                            />
                            <path
                              d="M14.6001 7.20996C14.6001 11.0572 11.4474 14.21 7.6001 14.21V12.542C10.5368 12.542 12.9321 10.1467 12.9321 7.20996C12.9321 6.10251 12.5876 5.03611 11.9395 4.12559L7.6001 8.46501V5.95486L10.6845 2.87048C9.77395 2.22243 8.70749 1.87793 7.6001 1.87793V0.209961C11.4474 0.209961 14.6001 3.3627 14.6001 7.20996Z"
                              fill="#F40000"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_0_736">
                              <rect
                                width="14"
                                height="14"
                                fill="white"
                                transform="translate(0.600098 0.209961)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        // Green lock icon for Blocked status
                        <svg
                          className="h-5 w-5 text-green-500 cursor-pointer"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          ></path>
                        </svg>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

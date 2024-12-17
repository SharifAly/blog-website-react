import React from "react";

// SkeletonLoader component to display a loading animation
const SkeletonLoader = () => {
  return (
    // Container div with margin, rounded corners, shadow, and pulse animation
    <div className="my-4 rounded shadow-md animate-pulse dark:bg-gray-900">
      {/* First section with flex layout and padding */}
      <div className="flex p-4 space-x-4 sm:px-8">
        {/* Circle element representing an avatar */}
        <div className="flex-shrink-0 w-16 h-16 rounded-full dark:bg-gray-700"></div>
        {/* Container for text lines */}
        <div className="flex-1 py-2 space-y-4">
          {/* First line of text */}
          <div className="w-full h-3 rounded dark:bg-gray-700"></div>
          {/* Second line of text */}
          <div className="w-5/6 h-3 rounded dark:bg-gray-700"></div>
        </div>
      </div>
      {/* Second section with padding and space between elements */}
      <div className="p-4 space-y-4 sm:px-8">
        {/* First line of text */}
        <div className="w-full h-4 rounded dark:bg-gray-700"></div>
        {/* Second line of text */}
        <div className="w-full h-4 rounded dark:bg-gray-700"></div>
        {/* Third line of text */}
        <div className="w-3/4 h-4 rounded dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;

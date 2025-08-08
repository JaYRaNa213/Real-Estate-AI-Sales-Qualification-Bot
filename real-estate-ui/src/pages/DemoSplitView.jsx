import React from "react";
import PropertyDemo from "./PropertyDemo";
import Home from "./Home";

export default function DemoSplitView() {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left: Property Demo */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-y-auto border-r border-gray-300">
        <div className="p-4 bg-white h-full">
          <h2 className="text-xl font-bold mb-4 text-center">🏠 Customer Property Demo</h2>
          <PropertyDemo />
        </div>
      </div>

      {/* Right: Admin Dashboard */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-y-auto">
        <div className="p-4 bg-gray-50 h-full">
          <h2 className="text-xl font-bold mb-4 text-center">🧑‍💼 Admin Dashboard</h2>
          <Home />
        </div>
      </div>
    </div>
  );
}

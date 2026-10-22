import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFDF1]">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="min-h-screen md:ml-64">
        <DashboardHeader
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
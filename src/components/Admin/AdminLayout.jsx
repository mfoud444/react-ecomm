import React, { useState, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Menu, ChevronDown } from 'lucide-react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import DarkMode from "../Navbar/DarkMode";
const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Close sidebar on mobile after navigation
  const handleNavigate = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar isOpen={sidebarOpen} onClose={toggleSidebar} onNavigate={handleNavigate} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
          <button onClick={toggleSidebar} className="lg:hidden">
            <Menu size={24} />
            <span className="sr-only">Open sidebar</span>
          </button>
          <div className="flex items-center">
          <DarkMode />
            <span className="text-sm font-semibold">Admin User</span>
            <ChevronDown size={16} className="ml-2" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <LoadingSpinner />
            </div>
          }>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
import React, { useState, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Menu, ChevronDown } from 'lucide-react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import DarkMode from "../Navbar/DarkMode";
import Avatar from '@/components/common/Avatar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const profile = localStorage.getItem('profile') || '{}';
  const userName = profile?.name || 'Demo User';
  const userType = profile?.role || 'Customer';
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNavigate = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-black">
      <AdminSidebar isOpen={sidebarOpen} onClose={toggleSidebar} onNavigate={handleNavigate} />

    
      <div className="flex-1 flex flex-col overflow-hidden">
       
        <header className="flex items-center justify-between h-16 px-6  border-b">
          <button onClick={toggleSidebar} className="lg:hidden">
            <Menu size={24} />
            <span className="sr-only">Open sidebar</span>
          </button>
          <div className="flex items-center gap-4">
          <DarkMode />
          <Avatar  name={userName} type={userType}/>

         
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-black">
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
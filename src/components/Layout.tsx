
"use client";

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Don't render layout for 404 page
  if (location.pathname === '/404') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar className={undefined} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

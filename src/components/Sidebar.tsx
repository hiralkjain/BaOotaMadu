
"use client";

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, TableProperties, BookOpen, PieChart, Settings, Menu as MenuIcon, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setCollapsed(!collapsed);

  const navItems = [
    { 
      title: 'Dashboard', 
      icon: <LayoutDashboard size={20} />, 
      path: '/', 
      active: location.pathname === '/' 
    },
    { 
      title: 'Tables & Orders', 
      icon: <TableProperties size={20} />, 
      path: '/tables', 
      active: location.pathname === '/tables' 
    },
    { 
      title: 'Menu Management', 
      icon: <MenuIcon size={20} />, 
      path: '/menu', 
      active: location.pathname === '/menu' 
    },
    { 
      title: 'Reports', 
      icon: <PieChart size={20} />, 
      path: '/reports', 
      active: location.pathname === '/reports' 
    },
    { 
      title: 'Settings', 
      icon: <Settings size={20} />, 
      path: '/settings', 
      active: location.pathname === '/settings' 
    },
  ];

  return (
    <div className={cn(
      'h-screen bg-navy text-white transition-all duration-300 relative', 
      collapsed ? 'w-20' : 'w-64',
      className
    )}>
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="text-lg font-bold font-montserrat">MenuZen</h1>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <span className="text-xl font-bold">MZ</span>
          </div>
        )}
        <button 
          onClick={toggleSidebar} 
          className="p-1 rounded-full hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.title}>
              <Link 
                to={item.path} 
                className={cn(
                  'flex items-center px-4 py-2 rounded-md hover:bg-sidebar-accent transition-colors',
                  item.active && 'bg-sidebar-accent',
                  collapsed && 'justify-center px-2'
                )}
              >
                <span>{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "justify-start gap-3"
        )}>
          <div className="h-8 w-8 rounded-full bg-orange text-white flex items-center justify-center font-semibold">
            A
          </div>
          {!collapsed && <span>Admin User</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

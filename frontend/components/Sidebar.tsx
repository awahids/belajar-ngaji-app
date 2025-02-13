'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, BookOpen, Users, History } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/admin/users', label: 'User', icon: Users },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white h-full fixed p-4 flex flex-col`}>
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full hover:bg-gray-600 transition-all"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Sidebar Menu */}
        <nav className="mt-6 space-y-4 flex flex-col">
          {menuItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center space-x-4 p-2 rounded-md hover:bg-gray-700 transition",
                pathname === href ? "bg-gray-700 text-white" : "text-gray-300"
              )}
            >
              <Icon className="h-5 w-5" />
              {isOpen && <span>{label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'} p-6`}>
        {children}
      </div>
    </div>
  );
};

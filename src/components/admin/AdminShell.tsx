'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 relative">
      
      {/* Mobile Sidebar (Drawer) */}
      <div 
        className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
        
        {/* Sidebar Content */}
        <div 
          className={`absolute inset-y-0 left-0 w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 lg:hidden">
              <span className="font-bold text-slate-900">Menü</span>
              <button onClick={() => setSidebarOpen(false)} className="p-2 text-slate-400 hover:text-slate-900">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <AdminSidebar onNavItemClick={() => setSidebarOpen(false)} />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar (Fixed) */}
      <div className="hidden lg:flex lg:w-64 lg:shrink-0">
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center h-16 px-4 bg-white border-b border-slate-100 shrink-0">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-slate-500 hover:text-slate-900"
            aria-label="Menüyü Aç"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-4 font-bold text-slate-900">Admin Paneli</span>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
'use client';

import AdminSidebar from './AdminSidebar';

/**
 * Tüm admin sayfaları bu shell'i kullanır.
 * fixed inset-0 ile sitenin Navbar/Footer'ını tamamen örter.
 */
export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-40 flex bg-slate-50 overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

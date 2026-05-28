import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import FloatingActionButton from './FloatingActionButton';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1a1814]">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <main className="relative z-10">
        <Outlet />
      </main>

      <FloatingActionButton />
    </div>
  );
}

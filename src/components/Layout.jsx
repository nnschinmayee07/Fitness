import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import FloatingActionButton from './FloatingActionButton';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const activeSection = pathname.replace('/', '') || 'home';

  return (
    <div className="min-h-screen bg-dark-950 transition-colors duration-500">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blur-blob w-96 h-96 bg-purple-600 top-[-100px] left-[-100px] animate-blob" />
        <div className="blur-blob w-96 h-96 bg-cyan-600 top-1/3 right-[-100px] animate-blob-delay" />
      </div>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
      />

      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <main className="relative z-10">
        <Outlet />
      </main>

      <FloatingActionButton />
    </div>
  );
}

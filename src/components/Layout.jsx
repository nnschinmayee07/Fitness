import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import FloatingActionButton from './FloatingActionButton';
import ProfileMenu from './ProfileMenu';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const getUserInitials = () => {
    if (!user?.name) return '';
    return user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#1a1814]">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {user && <ProfileMenu initials={getUserInitials()} />}

      <main className="relative z-10">
        <Outlet />
      </main>

      <FloatingActionButton />
    </div>
  );
}

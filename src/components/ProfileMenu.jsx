import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, ChevronRight } from 'lucide-react';
import ProfileIcon from './ProfileIcon';

export default function ProfileMenu({ initials = 'U' }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const menuItems = [
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: LogOut, label: 'Logout', href: '/logout', isDanger: true },
  ];

  return (
    <div className="fixed top-6 right-6 z-40" ref={menuRef}>
      <ProfileIcon
        initials={initials}
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute top-14 right-0 mt-2 w-48 glass-card rounded-2xl shadow-lg overflow-hidden">
          <div className="p-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                    item.isDanger
                      ? 'text-red-400 hover:bg-red-500/20'
                      : 'text-[#D4B5A0] hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

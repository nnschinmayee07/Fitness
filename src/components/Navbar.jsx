import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Zap, Search, Bell } from 'lucide-react';
import GooeyNav from './GooeyNav';

const NAV_ITEMS = [
  { label: 'Home',          href: '/' },
  { label: 'Dashboard',     href: '/dashboard' },
  { label: 'Nutrition',     href: '/nutrition' },
  { label: 'Workouts',      href: '/workouts' },
  { label: 'AI Coach',      href: '/ai-coach' },
  { label: 'Community',     href: '/community' },
  { label: 'Smart Features', href: '/smart-features' },
  { label: 'Analytics',     href: '/analytics' },
];

export default function Navbar({ toggleSidebar }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Find active index - check specific routes first, then home
  const activeIndex = (() => {
    // First check all non-home routes
    const nonHomeIndex = NAV_ITEMS.findIndex(
      (item, idx) => idx > 0 && location.pathname.startsWith(item.href)
    );
    if (nonHomeIndex !== -1) return nonHomeIndex;
    
    // Then check if we're exactly on home
    if (location.pathname === '/') return 0;
    
    // Default to home if nothing matches
    return 0;
  })();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl bg-dark-900/80 border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              id="sidebar-toggle"
              onClick={toggleSidebar}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <NavLink to="/" className="flex items-center gap-2">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-neon-purple">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div className="absolute inset-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 blur-md opacity-50 animate-pulse" />
              </div>
              <span className="font-display font-bold text-xl">
                <span className="gradient-text">MyFitness</span>
                <span className="text-white">Pal</span>
              </span>
            </NavLink>
          </div>

          {/* GooeyNav — Desktop only */}
          <div className="hidden lg:flex items-center">
            <GooeyNav
              items={NAV_ITEMS}
              initialActiveIndex={activeIndex}
              particleCount={12}
              particleDistances={[70, 8]}
              particleR={80}
              animationTime={500}
              timeVariance={250}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 hidden sm:flex">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 relative hidden sm:flex">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            </button>
            <button
              id="nav-cta"
              onClick={() => navigate('/dashboard')}
              className="neon-btn text-sm px-4 py-2 hidden sm:flex"
            >
              <Zap className="w-4 h-4" />
              Start Tracking
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}

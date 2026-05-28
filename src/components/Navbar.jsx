import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Zap, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home',           href: '/' },
  { label: 'Dashboard',      href: '/dashboard' },
  { label: 'Nutrition',      href: '/nutrition' },
  { label: 'Workouts',       href: '/workouts' },
  { label: 'AI Coach',       href: '/ai-coach' },
  { label: 'Community',      href: '/community' },
  { label: 'Smart Features', href: '/smart-features' },
  { label: 'Analytics',      href: '/analytics' },
];

export default function Navbar({ toggleSidebar }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* ── Floating nav island ── */}
      <nav
        aria-label="Main navigation"
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300
          rounded-2xl px-6
          ${scrolled
            ? 'shadow-[0_8px_32px_rgba(43,43,43,0.14),0_1px_0_rgba(255,255,255,0.6)_inset]'
            : 'shadow-[0_4px_20px_rgba(43,43,43,0.08),0_1px_0_rgba(255,255,255,0.5)_inset]'
          }`}
        style={{
          backdropFilter: 'blur(30px) saturate(1.8) brightness(1.05)',
          WebkitBackdropFilter: 'blur(30px) saturate(1.8) brightness(1.05)',
          background: scrolled
            ? 'rgba(34,32,26,0.85)'
            : 'rgba(34,32,26,0.70)',
          border: '1px solid rgba(255,255,255,0.08)',
          maxWidth: 'calc(100vw - 2rem)',
          width: 'auto',
        }}
      >
        <div className="flex items-center justify-between h-14 gap-4 px-1">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#C97B63] flex items-center justify-center shadow-sm">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-base text-white">
              Fitness <span className="text-[#C97B63]">App</span>
            </span>
          </NavLink>

          {/* Desktop nav links */}
          <div className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {NAV_ITEMS.map(({ label, href }) => (
              <NavLink
                key={href}
                to={href}
                end={href === '/'}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap
                  ${isActive(href)
                    ? 'text-white bg-white/12 shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10 hover:shadow-sm'
                  }`}
              >
                {label}
                {isActive(href) && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C97B63]" />
                )}
              </NavLink>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              id="nav-cta"
              onClick={() => navigate('/dashboard')}
              className="hidden md:flex glass-btn"
            >
              <Zap className="w-3.5 h-3.5" />
              Start Tracking
            </button>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(prev => !prev)}
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 lg:hidden cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 pt-3 pb-4 mt-1">
            <div className="flex flex-col gap-0.5">
              {NAV_ITEMS.map(({ label, href }) => (
                <NavLink
                  key={href}
                  to={href}
                  end={href === '/'}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive(href)
                      ? 'text-white bg-white/12'
                      : 'text-white/60 hover:text-white hover:bg-white/8'
                    }`}
                >
                  {label}
                </NavLink>
              ))}
              <div className="pt-2 border-t border-white/10 mt-1">
                <button
                  onClick={() => { navigate('/dashboard'); setMobileOpen(false); }}
                  className="w-full flex items-center justify-center gap-1.5 bg-[#C97B63] hover:bg-[#b86b53] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors duration-200 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  Start Tracking
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

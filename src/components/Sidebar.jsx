import { NavLink } from 'react-router-dom';
import {
  X, Home, BarChart2, Utensils, Dumbbell, Bot, Users,
  Sparkles, TrendingUp, Zap, Settings, HelpCircle, LogOut
} from 'lucide-react';

const navItems = [
  { icon: Home,       label: 'Home',           path: '/' },
  { icon: BarChart2,  label: 'Live Dashboard', path: '/dashboard' },
  { icon: Utensils,   label: 'Nutrition',      path: '/nutrition' },
  { icon: Dumbbell,   label: 'Workouts',       path: '/workouts' },
  { icon: Bot,        label: 'AI Coach',       path: '/ai-coach',       badge: 'NEW' },
  { icon: Users,      label: 'Community',      path: '/community' },
  { icon: Sparkles,   label: 'Smart Features', path: '/smart-features' },
  { icon: TrendingUp, label: 'Analytics',      path: '/analytics' },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-72 z-50 transition-all duration-300 ease-in-out
          backdrop-blur-2xl border-r border-white/10
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(26,26,26,0.95)',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <NavLink to="/" className="flex items-center gap-2" onClick={onClose}>
              <div className="w-8 h-8 rounded-lg bg-[#C97B63] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl">
                <span className="solid-primary">MyFitness</span>
                <span className="text-[#F0F0F0]">Pal</span>
              </span>
            </NavLink>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#C9A889] hover:text-[#F5F5F5] hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Avatar */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#C97B63] flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#7A9A82] border-2 border-[#1A1A1A]" />
              </div>
              <div>
                <p className="font-semibold text-[#F5F5F5]">Alex Johnson</p>
                <p className="text-xs text-[#C9A889]">Pro Member · Day 47 🔥</p>
              </div>
            </div>
            {/* Stats row */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                { label: 'Streak', value: '47' },
                { label: 'Goals',  value: '12' },
                { label: 'Points', value: '2.4K' },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-xl py-2 px-1">
                  <p className="text-sm font-bold text-[#C97B63]">{stat.value}</p>
                  <p className="text-xs text-[#C9A889]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
            <p className="text-xs text-[#6B705C] font-semibold uppercase tracking-wider px-4 mb-2">
              Main
            </p>
            {navItems.map(({ icon: Icon, label, path, badge }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#C97B63] bg-[#C97B63]/10 border border-[#C97B63]/25'
                      : 'text-[#9B8B7E] hover:text-[#2B2B2B] hover:bg-black/5'
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium flex-1">{label}</span>
                {badge && (
                  <span className="badge-purple text-[10px] px-2 py-0.5">{badge}</span>
                )}
              </NavLink>
            ))}

            <div className="pt-4">
              <p className="text-xs text-[#6B705C] font-semibold uppercase tracking-wider px-4 mb-2">
                Account
              </p>
              <button className="sidebar-item w-full">
                <Settings className="w-5 h-5" />
                <span className="text-sm font-medium">Settings</span>
              </button>
              <button className="sidebar-item w-full">
                <HelpCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Help &amp; Support</span>
              </button>
              <button className="sidebar-item w-full text-[#C96363] hover:text-[#b05454]">
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </nav>

          {/* Upgrade Banner */}
          <div className="p-4">
            <div className="glass-card rounded-2xl p-4 overflow-hidden">
              <p className="font-semibold text-[#F5F5F5] text-sm">Upgrade to Pro</p>
              <p className="text-xs text-[#C9A889] mt-1">
                Unlock AI coaching, advanced analytics &amp; more
              </p>
              <button className="mt-3 w-full bg-[#C97B63] hover:bg-[#b86b53] text-white text-xs py-2.5 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer">
                <Zap className="w-3 h-3" />
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

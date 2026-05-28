import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Flame, Dumbbell, Droplets, Utensils, TrendingUp } from 'lucide-react';

const actions = [
  { icon: Utensils,   label: 'Log Meal',    bg: 'bg-[#C97B63]', route: '/nutrition', id: 'fab-meal' },
  { icon: Dumbbell,   label: 'Log Workout', bg: 'bg-[#6B705C]', route: '/workouts',  id: 'fab-workout' },
  { icon: Droplets,   label: 'Log Water',   bg: 'bg-[#6B705C]', route: '/dashboard', id: 'fab-water' },
  { icon: TrendingUp, label: 'Log Weight',  bg: 'bg-[#2B2B2B]', route: '/dashboard', id: 'fab-weight' },
  { icon: Flame,      label: 'View Stats',  bg: 'bg-[#C97B63]', route: '/analytics', id: 'fab-stats' },
];

export default function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleAction = (route) => {
    navigate(route);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col gap-2 items-end">
          {actions.map(({ icon: Icon, label, bg, route, id }, i) => (
            <div
              key={id}
              className="flex items-center gap-3 animate-slide-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="glass-card px-3 py-1.5 rounded-xl text-sm text-[#F5F5F5] font-medium whitespace-nowrap shadow-sm">
                {label}
              </span>
              <button
                id={id}
                onClick={() => handleAction(route)}
                className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shadow-sm hover:scale-110 transition-all duration-200 cursor-pointer hover:opacity-90`}
              >
                <Icon className="w-5 h-5 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        id="fab-main"
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer
          bg-[#C97B63] hover:bg-[#b86b53] hover:scale-110
          ${open ? 'rotate-45' : 'rotate-0'}`}
      >
        {open
          ? <X className="w-6 h-6 text-white" />
          : <Plus className="w-6 h-6 text-white" />
        }
      </button>

      {!open && (
        <div className="absolute inset-0 w-14 h-14 rounded-2xl bg-[#C97B63]/20 animate-ping pointer-events-none" />
      )}
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, X, Flame, Dumbbell, Droplets, Utensils, TrendingUp } from 'lucide-react';

const actions = [
  { icon: Utensils,   label: 'Log Meal',    color: 'from-purple-600 to-cyan-500',   route: '/nutrition', id: 'fab-meal' },
  { icon: Dumbbell,   label: 'Log Workout', color: 'from-cyan-600 to-purple-500',   route: '/workouts',  id: 'fab-workout' },
  { icon: Droplets,   label: 'Log Water',   color: 'from-purple-500 to-cyan-400',   route: '/dashboard', id: 'fab-water' },
  { icon: TrendingUp, label: 'Log Weight',  color: 'from-cyan-500 to-purple-400',   route: '/dashboard', id: 'fab-weight' },
  { icon: Flame,      label: 'View Stats',  color: 'from-purple-600 to-cyan-500',   route: '/analytics', id: 'fab-stats' },
];

export default function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAction = (route) => {
    navigate(route);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
      {/* Action buttons */}
      {open && (
        <div className="flex flex-col gap-2 items-end">
          {actions.map(({ icon: Icon, label, color, route, id }, i) => (
            <div
              key={id}
              className="flex items-center gap-3 animate-slide-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="glass-card px-3 py-1.5 rounded-xl text-sm text-white font-medium whitespace-nowrap shadow-card">
                {label}
              </span>
              <button
                id={id}
                onClick={() => handleAction(route)}
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200`}
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
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-neon-purple transition-all duration-300
          bg-gradient-to-br from-purple-600 to-cyan-500 hover:scale-110 hover:shadow-neon-cyan
          ${open ? 'rotate-45' : 'rotate-0'}`}
      >
        {open
          ? <X className="w-6 h-6 text-white" />
          : <Plus className="w-6 h-6 text-white" />
        }
      </button>

      {/* Pulse ring */}
      {!open && (
        <div className="absolute inset-0 w-14 h-14 rounded-2xl bg-purple-500/40 animate-ping pointer-events-none" />
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Dumbbell, Heart, Wind, Play, Pause, RotateCcw, Flame, Clock, Trophy, Zap, Calendar, CheckCircle } from 'lucide-react';

const categories = [
  { id: 'strength', label: 'Strength', icon: Dumbbell, color: 'from-purple-600 to-cyan-500',   calories: 420 },
  { id: 'cardio',   label: 'Cardio',   icon: Heart,    color: 'from-cyan-600 to-purple-500',   calories: 380 },
  { id: 'yoga',     label: 'Yoga',     icon: Wind,     color: 'from-purple-500 to-cyan-400',   calories: 180 },
  { id: 'running',  label: 'Running',  icon: Zap,      color: 'from-cyan-500 to-purple-400',   calories: 520 },
];

const weekSchedule = [
  { day: 'Mon', workout: 'Upper Body', done: true, cal: 420 },
  { day: 'Tue', workout: 'Cardio Run', done: true, cal: 380 },
  { day: 'Wed', workout: 'Rest Day', done: true, cal: 0 },
  { day: 'Thu', workout: 'Lower Body', done: true, cal: 480 },
  { day: 'Fri', workout: 'Yoga', done: false, cal: 180 },
  { day: 'Sat', workout: 'HIIT', done: false, cal: 550 },
  { day: 'Sun', workout: 'Rest Day', done: false, cal: 0 },
];

const exercises = [
  { name: 'Bench Press', sets: '4×10', weight: '80 kg', done: true },
  { name: 'Incline DB Press', sets: '3×12', weight: '28 kg', done: true },
  { name: 'Cable Fly', sets: '3×15', weight: '15 kg', done: false },
  { name: 'Tricep Pushdown', sets: '4×12', weight: '25 kg', done: false },
  { name: 'Overhead Press', sets: '3×10', weight: '60 kg', done: false },
];

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="glass-card p-5 text-center border border-purple-500/20">
      <h3 className="font-semibold text-white mb-4 flex items-center justify-center gap-2">
        <Clock className="w-4 h-4 text-purple-400" /> Exercise Timer
      </h3>
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r="52" fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth="8" />
          <circle cx="64" cy="64" r="52" fill="none" stroke="url(#timerGrad)" strokeWidth="8"
            strokeLinecap="round" strokeDasharray="326.7"
            strokeDashoffset={326.7 - (seconds % 60 / 60) * 326.7}
            style={{ transition: 'stroke-dashoffset 0.5s linear' }}
          />
          <defs>
            <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-black text-3xl text-white">{fmt(seconds)}</span>
          <span className="text-xs text-gray-500">elapsed</span>
        </div>
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={() => setRunning(!running)}
          className="neon-btn px-4 py-2 text-sm">
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => { setSeconds(0); setRunning(false); }}
          className="neon-btn-outline px-4 py-2 text-sm">
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
}

export default function WorkoutSection() {
  const [activeCategory, setActiveCategory] = useState('strength');
  const streak = 47;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="badge-purple mb-3 inline-flex"><Dumbbell className="w-3 h-3" /> Workouts</span>
          <h2 className="section-title">Your <span className="gradient-text">Fitness Journey</span></h2>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto">
            Structured programs, real-time tracking, and AI-powered workout recommendations
          </p>
        </div>

        {/* Streak Banner */}
        <div className="glass-card p-5 mb-8 border border-purple-500/20 bg-gradient-to-r from-purple-600/10 to-cyan-600/5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-2xl font-black text-white shadow-neon-purple">
                  🔥
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {streak}
                </div>
              </div>
              <div>
                <p className="font-display font-bold text-xl text-white">47-Day Streak!</p>
                <p className="text-gray-400 text-sm">You're on fire! Keep the momentum going 🚀</p>
              </div>
            </div>
            <div className="flex gap-6 flex-wrap">
              {[
                { icon: Trophy,   label: 'Best Streak', value: '62 days',    color: 'text-purple-400' },
                { icon: Flame,    label: 'This Week',   value: '3,240 kcal', color: 'text-cyan-400' },
                { icon: Dumbbell, label: 'Workouts',    value: '156 total',  color: 'text-purple-400' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="text-center">
                  <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
                  <p className="font-bold text-white text-sm">{value}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.map(({ id, label, icon: Icon, color, calories }) => (
            <button key={id} onClick={() => setActiveCategory(id)}
              className={`relative glass-card p-5 text-left transition-all duration-300 overflow-hidden group ${
                activeCategory === id ? 'border-purple-500/50 shadow-neon-purple scale-[1.02]' : 'hover:border-white/20'
              }`}>
              {activeCategory === id && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-600/10" />
              )}
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-white">{label}</p>
                <p className="text-xs text-gray-400 mt-1">{calories} kcal avg</p>
              </div>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Exercise list */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-purple-400" />
                  Today's Workout — Upper Body
                </h3>
                <span className="badge-purple">In Progress</span>
              </div>
              <div className="space-y-2">
                {exercises.map((ex, i) => (
                  <div key={i} className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-200 ${
                    ex.done ? 'border-green-500/30 bg-green-500/5' : 'border-white/10 hover:border-purple-500/30'
                  }`}>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      ex.done ? 'border-green-500 bg-green-500/20' : 'border-gray-600'
                    }`}>
                      {ex.done && <CheckCircle className="w-3.5 h-3.5 text-green-400" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${ex.done ? 'text-gray-400 line-through' : 'text-white'}`}>
                        {ex.name}
                      </p>
                      <p className="text-xs text-gray-500">{ex.sets} · {ex.weight}</p>
                    </div>
                    {!ex.done && (
                      <button className="px-3 py-1 rounded-lg bg-purple-600/20 text-purple-400 text-xs font-medium hover:bg-purple-600/40 transition-colors">
                        Log
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-400">Progress: <span className="text-white font-medium">2/5 exercises</span></p>
                <div className="flex-1 mx-4 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[40%] bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                </div>
                <span className="text-sm text-purple-400 font-medium">40%</span>
              </div>
            </div>

            {/* Weekly Schedule */}
            <div className="glass-card p-5">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" /> Weekly Schedule
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {weekSchedule.map(({ day, workout, done, cal }) => (
                  <div key={day} className={`text-center p-2 rounded-xl border transition-all duration-200 ${
                    done ? 'border-green-500/30 bg-green-500/5' : 'border-white/10 hover:border-purple-500/20'
                  }`}>
                    <p className="text-xs text-gray-500 mb-1">{day}</p>
                    <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center mb-1 ${
                      done ? 'bg-green-500/20' : 'bg-white/5'
                    }`}>
                      {done ? <CheckCircle className="w-4 h-4 text-green-400" /> : <div className="w-2 h-2 rounded-full bg-gray-600" />}
                    </div>
                    <p className="text-xs text-white font-medium leading-tight hidden sm:block">{workout}</p>
                    {cal > 0 && <p className="text-xs text-gray-600 mt-0.5 hidden sm:block">{cal}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <Timer />

            {/* Calories burned widget */}
            <div className="glass-card p-5 border border-purple-500/20">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Flame className="w-4 h-4 text-purple-400" /> Today's Burn
              </h3>
              <div className="text-center mb-4">
                <p className="font-display font-black text-4xl gradient-text">520</p>
                <p className="text-gray-400 text-sm">kcal burned</p>
              </div>
              {[
                { label: 'Exercise', value: 320, color: '#a855f7' },
                { label: 'NEAT',     value: 120, color: '#06b6d4' },
                { label: 'BMR',      value: 80,  color: 'rgba(168,85,247,0.4)' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-sm text-gray-400 flex-1">{s.label}</span>
                  <span className="text-sm text-white font-medium">{s.value} kcal</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

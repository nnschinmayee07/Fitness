import React, { useState, useEffect } from 'react';
import { Dumbbell, Heart, Wind, Play, Pause, RotateCcw, Flame, Clock, Trophy, Zap, Calendar, CheckCircle } from 'lucide-react';

const categories = [
  { id: 'strength', label: 'Strength', icon: Dumbbell, color: 'from-[#C97B63] to-[#DFD0C2]',   calories: 420 },
  { id: 'cardio',   label: 'Cardio',   icon: Heart,    color: 'from-[#6B705C] to-[#EFE6DD]',   calories: 380 },
  { id: 'yoga',     label: 'Yoga',     icon: Wind,     color: 'from-[#C97B63] to-[#EFE6DD]',   calories: 180 },
  { id: 'running',  label: 'Running',  icon: Zap,      color: 'from-[#6B705C] to-[#DFD0C2]',   calories: 520 },
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
    <div className="glass-card p-6 text-center border border-[#EFE6DD] shadow-sm">
      <h3 className="font-display font-bold text-[#F5F5F5] text-lg mb-4 flex items-center justify-center gap-3">
        <Clock className="w-5 h-5 text-[#C97B63]" /> Exercise Timer
      </h3>
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r="52" fill="none" stroke="rgba(201,123,99,0.08)" strokeWidth="8" />
          <circle cx="64" cy="64" r="52" fill="none" stroke="url(#timerGrad)" strokeWidth="8"
            strokeLinecap="round" strokeDasharray="326.7"
            strokeDashoffset={326.7 - (seconds % 60 / 60) * 326.7}
            style={{ transition: 'stroke-dashoffset 0.5s linear' }}
          />
          <defs>
            <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C97B63" />
              <stop offset="100%" stopColor="#6B705C" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-black text-3xl text-[#2B2B2B]">{fmt(seconds)}</span>
          <span className="text-xs text-[#9B8B7E]">elapsed</span>
        </div>
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={() => setRunning(!running)}
          className="neon-btn px-4 py-2 text-sm cursor-pointer">
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => { setSeconds(0); setRunning(false); }}
          className="neon-btn-outline px-4 py-2 text-sm cursor-pointer">
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
          <p className="text-[#D4B5A0] mt-3 max-w-xl mx-auto text-lg leading-relaxed font-medium">
            Structured programs, real-time tracking, and AI-powered workout recommendations tailored to your goals.
          </p>
        </div>

        {/* Streak Banner */}
        <div className="glass-card p-5 mb-8 border border-[#EFE6DD] bg-gradient-to-r from-[#C97B63]/10 to-[#6B705C]/5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C97B63] to-[#6B705C] flex items-center justify-center text-2xl font-black text-white shadow-sm">
                  🔥
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#C97B63] rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {streak}
                </div>
              </div>
              <div>
                <p className="font-display font-bold text-xl text-[#2B2B2B]">47-Day Streak!</p>
                <p className="text-[#9B8B7E] text-sm">You're on fire! Keep the momentum going 🚀</p>
              </div>
            </div>
            <div className="flex gap-6 flex-wrap">
              {[
                { icon: Trophy,   label: 'Best Streak', value: '62 days',    color: 'text-[#C97B63]' },
                { icon: Flame,    label: 'This Week',   value: '3,240 kcal', color: 'text-[#6B705C]' },
                { icon: Dumbbell, label: 'Workouts',    value: '156 total',  color: 'text-[#C97B63]' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="text-center font-sans">
                  <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
                  <p className="font-bold text-[#2B2B2B] text-sm">{value}</p>
                  <p className="text-xs text-[#9B8B7E]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.map(({ id, label, icon: Icon, color, calories }) => (
            <button key={id} onClick={() => setActiveCategory(id)}
              className={`relative glass-card p-5 text-left transition-all duration-300 overflow-hidden group cursor-pointer ${
                activeCategory === id ? 'border-[#C97B63]/50 shadow-md scale-[1.02]' : 'hover:border-black/10'
              }`}>
              {activeCategory === id && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#C97B63]/12 to-[#6B705C]/8" />
              )}
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-sm`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-[#2B2B2B]">{label}</p>
                <p className="text-xs text-[#9B8B7E] mt-1">{calories} kcal avg</p>
              </div>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Exercise list */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card p-6 border border-[#EFE6DD] shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-[#F5F5F5] text-lg flex items-center gap-3">
                  <Dumbbell className="w-5 h-5 text-[#C97B63]" />
                  Today's Workout — Upper Body
                </h3>
                <span className="badge-purple">In Progress</span>
              </div>
              <div className="space-y-2">
                {exercises.map((ex, i) => (
                  <div key={i} className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-200 ${
                    ex.done ? 'border-green-500/30 bg-green-500/5' : 'border-black/5 hover:border-[#C97B63]/30'
                  }`}>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      ex.done ? 'border-[#7A9A82] bg-[#7A9A82]/20' : 'border-gray-300'
                    }`}>
                      {ex.done && <CheckCircle className="w-3.5 h-3.5 text-[#7A9A82]" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${ex.done ? 'text-gray-400 line-through' : 'text-[#2B2B2B]'}`}>
                        {ex.name}
                      </p>
                      <p className="text-xs text-[#9B8B7E] font-sans">{ex.sets} · {ex.weight}</p>
                    </div>
                    {!ex.done && (
                      <button className="px-3 py-1 rounded-lg bg-[#C97B63]/15 text-[#C97B63] text-xs font-medium hover:bg-[#C97B63]/30 transition-colors cursor-pointer">
                        Log
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-[#9B8B7E]">Progress: <span className="text-[#2B2B2B] font-medium">2/5 exercises</span></p>
                <div className="flex-1 mx-4 h-2 bg-black/5 rounded-full overflow-hidden">
                  <div className="h-full w-[40%] bg-gradient-to-r from-[#C97B63] to-[#6B705C] rounded-full" />
                </div>
                <span className="text-sm text-[#C97B63] font-medium">40%</span>
              </div>
            </div>

            {/* Weekly Schedule */}
            <div className="glass-card p-6 border border-[#EFE6DD] shadow-sm">
              <h3 className="font-display font-bold text-[#F5F5F5] text-lg mb-4 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#6B705C]" /> Weekly Schedule
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {weekSchedule.map(({ day, workout, done, cal }) => (
                  <div key={day} className={`text-center p-2 rounded-xl border transition-all duration-200 ${
                    done ? 'border-green-500/30 bg-green-500/5' : 'border-black/5 hover:border-[#C97B63]/20'
                  }`}>
                    <p className="text-xs text-[#9B8B7E] mb-1">{day}</p>
                    <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center mb-1 ${
                      done ? 'bg-[#7A9A82]/20' : 'bg-black/5'
                    }`}>
                      {done ? <CheckCircle className="w-4 h-4 text-[#7A9A82]" /> : <div className="w-2 h-2 rounded-full bg-gray-300" />}
                    </div>
                    <p className="text-xs text-[#2B2B2B] font-medium leading-tight hidden sm:block">{workout}</p>
                    {cal > 0 && <p className="text-xs text-[#9B8B7E] mt-0.5 hidden sm:block font-sans">{cal}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <Timer />

            {/* Calories burned widget */}
            <div className="glass-card p-6 border border-[#EFE6DD] shadow-sm">
              <h3 className="font-display font-bold text-[#F5F5F5] text-lg mb-4 flex items-center gap-3">
                <Flame className="w-5 h-5 text-[#C97B63]" /> Today's Burn
              </h3>
              <div className="text-center mb-4">
                <p className="font-display font-black text-4xl gradient-text">520</p>
                <p className="text-[#9B8B7E] text-sm">kcal burned</p>
              </div>
              {[
                { label: 'Exercise', value: 320, color: '#C97B63' },
                { label: 'NEAT',     value: 120, color: '#6B705C' },
                { label: 'BMR',      value: 80,  color: 'rgba(201,123,99,0.4)' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-3 mb-2 font-sans">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-sm text-[#9B8B7E] flex-1">{s.label}</span>
                  <span className="text-sm text-[#2B2B2B] font-medium">{s.value} kcal</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef } from 'react';
import { ArrowRight, Play, TrendingUp, Flame, Zap, Star, Users, Award } from 'lucide-react';

const FloatingStat = ({ icon: Icon, label, value, color, delay = '' }) => (
  <div className={`glass-card px-4 py-3 flex items-center gap-3 animate-float ${delay}`}>
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
      <Icon className="w-4 h-4 text-white" />
    </div>
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-bold text-white text-sm">{value}</p>
    </div>
  </div>
);

export default function HeroSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated grid background */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Hero glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-blob-delay pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6 rounded-full">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">AI-Powered Fitness Platform</span>
              <span className="badge-purple">2026</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6">
              <span className="text-white">Track</span>{' '}
              <span className="gradient-text text-shadow-neon">Smarter.</span>
              <br />
              <span className="text-white">Train</span>{' '}
              <span className="gradient-text">Better.</span>
            </h1>

            <p className="text-gray-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              The world's most advanced AI fitness companion. Track nutrition, crush workouts, 
              and unlock your peak performance with personalized insights.
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-6 mb-8 justify-center lg:justify-start flex-wrap">
              {[
                { value: '10M+', label: 'Active users' },
                { value: '4.9★', label: 'App rating' },
                { value: '50K+', label: 'Food items' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display font-bold text-xl gradient-text">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                id="hero-start-tracking"
                onClick={() => scrollTo('dashboard')}
                className="neon-btn text-base px-8 py-4 group"
              >
                <Zap className="w-5 h-5" />
                Start Tracking
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                id="hero-explore-dashboard"
                onClick={() => scrollTo('dashboard')}
                className="neon-btn-outline text-base px-8 py-4 group"
              >
                <Play className="w-4 h-4 fill-current" />
                Explore Dashboard
              </button>
            </div>

            {/* Social proof avatars */}
            <div className="mt-8 flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {['#a855f7', '#06b6d4', '#a855f7', '#06b6d4', '#a855f7'].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-dark-950 flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: `linear-gradient(135deg, #a855f7, #06b6d4)` }}
                  >
                    {['A','B','C','D','E'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-xs text-gray-400">Loved by 10M+ fitness enthusiasts</p>
              </div>
            </div>
          </div>

          {/* Right: Dashboard Preview */}
          <div className="relative hidden lg:block">
            {/* Main card */}
            <div className="relative glass-card p-6 rounded-3xl border border-purple-500/20 shadow-neon-purple animate-float">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm text-gray-400">Good morning, Alex 👋</p>
                  <p className="font-display font-bold text-xl text-white">Today's Overview</p>
                </div>
                <div className="badge-green">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Live
                </div>
              </div>

              {/* Calorie ring */}
              <div className="flex items-center gap-6 mb-5">
                <div className="relative w-28 h-28">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="none"
                      stroke="url(#heroGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="251.3"
                      strokeDashoffset="251.3"
                      className="animate-progress-circle"
                      style={{ '--target-offset': '75' }}
                    />
                    <defs>
                      <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <p className="font-display font-bold text-xl text-white">1,847</p>
                    <p className="text-xs text-gray-400">/ 2,200 kcal</p>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  {[
                    { label: 'Protein', value: 142, max: 180, color: 'from-purple-500 to-purple-400' },
                    { label: 'Carbs', value: 195, max: 250, color: 'from-cyan-500 to-cyan-400' },
                    { label: 'Fat', value: 48, max: 70, color: 'from-blue-500 to-blue-400' },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">{m.label}</span>
                        <span className="text-white font-medium">{m.value}g</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${m.color} rounded-full animate-progress-bar`}
                          style={{ '--target-width': `${(m.value / m.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Flame,      label: 'Burned', value: '520 kcal', color: 'text-purple-400' },
                  { icon: TrendingUp, label: 'Steps',  value: '8,420',    color: 'text-cyan-400' },
                  { icon: Award,      label: 'Streak', value: '47 days',  color: 'text-purple-400' },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="glass-card p-3 text-center">
                    <Icon className={`w-4 h-4 ${color} mx-auto mb-1`} />
                    <p className="font-bold text-sm text-white">{value}</p>
                    <p className="text-xs text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-6 -right-6">
              <FloatingStat icon={Users} label="Community" value="10M+" color="bg-purple-600" />
            </div>
            <div className="absolute -bottom-8 -left-6 animate-float-delay">
              <FloatingStat icon={Flame} label="Calories burned" value="520 kcal" color="bg-orange-500" delay="animate-float-delay" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-purple-500 to-transparent" />
          <p className="text-xs text-gray-500">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
}

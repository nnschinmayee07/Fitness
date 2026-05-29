import React from 'react';
import { ArrowRight, Play, TrendingUp, Flame, Zap, Star, Award } from 'lucide-react';
import { FadeIn } from '../motion/FadeIn';
import { MotionButton } from '../motion/MotionButton';

export default function HeroSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-[#0F0F0F]">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6 rounded-full">
              <Zap className="w-4 h-4 text-[#C97B63]" />
              <span className="text-sm text-[#9B8B7E]">AI-Powered Fitness Platform</span>
              <span className="badge-purple">2026</span>
            </div>

            {/* Headline */}
            <FadeIn>
              <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6">
                <span className="text-[#F0F0F0]">Track</span>{' '}
                <span className="solid-primary">Smarter.</span>
                <br />
                <span className="text-[#F0F0F0]">Train</span>{' '}
                <span className="solid-primary">Better.</span>
              </h1>
            </FadeIn>

            <p className="text-[#D4B5A0] text-lg sm:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
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
                  <p className="font-display font-bold text-xl text-[#C97B63]">{s.value}</p>
                  <p className="text-xs text-[#C9A889]">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <MotionButton
                id="hero-start-tracking"
                onClick={() => scrollTo('dashboard')}
                className="primary-btn text-base px-8 py-4 group"
              >
                <Zap className="w-5 h-5" />
                Start Tracking
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </MotionButton>
              <MotionButton
                id="hero-explore-dashboard"
                variant="secondary"
                onClick={() => scrollTo('dashboard')}
                className="secondary-btn text-base px-8 py-4 group"
              >
                <Play className="w-4 h-4 fill-current" />
                Explore Dashboard
              </MotionButton>
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {['A','B','C','D','E'].map((letter, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center text-xs font-bold text-white shadow-sm"
                    style={{ background: i % 2 === 0 ? '#C97B63' : '#6B705C' }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-[#D4A373] fill-current" />)}
                </div>
                <p className="text-xs text-[#C9A889]">Loved by 10M+ fitness enthusiasts</p>
              </div>
            </div>
          </div>

          {/* Right: Dashboard Preview */}
          <div className="relative hidden lg:block">
            {/* Main card */}
            <div className="relative glass-card p-6 rounded-3xl shadow-card">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm text-[#D4B5A0]">Good morning, Alex 👋</p>
                  <p className="font-display font-bold text-xl text-[#F5F5F5]">Today's Overview</p>
                </div>
                <div className="badge-green">
                  <div className="w-2 h-2 bg-[#7A9A82] rounded-full animate-pulse" />
                  Live
                </div>
              </div>

              {/* Calorie ring */}
              <div className="flex items-center gap-6 mb-5">
                <div className="relative w-28 h-28 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(43,43,43,0.06)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="none"
                      stroke="#C97B63"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="251.3"
                      strokeDashoffset="251.3"
                      className="animate-progress-circle"
                      style={{ '--target-offset': '75' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <p className="font-display font-bold text-xl text-[#F5F5F5]">1,847</p>
                    <p className="text-xs text-[#C9A889]">/ 2,200 kcal</p>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  {[
                    { label: 'Protein', value: 142, max: 180, color: '#C97B63' },
                    { label: 'Carbs',   value: 195, max: 250, color: '#6B705C' },
                    { label: 'Fat',     value: 48,  max: 70,  color: '#D4A373' },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#D4B5A0]">{m.label}</span>
                        <span className="text-[#F5F5F5] font-medium">{m.value}g</span>
                      </div>
                      <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full animate-progress-bar"
                          style={{ '--target-width': `${(m.value / m.max) * 100}%`, background: m.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Flame,      label: 'Burned', value: '520 kcal', color: 'text-[#C97B63]' },
                  { icon: TrendingUp, label: 'Steps',  value: '8,420',    color: 'text-[#6B705C]' },
                  { icon: Award,      label: 'Streak', value: '47 days',  color: 'text-[#C97B63]' },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="glass-card rounded-xl p-3 text-center">
                    <Icon className={`w-4 h-4 ${color} mx-auto mb-1`} />
                    <p className="font-bold text-sm text-[#F5F5F5]">{value}</p>
                    <p className="text-xs text-[#C9A889]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300"
          style={{
            animation: 'float 3s ease-in-out infinite',
          }}>
          <div className="w-px h-8 bg-[#C97B63]/30" />
          <p className="text-xs text-[#C9A889]">Scroll to explore</p>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(8px); }
          }
        `}</style>
      </div>
    </section>
  );
}

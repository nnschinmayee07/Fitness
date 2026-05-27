import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Marathon Runner',
    avatar: '#a855f7',
    initials: 'SM',
    stars: 5,
    text: "MyFitnessPal completely transformed my training. The AI coach suggested tweaks to my nutrition that shaved 8 minutes off my marathon time. The analytics dashboard is incredibly insightful!",
    stat: '-8 min marathon time',
    emoji: '🏃‍♀️',
  },
  {
    name: 'James Rodriguez',
    role: 'Fitness Enthusiast',
    avatar: '#06b6d4',
    initials: 'JR',
    stars: 5,
    text: "Lost 22kg in 6 months using the meal tracking and workout planner. The calorie ring keeps me accountable every day. The design is gorgeous — feels like using software from the future!",
    stat: '-22kg in 6 months',
    emoji: '💪',
  },
  {
    name: 'Emma Chen',
    role: 'Yoga Instructor',
    avatar: '#10b981',
    initials: 'EC',
    stars: 5,
    text: "The mood tracker and recovery insights are game-changing. I recommend this app to all my students. The AI nutrition recommendations are spot-on for plant-based athletes!",
    stat: '94% goal completion',
    emoji: '🧘‍♀️',
  },
  {
    name: 'Marcus Johnson',
    role: 'Bodybuilder',
    avatar: '#f59e0b',
    initials: 'MJ',
    stars: 5,
    text: "The macro tracking is the best I've ever used. The protein breakdown, meal timing insights, and weekly analytics charts help me optimize every aspect of my prep. Absolutely elite.",
    stat: '+12kg muscle gained',
    emoji: '🏋️',
  },
  {
    name: 'Priya Sharma',
    role: 'Nutritionist',
    avatar: '#ec4899',
    initials: 'PS',
    stars: 5,
    text: "As a nutritionist, I recommend this to all my clients. The macro pie chart, hydration tracker, and AI meal recommendations are clinically sound and presented beautifully.",
    stat: '200+ clients helped',
    emoji: '🥗',
  },
  {
    name: 'Alex Thompson',
    role: 'CrossFit Athlete',
    avatar: '#3b82f6',
    initials: 'AT',
    stars: 5,
    text: "The workout streak tracker and community challenges push me every single day. Hit a 89-day streak and the leaderboard keeps me competing. Best fitness app by miles!",
    stat: '89-day streak',
    emoji: '⚡',
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  const visibleCount = 3;
  const maxIndex = testimonials.length - visibleCount;

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
      }, 3500);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying, maxIndex]);

  const go = (dir) => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => {
      const next = prev + dir;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
  };

  const visible = [
    testimonials[currentIndex % testimonials.length],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />

      {/* Decorative orbs */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <span className="badge-cyan mb-3 inline-flex"><Star className="w-3 h-3 fill-current" /> Testimonials</span>
          <h2 className="section-title">Loved by <span className="gradient-text">Millions</span></h2>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto">
            Join 10 million people who've transformed their health with MyFitnessPal
          </p>

          {/* Stars summary */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-white font-bold">4.9 / 5</span>
            <span className="text-gray-500 text-sm">from 1.2M+ reviews</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((t, i) => (
              <div key={`${currentIndex}-${i}`}
                className="glass-card p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-500 flex flex-col group">
                {/* Quote icon */}
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                  <Quote className="w-5 h-5 text-purple-400" />
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-5">"{t.text}"</p>

                {/* Stat badge */}
                <div className="inline-flex items-center gap-2 glass-card px-3 py-2 rounded-xl mb-4 w-fit">
                  <span className="text-lg">{t.emoji}</span>
                  <span className="text-xs font-semibold gradient-text">{t.stat}</span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${t.avatar}, ${t.avatar}99)` }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={() => go(-1)}
              className="w-10 h-10 rounded-xl glass-card border border-white/10 hover:border-purple-500/40 flex items-center justify-center text-gray-400 hover:text-white transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentIndex(Math.min(i, maxIndex)); setIsAutoPlaying(false); }}
                  className={`transition-all duration-300 rounded-full ${
                    i >= currentIndex && i < currentIndex + visibleCount
                      ? 'w-6 h-2 bg-gradient-to-r from-purple-500 to-cyan-500'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button onClick={() => go(1)}
              className="w-10 h-10 rounded-xl glass-card border border-white/10 hover:border-purple-500/40 flex items-center justify-center text-gray-400 hover:text-white transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: '10M+', label: 'Active Users', emoji: '👥' },
            { value: '4.9★', label: 'App Store Rating', emoji: '⭐' },
            { value: '50K+', label: 'Food Database', emoji: '🥗' },
            { value: '#1', label: 'Fitness App 2026', emoji: '🏆' },
          ].map((t) => (
            <div key={t.label} className="glass-card p-5 text-center hover:border-purple-500/30 transition-all duration-300 group">
              <div className="text-3xl mb-2">{t.emoji}</div>
              <p className="font-display font-black text-2xl gradient-text">{t.value}</p>
              <p className="text-xs text-gray-500 mt-1">{t.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Marathon Runner',
    avatarBg: '#C97B63',
    initials: 'SM',
    stars: 5,
    text: "MyFitnessPal completely transformed my training. The AI coach suggested tweaks to my nutrition that shaved 8 minutes off my marathon time. The analytics dashboard is incredibly insightful!",
    stat: '-8 min marathon time',
  },
  {
    name: 'James Rodriguez',
    role: 'Fitness Enthusiast',
    avatarBg: '#6B705C',
    initials: 'JR',
    stars: 5,
    text: "Lost 22kg in 6 months using the meal tracking and workout planner. The calorie ring keeps me accountable every day. The design is gorgeous — feels like software from the future!",
    stat: '-22kg in 6 months',
  },
  {
    name: 'Emma Chen',
    role: 'Yoga Instructor',
    avatarBg: '#7A9A82',
    initials: 'EC',
    stars: 5,
    text: "The mood tracker and recovery insights are game-changing. I recommend this app to all my students. The AI nutrition recommendations are spot‑on for plant‑based athletes!",
    stat: '94% goal completion',
  },
  {
    name: 'Marcus Johnson',
    role: 'Bodybuilder',
    avatarBg: '#D4A373',
    initials: 'MJ',
    stars: 5,
    text: "The macro tracking is the best I've ever used. The protein breakdown, meal timing insights, and weekly analytics charts help me optimize every aspect of my prep. Absolutely elite.",
    stat: '+12kg muscle gained',
  },
  {
    name: 'Priya Sharma',
    role: 'Nutritionist',
    avatarBg: '#A89F91',
    initials: 'PS',
    stars: 5,
    text: "As a nutritionist, I recommend this to all my clients. The macro pie chart, hydration tracker, and AI meal recommendations are clinically sound and presented beautifully.",
    stat: '200+ clients helped',
  },
  {
    name: 'Alex Thompson',
    role: 'CrossFit Athlete',
    avatarBg: '#2B2B2B',
    initials: 'AT',
    stars: 5,
    text: "The workout streak tracker and community challenges push me every single day. Hit an 89‑day streak and the leaderboard keeps me competing. Best fitness app by miles!",
    stat: '89‑day streak',
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
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#22201a]">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <span className="badge-cyan mb-3 inline-flex"><Star className="w-3 h-3 fill-current" /> Testimonials</span>
          <h2 className="section-title">Loved by <span className="solid-primary">Millions</span></h2>
          <p className="text-[#D4B5A0] mt-2 max-w-xl mx-auto">
            Join 10 million people who've transformed their health with MyFitnessPal
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 text-[#D4A373] fill-current" />
              ))}
            </div>
            <span className="text-[#F5F5F5] font-bold">4.9 / 5</span>
            <span className="text-[#C9A889] text-sm">from 1.2M+ reviews</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((t, i) => (
              <div key={`${currentIndex}-${i}`}
                className="glass-card p-6 hover:border-[#C97B63]/40 transition-all duration-500 flex flex-col group shadow-lg">
                {/* Quote icon */}
                <div className="w-10 h-10 rounded-xl bg-[#C97B63]/10 flex items-center justify-center mb-4">
                  <Quote className="w-5 h-5 text-[#C97B63]" />
                </div>
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 text-[#D4A373] fill-current" />
                  ))}
                </div>
                {/* Text */}
                <p className="text-[#D4B5A0] text-sm leading-relaxed flex-1 mb-5 font-sans">{t.text}</p>
                {/* Stat badge */}
                <div className="inline-flex items-center gap-2 glass-card border px-4 py-2.5 rounded-xl mb-4 w-fit">
                  <span className="text-xs font-semibold text-[#C97B63]">{t.stat}</span>
                </div>
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                    style={{ background: t.avatarBg }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-[#F5F5F5] text-sm">{t.name}</p>
                    <p className="text-xs text-[#C9A889]">{t.role}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-2 h-2 rounded-full bg-[#7A9A82] animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={() => go(-1)}
              className="w-10 h-10 rounded-xl glass-card border border-black/6 hover:border-[#C97B63]/40 flex items-center justify-center text-[#9B8B7E] hover:text-[#2B2B2B] transition-all cursor-pointer">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentIndex(Math.min(i, maxIndex)); setIsAutoPlaying(false); }}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    i >= currentIndex && i < currentIndex + visibleCount
                      ? 'w-6 h-2 bg-[#C97B63]'
                      : 'w-2 h-2 bg-black/15 hover:bg-black/25'
                  }`}
                />
              ))}
            </div>
            <button onClick={() => go(1)}
              className="w-10 h-10 rounded-xl glass-card border border-black/6 hover:border-[#C97B63]/40 flex items-center justify-center text-[#9B8B7E] hover:text-[#2B2B2B] transition-all cursor-pointer">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: '10M+', label: 'Active Users' },
            { value: '4.9★', label: 'App Store Rating' },
            { value: '50K+', label: 'Food Database' },
            { value: '#1',   label: 'Fitness App 2026' },
          ].map(t => (
            <div key={t.label} className="glass-card glass-card-hover p-6 text-center shadow-lg">
              <p className="font-display font-black text-3xl text-[#C97B63] mb-2">{t.value}</p>
              <p className="text-xs text-[#C9A889] uppercase tracking-wide font-semibold">{t.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

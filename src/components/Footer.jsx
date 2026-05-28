import React, { useState } from 'react';
import { Zap, AtSign, Camera, Video, Briefcase, Globe, Mail, ArrowRight, Apple, Play } from 'lucide-react';

const footerLinks = {
  Product: ['Dashboard', 'Meal Tracking', 'Workout Planner', 'AI Coach', 'Analytics', 'Community'],
  Company: ['About Us', 'Blog', 'Careers', 'Press', 'Partners', 'Contact'],
  Support: ['Help Center', 'Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility', 'Status'],
  Features: ['Calorie Counter', 'Macro Tracker', 'Exercise Log', 'Food Database', 'BMI Calculator', 'Water Tracker'],
};

const socials = [
  { icon: AtSign,    label: 'Twitter / X' },
  { icon: Camera,    label: 'Instagram' },
  { icon: Video,     label: 'YouTube' },
  { icon: Briefcase, label: 'LinkedIn' },
  { icon: Globe,     label: 'Website' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="relative border-t border-white/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#C97B63] flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-2xl">
                <span className="solid-primary">MyFitness</span>
                <span className="text-[#F0F0F0]">Pal</span>
              </span>
            </div>

            <p className="text-[#D4B5A0] text-sm leading-relaxed mb-6 max-w-xs">
              The world's most advanced AI-powered fitness and nutrition platform.
              Track smarter, train better, live healthier.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mb-8">
              {socials.map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-9 h-9 glass-card rounded-xl flex items-center justify-center text-[#D4B5A0] hover:text-[#C97B63] hover:border-[#C97B63]/40 transition-all duration-200 hover:scale-110">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* App download */}
            <div className="space-y-2">
              <p className="text-xs text-[#6B705C] mb-3 uppercase tracking-wider font-semibold">Download App</p>
              <div className="flex gap-3 flex-wrap">
                <button id="download-ios"
                  className="flex items-center gap-2 glass-card px-4 py-2.5 rounded-xl hover:border-[#C97B63]/40 transition-all duration-200 group">
                  <Apple className="w-5 h-5 text-[#D4B5A0] group-hover:text-[#C97B63]" />
                  <div className="text-left">
                    <p className="text-xs text-[#C9A889]">Download on</p>
                    <p className="text-sm font-semibold text-[#F5F5F5] leading-tight">App Store</p>
                  </div>
                </button>
                <button id="download-android"
                  className="flex items-center gap-2 glass-card px-4 py-2.5 rounded-xl hover:border-[#C97B63]/40 transition-all duration-200 group">
                  <Play className="w-5 h-5 text-[#D4B5A0] group-hover:text-[#C97B63] fill-current" />
                  <div className="text-left">
                    <p className="text-xs text-[#C9A889]">Get it on</p>
                    <p className="text-sm font-semibold text-[#F5F5F5] leading-tight">Google Play</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold text-[#F5F5F5] mb-4 text-sm">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map(link => (
                    <li key={link}>
                      <a href="#"
                        className="text-sm text-[#C9A889] hover:text-[#C97B63] transition-colors duration-200">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="glass-card rounded-2xl p-6 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <h3 className="font-display font-bold text-xl text-[#F0F0F0] mb-1">
                Get Weekly <span className="solid-primary">Fitness Insights</span>
              </h3>
              <p className="text-sm text-[#C9A889]">Join 500K+ subscribers. Expert tips, new features, and motivation every week.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3 w-full sm:w-auto">
              {subscribed ? (
                <div className="flex items-center gap-2 text-[#7A9A82] font-medium">
                  <span className="text-xl">✓</span> You're subscribed!
                </div>
              ) : (
                <>
                  <div className="relative flex-1 sm:w-64">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#606060]" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="input-field pl-10 py-3 text-sm"
                      id="newsletter-email"
                    />
                  </div>
                  <button type="submit" id="newsletter-subscribe"
                    className="primary-btn px-5 py-3 text-sm whitespace-nowrap">
                    Subscribe <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <p className="text-sm text-[#C9A889]">
            © 2026 MyFitnessPal, Inc. All rights reserved. Built for a healthier world.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies', 'Sitemap'].map(link => (
              <a key={link} href="#" className="text-xs text-[#C9A889] hover:text-[#C97B63] transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import { Zap, AtSign, Camera, Video, Briefcase, Globe, Mail, ArrowRight, Apple, Play } from 'lucide-react';

const footerLinks = {
  Product: ['Dashboard', 'Meal Tracking', 'Workout Planner', 'AI Coach', 'Analytics', 'Community'],
  Company: ['About Us', 'Blog', 'Careers', 'Press', 'Partners', 'Contact'],
  Support: ['Help Center', 'Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility', 'Status'],
  Features: ['Calorie Counter', 'Macro Tracker', 'Exercise Log', 'Food Database', 'BMI Calculator', 'Water Tracker'],
};

const socials = [
  { icon: AtSign,    label: 'Twitter / X', color: 'hover:text-purple-400' },
  { icon: Camera,    label: 'Instagram',   color: 'hover:text-cyan-400' },
  { icon: Video,     label: 'YouTube',     color: 'hover:text-purple-400' },
  { icon: Briefcase, label: 'LinkedIn',    color: 'hover:text-cyan-400' },
  { icon: Globe,     label: 'Website',     color: 'hover:text-gray-300' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="relative border-t border-white/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-neon-purple">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 blur-md opacity-40" />
              </div>
              <span className="font-display font-bold text-2xl">
                <span className="gradient-text">MyFitness</span>
                <span className="text-white">Pal</span>
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              The world's most advanced AI-powered fitness and nutrition platform. 
              Track smarter, train better, live healthier.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mb-8">
              {socials.map(({ icon: Icon, label, color }) => (
                <a key={label} href="#" aria-label={label}
                  className={`w-9 h-9 glass-card rounded-xl flex items-center justify-center text-gray-500 ${color} transition-all duration-200 hover:scale-110`}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* App download */}
            <div className="space-y-2">
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-semibold">Download App</p>
              <div className="flex gap-3 flex-wrap">
                <button id="download-ios"
                  className="flex items-center gap-2 glass-card px-4 py-2.5 rounded-xl hover:border-purple-500/30 transition-all duration-200 group">
                  <Apple className="w-5 h-5 text-gray-300 group-hover:text-white" />
                  <div className="text-left">
                    <p className="text-xs text-gray-500">Download on</p>
                    <p className="text-sm font-semibold text-white leading-tight">App Store</p>
                  </div>
                </button>
                <button id="download-android"
                  className="flex items-center gap-2 glass-card px-4 py-2.5 rounded-xl hover:border-purple-500/30 transition-all duration-200 group">
                  <Play className="w-5 h-5 text-gray-300 group-hover:text-white fill-current" />
                  <div className="text-left">
                    <p className="text-xs text-gray-500">Get it on</p>
                    <p className="text-sm font-semibold text-white leading-tight">Google Play</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold text-white mb-4 text-sm">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map(link => (
                    <li key={link}>
                      <a href="#"
                        className="text-sm text-gray-500 hover:text-purple-400 transition-colors duration-200">
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
        <div className="glass-card p-6 mb-10 border border-purple-500/20 bg-gradient-to-r from-purple-600/10 to-cyan-600/5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <h3 className="font-display font-bold text-xl text-white mb-1">
                Get Weekly <span className="gradient-text">Fitness Insights</span>
              </h3>
              <p className="text-sm text-gray-400">Join 500K+ subscribers. Expert tips, new features, and motivation every week.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3 w-full sm:w-auto">
              {subscribed ? (
                <div className="flex items-center gap-2 text-green-400 font-medium">
                  <span className="text-xl">✓</span> You're subscribed! 🎉
                </div>
              ) : (
                <>
                  <div className="relative flex-1 sm:w-64">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="input-dark pl-10 py-3 text-sm"
                      id="newsletter-email"
                    />
                  </div>
                  <button type="submit" id="newsletter-subscribe"
                    className="neon-btn px-5 py-3 text-sm whitespace-nowrap">
                    Subscribe <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <p className="text-sm text-gray-600">
            © 2026 MyFitnessPal, Inc. All rights reserved. Built with ❤️ for a healthier world.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies', 'Sitemap'].map(link => (
              <a key={link} href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

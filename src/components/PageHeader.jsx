import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PageHeader({
  title,
  subtitle,
  icon: Icon,
  badge,
  accentColor = 'primary',
}) {
  const iconBg = accentColor === 'secondary' ? 'bg-[#6B705C]' : 'bg-[#C97B63]';

  return (
    <div className="relative pt-28 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#C97B63] opacity-40" />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-1.5 text-sm text-[#C9A889] mb-7"
          aria-label="Breadcrumb"
        >
          <Link
            to="/"
            className="hover:text-[#C97B63] transition-colors flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#6B705C]" />
          <span className="text-[#F5F5F5] font-medium">{title}</span>
        </motion.nav>

        {/* Icon + Heading row */}
        <div className="flex items-start gap-5">
          {Icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              className="flex-shrink-0"
            >
              <div className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center shadow-sm`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          )}

          <div>
            {badge && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="badge-purple mb-2 inline-flex"
              >
                {badge}
              </motion.span>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.5 }}
              className="font-display font-bold text-4xl md:text-5xl text-[#F0F0F0] leading-tight"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.4 }}
                className="text-[#D4B5A0] mt-2 text-lg max-w-2xl"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          className="mt-8 h-px bg-white/10 origin-left"
        />
      </div>
    </div>
  );
}

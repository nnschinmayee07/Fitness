import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PageHeader({
  title,
  subtitle,
  icon: Icon,
  gradient = 'from-purple-400 to-cyan-400',
  badge,
  accentColor = 'purple', // 'purple' or 'cyan'
}) {
  const borderColors = {
    purple: 'from-purple-500/60 via-purple-500/30 to-transparent',
    cyan: 'from-cyan-500/60 via-cyan-500/30 to-transparent',
  };

  return (
    <div className="relative pt-28 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Top accent line with gradient matching page theme */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${borderColors[accentColor]}`} />

      {/* Radial glow behind title */}
      <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-[600px] h-40 ${accentColor === 'purple' ? 'bg-purple-600/10' : 'bg-cyan-600/10'} blur-3xl rounded-full pointer-events-none`} />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-1.5 text-sm text-gray-500 mb-7"
          aria-label="Breadcrumb"
        >
          <Link
            to="/"
            className="hover:text-purple-400 transition-colors flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-gray-300 font-medium">{title}</span>
        </motion.nav>

        {/* Icon + Heading row */}
        <div className="flex items-start gap-5">
          {Icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              className="relative flex-shrink-0"
            >
              <div className={`w-16 h-16 rounded-2xl ${accentColor === 'purple' ? 'bg-gradient-to-br from-purple-600 to-cyan-500' : 'bg-gradient-to-br from-cyan-600 to-purple-500'} flex items-center justify-center shadow-neon-purple`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className={`absolute inset-0 w-16 h-16 rounded-2xl ${accentColor === 'purple' ? 'bg-gradient-to-br from-purple-600 to-cyan-500' : 'bg-gradient-to-br from-cyan-600 to-purple-500'} blur-lg opacity-40`} />
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
              className={`font-display font-bold text-4xl md:text-5xl bg-gradient-to-r ${gradient} bg-clip-text text-transparent leading-tight`}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.4 }}
                className="text-gray-400 mt-2 text-lg max-w-2xl"
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
          className="mt-8 h-px bg-gradient-to-r from-purple-500/40 via-cyan-500/20 to-transparent origin-left"
        />
      </div>
    </div>
  );
}

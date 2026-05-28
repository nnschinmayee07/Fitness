import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FadeIn } from '../motion/FadeIn';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1814] flex items-center justify-center px-4">
      <FadeIn>
        <div className="w-full max-w-md glass-card p-8 rounded-3xl">
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-5">
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-lg bg-[#C97B63] flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Fitness<span className="text-[#C97B63]">andi</span>
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <h1 className="font-display font-bold text-3xl text-[#F5F5F5] mb-2">
                Sign In
              </h1>
              <p className="text-[#D4B5A0] text-sm">
                Welcome back to your fitness journey
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-[#F5F5F5] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="you@example.com"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-[#F5F5F5] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
              </motion.div>

              {error && (
                <motion.div variants={itemVariants} className="p-3 rounded-xl bg-[#C96363]/15 border border-[#C96363]/30 text-[#C96363] text-sm">
                  {error}
                </motion.div>
              )}

              <motion.button
                variants={itemVariants}
                type="submit"
                className="primary-btn w-full justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Zap className="w-4 h-4" />
                Sign In
              </motion.button>
            </form>

            <motion.div variants={itemVariants} className="mt-8 text-center">
              <p className="text-[#D4B5A0] text-sm">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-[#C97B63] font-semibold hover:text-[#b86b53] transition-colors"
                >
                  Create one
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </FadeIn>
    </div>
  );
}

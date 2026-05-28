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

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const result = await register(name, email, password);
    if (result.success) {
      navigate('/onboarding');
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
                Create Account
              </h1>
              <p className="text-[#D4B5A0] text-sm">
                Join millions tracking their fitness journey
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-[#F5F5F5] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  placeholder="John Doe"
                  required
                />
              </motion.div>

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

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-[#F5F5F5] mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                Create Account
              </motion.button>
            </form>

            <motion.div variants={itemVariants} className="mt-8 text-center">
              <p className="text-[#D4B5A0] text-sm">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-[#C97B63] font-semibold hover:text-[#b86b53] transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </FadeIn>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Calendar, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FadeIn } from '../motion/FadeIn';

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const joinedDate = new Date(user.joinedAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#1a1814] pt-24">
      <div className="max-w-2xl mx-auto px-4 pb-16">
        <FadeIn>
          {/* Header Card */}
          <div className="glass-card p-8 rounded-3xl mb-6">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 rounded-full bg-[#C97B63] flex items-center justify-center">
                <span className="font-display font-black text-3xl text-white">
                  {initials}
                </span>
              </div>
              <div className="flex-1">
                <h1 className="font-display font-bold text-3xl text-[#F5F5F5]">
                  {user.name}
                </h1>
                <p className="text-[#D4B5A0]">{user.email}</p>
                <div className="flex items-center gap-2 mt-2 text-[#C9A889] text-sm">
                  <Calendar className="w-4 h-4" />
                  Joined {joinedDate}
                </div>
              </div>
            </div>

            {user.isOnboarded ? (
              <div className="inline-flex items-center gap-2 bg-[#7A9A82]/20 border border-[#7A9A82]/40 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-[#7A9A82] rounded-full" />
                <span className="text-[#7A9A82] font-semibold text-sm">Profile Complete</span>
              </div>
            ) : (
              <button
                onClick={() => navigate('/onboarding')}
                className="secondary-btn text-sm"
              >
                Complete Profile
              </button>
            )}
          </div>

          {/* Fitness Profile */}
          {user.isOnboarded && (
            <>
              {/* Goal */}
              {user.profile.goal && (
                <div className="glass-card p-6 rounded-2xl mb-4">
                  <h2 className="font-semibold text-[#F5F5F5] mb-3 text-sm uppercase text-[#C9A889]">
                    Fitness Goal
                  </h2>
                  <div className="inline-flex items-center gap-2 bg-[#C97B63]/20 border border-[#C97B63]/30 px-4 py-2 rounded-full">
                    <Zap className="w-4 h-4 text-[#C97B63]" />
                    <span className="text-[#C97B63] font-semibold">{user.profile.goal}</span>
                  </div>
                </div>
              )}

              {/* Body Stats */}
              {user.profile.stats.age && (
                <div className="glass-card p-6 rounded-2xl mb-4">
                  <h2 className="font-semibold text-[#F5F5F5] mb-4 text-sm uppercase text-[#C9A889]">
                    Body Stats
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-black/20 rounded-xl p-4">
                      <p className="text-[#C9A889] text-xs mb-1">Age</p>
                      <p className="text-[#F5F5F5] font-bold text-lg">
                        {user.profile.stats.age}
                      </p>
                    </div>
                    <div className="bg-black/20 rounded-xl p-4">
                      <p className="text-[#C9A889] text-xs mb-1">Height</p>
                      <p className="text-[#F5F5F5] font-bold text-lg">
                        {user.profile.stats.height} cm
                      </p>
                    </div>
                    <div className="bg-black/20 rounded-xl p-4">
                      <p className="text-[#C9A889] text-xs mb-1">Current Weight</p>
                      <p className="text-[#F5F5F5] font-bold text-lg">
                        {user.profile.stats.weight} kg
                      </p>
                    </div>
                    <div className="bg-black/20 rounded-xl p-4">
                      <p className="text-[#C9A889] text-xs mb-1">Target Weight</p>
                      <p className="text-[#F5F5F5] font-bold text-lg">
                        {user.profile.stats.targetWeight} kg
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Lifestyle */}
              <div className="glass-card p-6 rounded-2xl mb-4">
                <h2 className="font-semibold text-[#F5F5F5] mb-4 text-sm uppercase text-[#C9A889]">
                  Lifestyle
                </h2>
                <div className="space-y-3">
                  {user.profile.activityLevel && (
                    <div className="flex items-center justify-between bg-black/20 rounded-xl p-4">
                      <span className="text-[#D4B5A0]">Activity Level</span>
                      <span className="font-semibold text-[#C97B63]">
                        {user.profile.activityLevel}
                      </span>
                    </div>
                  )}
                  {user.profile.diet && (
                    <div className="flex items-center justify-between bg-black/20 rounded-xl p-4">
                      <span className="text-[#D4B5A0]">Diet Preference</span>
                      <span className="font-semibold text-[#C97B63]">
                        {user.profile.diet}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats (Demo) */}
              <div className="glass-card p-6 rounded-2xl">
                <h2 className="font-semibold text-[#F5F5F5] mb-4 text-sm uppercase text-[#C9A889]">
                  Your Stats
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-black/20 rounded-xl p-4 text-center">
                    <p className="text-[#C9A889] text-xs mb-1">Streak</p>
                    <p className="text-[#F5F5F5] font-bold text-xl">0</p>
                    <p className="text-[#9B8B7E] text-xs">days</p>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4 text-center">
                    <p className="text-[#C9A889] text-xs mb-1">Goals</p>
                    <p className="text-[#F5F5F5] font-bold text-xl">0</p>
                    <p className="text-[#9B8B7E] text-xs">completed</p>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4 text-center">
                    <p className="text-[#C9A889] text-xs mb-1">Points</p>
                    <p className="text-[#F5F5F5] font-bold text-xl">0</p>
                    <p className="text-[#9B8B7E] text-xs">earned</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </FadeIn>
      </div>
    </div>
  );
}

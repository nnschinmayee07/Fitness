import React, { useState } from 'react';
import { Users, Trophy, Flame, Star, Crown, Medal, Target, TrendingUp, Award } from 'lucide-react';

const challenges = [
  { title: '30-Day Protein Challenge', emoji: '💪', participants: 4280, daysLeft: 12, progress: 60, reward: '500 pts', color: 'from-[#C97B63] to-[#DFD0C2]' },
  { title: '10K Steps Daily',          emoji: '👟', participants: 8950, daysLeft: 5,  progress: 80, reward: '300 pts', color: 'from-[#6B705C] to-[#EFE6DD]' },
  { title: 'Hydration Hero',           emoji: '💧', participants: 6120, daysLeft: 18, progress: 40, reward: '250 pts', color: 'from-[#C97B63] to-[#EFE6DD]' },
  { title: 'HIIT Warriors',            emoji: '🔥', participants: 3340, daysLeft: 8,  progress: 70, reward: '600 pts', color: 'from-[#6B705C] to-[#DFD0C2]' },
];

const leaderboard = [
  { rank: 1, name: 'Sarah M.', points: 12480, streak: 89, avatar: '#C97B63', badge: '👑' },
  { rank: 2, name: 'James K.', points: 11920, streak: 74, avatar: '#6B705C', badge: '🥈' },
  { rank: 3, name: 'Emma R.', points: 11205, streak: 62, avatar: '#D4A373', badge: '🥉' },
  { rank: 4, name: 'Alex J. (You)', points: 9840, streak: 47, avatar: '#7A9A82', badge: '⭐', isYou: true },
  { rank: 5, name: 'Chris T.', points: 9120, streak: 38, avatar: '#A89F91', badge: '' },
];

const badges = [
  { icon: '🔥', name: 'Streak Master', desc: '47-day streak', unlocked: true },
  { icon: '💪', name: 'Protein King', desc: 'Hit protein goal 30 days', unlocked: true },
  { icon: '🏃', name: 'Marathon Ready', desc: 'Run 100km total', unlocked: true },
  { icon: '🥗', name: 'Clean Eater', desc: '14 days clean nutrition', unlocked: true },
  { icon: '💤', name: 'Sleep Champion', desc: '8hrs for 14 days', unlocked: false },
  { icon: '⚡', name: 'Speed Demon', desc: '5K under 20 mins', unlocked: false },
];

export default function CommunitySection() {
  const [activeTab, setActiveTab] = useState('challenges');

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C97B63]/3 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <span className="badge-purple mb-3 inline-flex"><Users className="w-3 h-3" /> Community</span>
          <h2 className="section-title">Train <span className="gradient-text">Together,</span> Win Together</h2>
          <p className="text-[#9B8B7E] mt-2 max-w-xl mx-auto">
            Join millions of fitness enthusiasts, compete in challenges, and celebrate achievements
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 glass-card p-1 rounded-xl w-fit mx-auto mb-8 border border-[#EFE6DD]">
          {[
            { id: 'challenges', label: 'Challenges', icon: Target },
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { id: 'badges', label: 'Badges', icon: Award },
          ].map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === id ? 'bg-gradient-to-r from-[#C97B63] to-[#6B705C] text-white shadow-sm' : 'text-[#9B8B7E] hover:text-[#2B2B2B]'
              }`}>
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {challenges.map((c, i) => (
              <div key={i} className="glass-card border border-[#EFE6DD] hover:border-[#C97B63]/30 transition-all duration-300 overflow-hidden group shadow-sm">
                <div className={`h-2 bg-gradient-to-r ${c.color}`} />
                <div className="p-5">
                  <div className="text-3xl mb-3">{c.emoji}</div>
                  <h3 className="font-semibold text-[#2B2B2B] mb-1">{c.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-[#9B8B7E] mb-4">
                    <span className="flex items-center gap-1 font-sans"><Users className="w-3 h-3" />{c.participants.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-[#C97B63]" />{c.daysLeft}d left</span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#9B8B7E]">Progress</span>
                      <span className="text-[#2B2B2B]">{c.progress}%</span>
                    </div>
                    <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${c.color} rounded-full animate-progress-bar`} style={{ '--target-width': `${c.progress}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="badge-purple">{c.reward}</span>
                    <button className="text-xs text-[#C97B63] hover:text-[#2B2B2B] transition-colors cursor-pointer">Join →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-2xl mx-auto">
            {/* Top 3 podium */}
            <div className="flex items-end justify-center gap-4 mb-8">
              {[leaderboard[1], leaderboard[0], leaderboard[2]].map((user, i) => {
                const heights = ['h-24', 'h-32', 'h-20'];
                const podiumColors = ['bg-[#6B705C]/10 border-[#6B705C]/25', 'bg-[#C97B63]/10 border-[#C97B63]/25', 'bg-[#D4A373]/10 border-[#D4A373]/25'];
                return (
                  <div key={user.rank} className="flex flex-col items-center gap-2">
                    <span className="text-2xl">{user.badge}</span>
                    <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center font-bold text-white shadow-sm animate-float"
                      style={{ background: user.avatar }}>
                      {user.name[0]}
                    </div>
                    <p className="text-xs text-[#2B2B2B] font-medium text-center">{user.name.split(' ')[0]}</p>
                    <p className="text-xs text-[#9B8B7E] font-sans">{(user.points/1000).toFixed(1)}K</p>
                    <div className={`w-20 ${heights[i]} rounded-t-xl border ${podiumColors[i]} flex items-center justify-center`}>
                      <span className="text-2xl font-black text-[#2B2B2B]">{[2,1,3][i]}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Full list */}
            <div className="space-y-2">
              {leaderboard.map((user) => (
                <div key={user.rank} className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                  user.isYou ? 'border-[#C97B63]/40 bg-[#C97B63]/10 shadow-sm' : 'glass-card hover:border-black/10 border border-[#EFE6DD] shadow-sm'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    user.rank === 1 ? 'bg-[#C97B63]/20 text-[#C97B63]' :
                    user.rank === 2 ? 'bg-[#6B705C]/20 text-[#6B705C]' :
                    user.rank === 3 ? 'bg-[#D4A373]/20 text-[#D4A373]' : 'bg-black/5 text-[#9B8B7E]'
                  }`}>
                    {user.rank}
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ background: user.avatar }}>
                    {user.name[0]}
                  </div>
                  <div className="flex-1 font-sans">
                    <p className={`font-semibold text-sm ${user.isYou ? 'text-[#C97B63]' : 'text-[#2B2B2B]'}`}>{user.name}</p>
                    <p className="text-xs text-[#9B8B7E]">🔥 {user.streak} day streak</p>
                  </div>
                  <div className="text-right font-sans">
                    <p className="font-bold text-[#2B2B2B] text-sm">{user.points.toLocaleString()}</p>
                    <p className="text-xs text-[#9B8B7E]">points</p>
                  </div>
                  {user.badge && <span className="text-xl">{user.badge}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div>
            <div className="text-center mb-6">
              <p className="text-[#9B8B7E]">You've earned <span className="text-[#C97B63] font-semibold">4 of 18</span> badges</p>
              <div className="flex justify-center mt-2">
                <div className="h-2 w-48 bg-black/5 rounded-full overflow-hidden">
                  <div className="h-full w-[22%] bg-gradient-to-r from-[#C97B63] to-[#6B705C] rounded-full animate-progress-bar" style={{ '--target-width': '22%' }} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {badges.map((badge, i) => (
                <div key={i} className={`glass-card p-4 text-center transition-all duration-300 group shadow-sm border border-[#EFE6DD] ${
                  badge.unlocked ? 'border-[#C97B63]/30 hover:shadow-md hover:scale-105 cursor-pointer' : 'opacity-50'
                }`}>
                  <div className={`text-4xl mb-2 ${!badge.unlocked ? 'grayscale' : ''}`}>{badge.icon}</div>
                  <p className="font-semibold text-[#2B2B2B] text-sm">{badge.name}</p>
                  <p className="text-xs text-[#9B8B7E] mt-1 font-sans">{badge.desc}</p>
                  {badge.unlocked && <div className="mt-2 w-2 h-2 bg-[#7A9A82] rounded-full mx-auto animate-pulse" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

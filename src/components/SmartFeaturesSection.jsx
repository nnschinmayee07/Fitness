import React, { useState } from 'react';
import { Brain, Droplets, Sparkles, Calculator, Smile, CheckCircle, ChevronRight, Zap } from 'lucide-react';

const moods = [
  { emoji: '😴', label: 'Tired' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😊', label: 'Good' },
  { emoji: '😄', label: 'Great' },
  { emoji: '🔥', label: 'Pumped' },
];

const mealRecs = [
  { name: 'Quinoa Power Bowl', cal: 485, time: '20 min', tags: ['High Protein', 'Gluten Free'], emoji: '🥗', match: 98 },
  { name: 'Greek Yogurt Smoothie', cal: 320, time: '5 min', tags: ['Quick', 'Post-Workout'], emoji: '🥤', match: 94 },
  { name: 'Grilled Salmon Wrap', cal: 420, time: '25 min', tags: ['Omega-3', 'High Protein'], emoji: '🌯', match: 91 },
];

function BMICalculator() {
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(74);
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
  const category = bmi < 18.5 ? { label: 'Underweight', color: 'text-cyan-400' }
    : bmi < 25 ? { label: 'Normal',      color: 'text-purple-400' }
    : bmi < 30 ? { label: 'Overweight',  color: 'text-cyan-300' }
    : { label: 'Obese', color: 'text-purple-300' };
  const pct = Math.min(Math.max(((bmi - 10) / 30) * 100, 0), 100);

  return (
    <div className="glass-card p-5 border border-cyan-500/20">
      <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
        <Calculator className="w-4 h-4 text-cyan-400" /> BMI Calculator
      </h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Height</span>
            <span className="text-white font-medium">{height} cm</span>
          </div>
          <input type="range" min="140" max="220" value={height} onChange={e => setHeight(+e.target.value)}
            className="w-full accent-purple-500 cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Weight</span>
            <span className="text-white font-medium">{weight} kg</span>
          </div>
          <input type="range" min="40" max="150" value={weight} onChange={e => setWeight(+e.target.value)}
            className="w-full accent-cyan-500 cursor-pointer" />
        </div>

        <div className="text-center py-4">
          <p className="font-display font-black text-5xl gradient-text">{bmi}</p>
          <p className={`font-semibold mt-1 ${category.color}`}>{category.label}</p>
        </div>

        {/* BMI scale */}
        <div>
          <div className="h-3 rounded-full overflow-hidden" style={{
            background: 'linear-gradient(90deg, #06b6d4 0%, #a855f7 40%, #a855f7 70%, rgba(168,85,247,0.4) 100%)'
          }}>
            <div className="relative h-full">
              <div className="absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-lg"
                style={{ left: `${pct}%`, transform: 'translateX(-50%)' }} />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Under</span><span>Normal</span><span>Over</span><span>Obese</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SmartFeaturesSection() {
  const [selectedMood, setSelectedMood] = useState(3);
  const [waterGlasses, setWaterGlasses] = useState(7);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <span className="badge-cyan mb-3 inline-flex"><Sparkles className="w-3 h-3" /> Smart Features</span>
          <h2 className="section-title">Powered by <span className="gradient-text">Intelligence</span></h2>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto">
            Futuristic wellness tools that adapt to your lifestyle and optimize your health journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="space-y-4">
            {/* Mood Tracker */}
            <div className="glass-card p-5 border border-purple-500/20">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Smile className="w-4 h-4 text-purple-400" /> Mood Tracker
              </h3>
              <p className="text-sm text-gray-400 mb-4">How are you feeling today?</p>
              <div className="flex justify-between mb-4">
                {moods.map((m, i) => (
                  <button key={i} onClick={() => setSelectedMood(i)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 ${
                      selectedMood === i ? 'bg-purple-500/20 border border-purple-500/40 scale-110' : 'hover:bg-white/5'
                    }`}>
                    <span className="text-2xl">{m.emoji}</span>
                    <span className="text-xs text-gray-500">{m.label}</span>
                  </button>
                ))}
              </div>
              <div className="glass-card p-3 text-center">
                <p className="text-sm text-gray-400">AI Insight</p>
                <p className="text-sm text-white mt-1">
                  {selectedMood >= 3 ? '⚡ High energy today! Perfect for an intense workout.' : '🌿 Take it easy. Light yoga recommended.'}
                </p>
              </div>
            </div>

            {/* Hydration Reminder */}
            <div className="glass-card p-5 border border-cyan-500/20">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400" /> Hydration Reminder
              </h3>
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="38" fill="none" stroke="rgba(6,182,212,0.15)" strokeWidth="8" />
                  <circle cx="48" cy="48" r="38" fill="none" stroke="#06b6d4" strokeWidth="8"
                    strokeLinecap="round" strokeDasharray="238.8"
                    strokeDashoffset="238.8"
                    className="animate-progress-circle"
                    style={{ '--target-offset': 238.8 - (waterGlasses / 10) * 238.8 }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Droplets className="w-5 h-5 text-cyan-400" />
                  <p className="font-bold text-white text-lg">{waterGlasses}/10</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap justify-center mb-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <button key={i} onClick={() => setWaterGlasses(i + 1)}
                    className={`w-7 h-7 rounded-lg border transition-all duration-200 flex items-center justify-center ${
                      i < waterGlasses ? 'border-cyan-500/60 bg-cyan-500/20' : 'border-white/10 hover:border-cyan-500/30'
                    }`}>
                    <Droplets className={`w-3 h-3 ${i < waterGlasses ? 'text-cyan-400' : 'text-gray-600'}`} />
                  </button>
                ))}
              </div>
              <button className="w-full neon-btn-outline text-sm py-2">
                <Droplets className="w-4 h-4" />
                Log a Glass (+250ml)
              </button>
            </div>
          </div>

          {/* Center: BMI */}
          <div>
            <BMICalculator />

            {/* Goal Completion */}
            <div className="glass-card p-5 mt-4 border border-purple-500/20">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400" /> Today's Goals
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Hit calorie goal',  done: true },
                  { label: 'Complete workout',  done: true },
                  { label: 'Drink 2.5L water',  done: false },
                  { label: '10,000 steps',       done: false },
                  { label: 'Sleep 8 hours',      done: false },
                ].map((goal, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                    goal.done ? 'bg-purple-500/10' : 'hover:bg-white/5'
                  }`}>
                    <CheckCircle className={`w-5 h-5 flex-shrink-0 ${goal.done ? 'text-purple-400' : 'text-gray-600'}`} />
                    <span className={`text-sm ${goal.done ? 'text-gray-400 line-through' : 'text-white'}`}>{goal.label}</span>
                    {goal.done && <span className="ml-auto text-xs text-cyan-400">Done!</span>}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Daily completion</span>
                  <span className="text-white">2/5 goals</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[40%] bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Smart Meal Recs */}
          <div className="space-y-4">
            <div className="glass-card p-5 border border-purple-500/20">
              <h3 className="font-semibold text-white mb-1 flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-400" /> AI Meal Recommendations
              </h3>
              <p className="text-xs text-gray-500 mb-4">Based on your macros & preferences</p>
              <div className="space-y-3">
                {mealRecs.map((meal, i) => (
                  <div key={i} className="glass-card p-4 hover:border-purple-500/30 transition-all cursor-pointer group">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{meal.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-white text-sm">{meal.name}</p>
                          <span className="badge-green text-xs">{meal.match}% match</span>
                        </div>
                        <div className="flex gap-3 text-xs text-gray-500 mt-1">
                          <span>{meal.cal} kcal</span>
                          <span>· {meal.time}</span>
                        </div>
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          {meal.tags.map(t => (
                            <span key={t} className="badge-purple text-xs">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button className="w-full mt-3 text-xs text-purple-400 hover:text-white flex items-center justify-center gap-1 transition-colors">
                      Add to Log <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insight card */}
            <div className="glass-card p-5 bg-gradient-to-br from-purple-600/10 to-cyan-600/5 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-white text-sm">AI Insight of the Day</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Your training consistency is excellent! Consider adding 20g more protein post-workout to optimize your muscle synthesis window. Based on your sleep data, Tuesday evening workouts show 23% better performance. 🎯
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

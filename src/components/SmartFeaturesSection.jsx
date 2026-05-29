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
  const category = bmi < 18.5 ? { label: 'Underweight', color: 'text-[#6B705C]' }
    : bmi < 25 ? { label: 'Normal',      color: 'text-[#C97B63]' }
    : bmi < 30 ? { label: 'Overweight',  color: 'text-[#6B705C]' }
    : { label: 'Obese', color: 'text-[#C97B63]' };
  const pct = Math.min(Math.max(((bmi - 10) / 30) * 100, 0), 100);

  return (
    <div className="glass-card p-6 border border-[#EFE6DD] shadow-sm">
      <h3 className="font-display font-bold text-[#F5F5F5] text-lg mb-4 flex items-center gap-3">
        <Calculator className="w-5 h-5 text-[#6B705C]" /> BMI Calculator
      </h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[#9B8B7E]">Height</span>
            <span className="text-[#2B2B2B] font-medium">{height} cm</span>
          </div>
          <input type="range" min="140" max="220" value={height} onChange={e => setHeight(+e.target.value)}
            className="w-full accent-[#C97B63] cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[#9B8B7E]">Weight</span>
            <span className="text-[#2B2B2B] font-medium">{weight} kg</span>
          </div>
          <input type="range" min="40" max="150" value={weight} onChange={e => setWeight(+e.target.value)}
            className="w-full accent-[#6B705C] cursor-pointer" />
        </div>

        <div className="text-center py-4">
          <p className="font-display font-black text-5xl solid-primary">{bmi}</p>
          <p className={`font-semibold mt-1 ${category.color}`}>{category.label}</p>
        </div>

        {/* BMI scale */}
        <div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--accent)' }}>
            <div className="relative h-full">
              <div className="absolute top-0 bottom-0 w-1 bg-[#2B2B2B] rounded-full shadow-lg"
                style={{ left: `${pct}%`, transform: 'translateX(-50%)' }} />
            </div>
          </div>
          <div className="flex justify-between text-xs text-[#9B8B7E] mt-1 font-sans">
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
      <div className="absolute inset-0 bg-[#F8F5F0] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <span className="badge-cyan mb-3 inline-flex"><Sparkles className="w-3 h-3" /> Smart Features</span>
          <h2 className="section-title">Powered by <span className="solid-primary">Intelligence</span></h2>
          <p className="text-[#D4B5A0] mt-3 max-w-xl mx-auto text-lg leading-relaxed font-medium">
            Futuristic wellness tools that adapt to your lifestyle and optimize your health journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="space-y-4">
            {/* Mood Tracker */}
            <div className="glass-card p-5 border border-[#EFE6DD] shadow-sm bg-[#F8F5F0]">
              <h3 className="font-semibold text-[#2B2B2B] mb-4 flex items-center gap-2">
                <Smile className="w-4 h-4 text-[#C97B63]" /> Mood Tracker
              </h3>
              <p className="text-sm text-[#9B8B7E] mb-4">How are you feeling today?</p>
              <div className="flex justify-between mb-4">
                {moods.map((m, i) => (
                  <button key={i} onClick={() => setSelectedMood(i)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 cursor-pointer ${
                      selectedMood === i ? 'bg-[#C97B63]/15 border border-[#C97B63]/30 scale-110' : 'hover:bg-black/5'
                    }`}>
                    <span className="text-2xl">{m.emoji}</span>
                    <span className="text-xs text-[#9B8B7E]">{m.label}</span>
                  </button>
                ))}
              </div>
              <div className="glass-card p-3 text-center border border-[#EFE6DD]">
                <p className="text-sm text-[#9B8B7E]">AI Insight</p>
                <p className="text-sm text-[#2B2B2B] mt-1 font-semibold">
                  {selectedMood >= 3 ? '⚡ High energy today! Perfect for an intense workout.' : '🌿 Take it easy. Light yoga recommended.'}
                </p>
              </div>
            </div>

            {/* Hydration Reminder */}
            <div className="glass-card p-5 border border-[#EFE6DD] shadow-sm bg-[#F8F5F0]">
              <h3 className="font-semibold text-[#2B2B2B] mb-4 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-[#6B705C]" /> Hydration Reminder
              </h3>
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="38" fill="none" stroke="rgba(107,112,92,0.15)" strokeWidth="8" />
                  <circle cx="48" cy="48" r="38" fill="none" stroke="#6B705C" strokeWidth="8"
                    strokeLinecap="round" strokeDasharray="238.8"
                    strokeDashoffset="238.8"
                    className="animate-progress-circle"
                    style={{ '--target-offset': 238.8 - (waterGlasses / 10) * 238.8 }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Droplets className="w-5 h-5 text-[#6B705C]" />
                  <p className="font-bold text-[#2B2B2B] text-lg font-sans">{waterGlasses}/10</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap justify-center mb-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <button key={i} onClick={() => setWaterGlasses(i + 1)}
                    className={`w-7 h-7 rounded-lg border transition-all duration-200 flex items-center justify-center cursor-pointer ${
                      i < waterGlasses ? 'border-[#6B705C]/50 bg-[#6B705C]/15' : 'border-black/5 hover:border-[#6B705C]/30'
                    }`}>
                    <Droplets className={`w-3 h-3 ${i < waterGlasses ? 'text-[#6B705C]' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
              <button className="w-full secondary-btn text-sm py-2">
                <Droplets className="w-4 h-4" />
                Log a Glass (+250ml)
              </button>
            </div>
          </div>

          {/* Center: BMI */}
          <div>
            <BMICalculator />

            {/* Goal Completion */}
            <div className="glass-card p-5 mt-4 border border-[#EFE6DD] shadow-sm">
              <h3 className="font-semibold text-[#2B2B2B] mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#6B705C]" /> Today's Goals
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
                    goal.done ? 'bg-[#C97B63]/10' : 'hover:bg-black/5'
                  }`}>
                    <CheckCircle className={`w-5 h-5 flex-shrink-0 ${goal.done ? 'text-[#C97B63]' : 'text-gray-300'}`} />
                    <span className={`text-sm ${goal.done ? 'text-gray-400 line-through' : 'text-[#2B2B2B]'}`}>{goal.label}</span>
                    {goal.done && <span className="ml-auto text-xs text-[#6B705C]">Done!</span>}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1 font-sans">
                  <span className="text-[#9B8B7E]">Daily completion</span>
                  <span className="text-[#2B2B2B]">2/5 goals</span>
                </div>
                <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                  <div className="h-full w-[40%] bg-gradient-to-r from-[#C97B63] to-[#6B705C] rounded-full animate-progress-bar" style={{ '--target-width': '40%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Smart Meal Recs */}
          <div className="space-y-4">
            <div className="glass-card p-5 border border-[#EFE6DD] shadow-sm">
              <h3 className="font-semibold text-[#2B2B2B] mb-1 flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#C97B63]" /> AI Meal Recommendations
              </h3>
              <p className="text-xs text-[#9B8B7E] mb-4">Based on your macros & preferences</p>
              <div className="space-y-3">
                {mealRecs.map((meal, i) => (
                  <div key={i} className="glass-card p-4 hover:border-[#C97B63]/30 border border-[#EFE6DD] transition-all cursor-pointer group shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{meal.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-[#2B2B2B] text-sm">{meal.name}</p>
                          <span className="badge-green text-xs font-sans">{meal.match}% match</span>
                        </div>
                        <div className="flex gap-3 text-xs text-[#9B8B7E] mt-1 font-sans">
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
                    <button className="w-full mt-3 text-xs text-[#C97B63] hover:text-[#2B2B2B] flex items-center justify-center gap-1 transition-colors cursor-pointer">
                      Add to Log <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insight card */}
            <div className="glass-card p-5 bg-gradient-to-br from-[#C97B63]/10 to-[#6B705C]/5 border border-[#EFE6DD] shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-[#6B705C]" />
                <span className="font-semibold text-[#2B2B2B] text-sm">AI Insight of the Day</span>
              </div>
              <p className="text-sm text-[#9B8B7E] leading-relaxed">
                Your training consistency is excellent! Consider adding 20g more protein post-workout to optimize your muscle synthesis window. Based on your sleep data, Tuesday evening workouts show 23% better performance. 🎯
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

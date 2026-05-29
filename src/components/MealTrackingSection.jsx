import React, { useState } from 'react';
import { Plus, Search, Coffee, Sun, Moon, Utensils, Flame, ChevronRight, X } from 'lucide-react';

const meals = [
  {
    id: 'breakfast', label: 'Breakfast', icon: Coffee, color: 'text-[#C97B63]', bg: 'bg-[#C97B63]/10',
    time: '8:30 AM', calories: 420, items: [
      { name: 'Greek Yogurt Parfait', cal: 180, protein: 18, carbs: 22, fat: 4 },
      { name: 'Banana',               cal: 105, protein: 1,  carbs: 27, fat: 0 },
      { name: 'Granola',              cal: 135, protein: 3,  carbs: 22, fat: 4 },
    ]
  },
  {
    id: 'lunch', label: 'Lunch', icon: Sun, color: 'text-[#6B705C]', bg: 'bg-[#6B705C]/10',
    time: '1:00 PM', calories: 680, items: [
      { name: 'Grilled Chicken Bowl', cal: 380, protein: 42, carbs: 28, fat: 12 },
      { name: 'Brown Rice',           cal: 180, protein: 4,  carbs: 38, fat: 1 },
      { name: 'Avocado Salad',        cal: 120, protein: 2,  carbs: 8,  fat: 10 },
    ]
  },
  {
    id: 'dinner', label: 'Dinner', icon: Moon, color: 'text-[#C97B63]', bg: 'bg-[#C97B63]/10',
    time: '7:30 PM', calories: 520, items: [
      { name: 'Salmon Fillet',    cal: 280, protein: 36, carbs: 0,  fat: 14 },
      { name: 'Steamed Broccoli', cal: 55,  protein: 4,  carbs: 11, fat: 0 },
      { name: 'Quinoa',           cal: 185, protein: 7,  carbs: 34, fat: 3 },
    ]
  },
  {
    id: 'snacks', label: 'Snacks', icon: Utensils, color: 'text-[#6B705C]', bg: 'bg-[#6B705C]/10',
    time: 'All day', calories: 227, items: [
      { name: 'Mixed Nuts (30g)', cal: 180, protein: 5, carbs: 6,  fat: 16 },
      { name: 'Apple',            cal: 47,  protein: 0, carbs: 12, fat: 0 },
    ]
  },
];

const MealCard = ({ meal }) => {
  const [expanded, setExpanded] = useState(false);
  const { icon: Icon } = meal;
  return (
    <div className="glass-card border border-[#EFE6DD] hover:border-[#C97B63]/30 transition-all duration-300">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${meal.bg}`}>
              <Icon className={`w-5 h-5 ${meal.color}`} />
            </div>
            <div>
              <p className="font-display font-bold text-[#F5F5F5]">{meal.label}</p>
              <p className="text-xs text-[#C9A889]">{meal.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-bold text-[#2B2B2B]">{meal.calories}</p>
              <p className="text-xs text-[#9B8B7E]">kcal</p>
            </div>
            <button onClick={() => setExpanded(!expanded)}
              className="p-1.5 rounded-lg hover:bg-black/5 transition-colors cursor-pointer">
              <ChevronRight className={`w-4 h-4 text-[#9B8B7E] transition-transform ${expanded ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        <div className="h-1.5 bg-black/5 rounded-full overflow-hidden mb-4">
          <div className="h-full rounded-full bg-gradient-to-r from-[#C97B63] to-[#6B705C] animate-progress-bar"
            style={{ '--target-width': `${(meal.calories / 700) * 100}%` }} />
        </div>

        {expanded && (
          <div className="space-y-2 mb-3">
            {meal.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-black/5 last:border-0">
                <div>
                  <p className="text-sm text-[#2B2B2B]">{item.name}</p>
                  <div className="flex gap-3 text-xs text-[#9B8B7E] mt-0.5 font-sans">
                    <span>P: {item.protein}g</span>
                    <span>C: {item.carbs}g</span>
                    <span>F: {item.fat}g</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#2B2B2B]">{item.cal} kcal</span>
                  <button className="p-1 rounded text-gray-400 hover:text-[#C96363] transition-colors cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-[#DFD0C2] text-sm text-[#9B8B7E] hover:text-[#2B2B2B] hover:border-[#C97B63]/50 transition-all duration-200 cursor-pointer">
          <Plus className="w-4 h-4" />
          Add Food
        </button>
      </div>
    </div>
  );
};

export default function MealTrackingSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const totalCals = meals.reduce((sum, m) => sum + m.calories, 0);
  const remaining = 2200 - totalCals;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C97B63]/3 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <span className="badge-cyan mb-3 inline-flex"><Utensils className="w-3 h-3" /> Nutrition</span>
          <h2 className="section-title">Meal <span className="gradient-text">Tracking</span></h2>
          <p className="text-[#D4B5A0] mt-3 max-w-xl mx-auto text-lg leading-relaxed font-medium">
            Log your meals effortlessly with our AI-powered food database and intelligent nutritional insights.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Meal Cards */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B8B7E]" />
              <input
                type="text"
                placeholder="Search 50,000+ foods, recipes, barcodes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="input-dark pl-12 pr-4 bg-white/50 border border-[#EFE6DD]"
                id="food-search"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#2B2B2B]">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick add food suggestions */}
            <div className="flex gap-2 flex-wrap">
              {['Chicken Breast', 'Oats', 'Whey Protein', 'Sweet Potato', 'Eggs'].map(food => (
                <button key={food}
                  className="px-3 py-1.5 glass-card text-xs text-[#9B8B7E] hover:text-[#2B2B2B] hover:border-[#C97B63]/30 transition-all duration-200 rounded-full border border-[#EFE6DD] cursor-pointer">
                  + {food}
                </button>
              ))}
            </div>

            {meals.map(meal => <MealCard key={meal.id} meal={meal} />)}
          </div>

          {/* Right: Summary panel */}
          <div className="space-y-4">
            {/* Calorie Summary */}
            <div className="glass-card p-6 border border-[#EFE6DD] shadow-sm">
              <h3 className="font-display font-bold text-[#F5F5F5] text-lg mb-4 flex items-center gap-3">
                <Flame className="w-5 h-5 text-[#C97B63]" /> Daily Summary
              </h3>
              <div className="relative w-36 h-36 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 144 144">
                  <circle cx="72" cy="72" r="58" fill="none" stroke="rgba(43,43,43,0.06)" strokeWidth="12" />
                  <circle cx="72" cy="72" r="58" fill="none"
                    stroke="url(#mealGrad)" strokeWidth="12" strokeLinecap="round"
                    strokeDasharray="364.4"
                    strokeDashoffset="364.4"
                    className="animate-progress-circle"
                    style={{ '--target-offset': 364.4 - (totalCals / 2200) * 364.4 }}
                  />
                  <defs>
                    <linearGradient id="mealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C97B63" />
                      <stop offset="100%" stopColor="#6B705C" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-display font-black text-2xl text-[#2B2B2B]">{totalCals}</p>
                  <p className="text-xs text-[#9B8B7E]">consumed</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: 'Goal', value: '2,200', color: 'text-[#9B8B7E]' },
                  { label: 'Consumed', value: totalCals.toLocaleString(), color: 'text-[#C97B63]' },
                  { label: 'Remaining', value: remaining.toLocaleString(), color: 'text-[#7A9A82]' },
                ].map(s => (
                  <div key={s.label}>
                    <p className={`font-bold text-sm ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-[#9B8B7E]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition breakdown */}
            <div className="glass-card p-6 border border-[#EFE6DD]">
              <h3 className="font-display font-bold text-[#F5F5F5] text-lg mb-4">Nutrients</h3>
              {[
                { label: 'Protein', value: 156, goal: 180, color: '#C97B63' },
                { label: 'Carbs',   value: 205, goal: 250, color: '#6B705C' },
                { label: 'Fat',     value: 53,  goal: 70,  color: '#D4A373' },
                { label: 'Sodium',  value: 1840, goal: 2300, color: '#7A9A82', unit: 'mg' },
                { label: 'Sugar',   value: 42,  goal: 50,  color: '#A89F91' },
              ].map(n => (
                <div key={n.label} className="mb-3">
                  <div className="flex justify-between text-xs mb-1 font-sans">
                    <span className="text-[#9B8B7E]">{n.label}</span>
                    <span className="text-[#2B2B2B]">{n.value}{n.unit || 'g'} / {n.goal}{n.unit || 'g'}</span>
                  </div>
                  <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full animate-progress-bar" style={{
                      '--target-width': `${Math.min((n.value / n.goal) * 100, 100)}%`,
                      background: n.color
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Meal timing */}
            <div className="glass-card p-6 border border-[#EFE6DD]">
              <h3 className="font-display font-bold text-[#F5F5F5] text-lg mb-4">Meal Timing</h3>
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-black/5" />
                {meals.map((meal, i) => (
                  <div key={meal.id} className="flex items-start gap-3 mb-4 last:mb-0 pl-8 relative">
                    <div className="absolute left-1.5 w-3 h-3 rounded-full border-2 border-[#C97B63] bg-[#F8F5F0]" />
                    <div>
                      <p className="text-sm font-medium text-[#2B2B2B]">{meal.label}</p>
                      <p className="text-xs text-[#9B8B7E]">{meal.time} · {meal.calories} kcal</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

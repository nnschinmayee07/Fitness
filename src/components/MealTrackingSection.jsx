import React, { useState } from 'react';
import { Plus, Search, Coffee, Sun, Moon, Utensils, Flame, ChevronRight, X } from 'lucide-react';

const meals = [
  {
    id: 'breakfast', label: 'Breakfast', icon: Coffee, color: 'text-purple-400', bg: 'bg-purple-500/15',
    time: '8:30 AM', calories: 420, items: [
      { name: 'Greek Yogurt Parfait', cal: 180, protein: 18, carbs: 22, fat: 4 },
      { name: 'Banana',               cal: 105, protein: 1,  carbs: 27, fat: 0 },
      { name: 'Granola',              cal: 135, protein: 3,  carbs: 22, fat: 4 },
    ]
  },
  {
    id: 'lunch', label: 'Lunch', icon: Sun, color: 'text-cyan-400', bg: 'bg-cyan-500/15',
    time: '1:00 PM', calories: 680, items: [
      { name: 'Grilled Chicken Bowl', cal: 380, protein: 42, carbs: 28, fat: 12 },
      { name: 'Brown Rice',           cal: 180, protein: 4,  carbs: 38, fat: 1 },
      { name: 'Avocado Salad',        cal: 120, protein: 2,  carbs: 8,  fat: 10 },
    ]
  },
  {
    id: 'dinner', label: 'Dinner', icon: Moon, color: 'text-purple-400', bg: 'bg-purple-500/15',
    time: '7:30 PM', calories: 520, items: [
      { name: 'Salmon Fillet',    cal: 280, protein: 36, carbs: 0,  fat: 14 },
      { name: 'Steamed Broccoli', cal: 55,  protein: 4,  carbs: 11, fat: 0 },
      { name: 'Quinoa',           cal: 185, protein: 7,  carbs: 34, fat: 3 },
    ]
  },
  {
    id: 'snacks', label: 'Snacks', icon: Utensils, color: 'text-cyan-400', bg: 'bg-cyan-500/15',
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
    <div className="glass-card border border-white/10 hover:border-purple-500/30 transition-all duration-300">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${meal.bg}`}>
              <Icon className={`w-5 h-5 ${meal.color}`} />
            </div>
            <div>
              <p className="font-semibold text-white">{meal.label}</p>
              <p className="text-xs text-gray-500">{meal.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-bold text-white">{meal.calories}</p>
              <p className="text-xs text-gray-500">kcal</p>
            </div>
            <button onClick={() => setExpanded(!expanded)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-4">
          <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-progress-bar"
            style={{ '--target-width': `${(meal.calories / 700) * 100}%` }} />
        </div>

        {expanded && (
          <div className="space-y-2 mb-3">
            {meal.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-sm text-white">{item.name}</p>
                  <div className="flex gap-3 text-xs text-gray-500 mt-0.5">
                    <span>P: {item.protein}g</span>
                    <span>C: {item.carbs}g</span>
                    <span>F: {item.fat}g</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{item.cal} kcal</span>
                  <button className="p-1 rounded text-gray-600 hover:text-red-400 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-white/20 text-sm text-gray-400 hover:text-white hover:border-purple-500/50 transition-all duration-200">
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <span className="badge-cyan mb-3 inline-flex"><Utensils className="w-3 h-3" /> Nutrition</span>
          <h2 className="section-title">Meal <span className="gradient-text">Tracking</span></h2>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto">
            Log your meals effortlessly with our AI-powered food database of 50,000+ items
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Meal Cards */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search 50,000+ foods, recipes, barcodes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="input-dark pl-12 pr-4"
                id="food-search"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick add food suggestions */}
            <div className="flex gap-2 flex-wrap">
              {['Chicken Breast', 'Oats', 'Whey Protein', 'Sweet Potato', 'Eggs'].map(food => (
                <button key={food}
                  className="px-3 py-1.5 glass-card text-xs text-gray-400 hover:text-white hover:border-purple-500/30 transition-all duration-200 rounded-full">
                  + {food}
                </button>
              ))}
            </div>

            {meals.map(meal => <MealCard key={meal.id} meal={meal} />)}
          </div>

          {/* Right: Summary panel */}
          <div className="space-y-4">
            {/* Calorie Summary */}
            <div className="glass-card p-5 border border-cyan-500/20">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Flame className="w-4 h-4 text-purple-400" /> Daily Summary
              </h3>
              <div className="relative w-36 h-36 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 144 144">
                  <circle cx="72" cy="72" r="58" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
                  <circle cx="72" cy="72" r="58" fill="none"
                    stroke="url(#mealGrad)" strokeWidth="12" strokeLinecap="round"
                    strokeDasharray="364.4"
                    strokeDashoffset="364.4"
                    className="animate-progress-circle"
                    style={{ '--target-offset': 364.4 - (totalCals / 2200) * 364.4 }}
                  />
                  <defs>
                    <linearGradient id="mealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-display font-black text-2xl text-white">{totalCals}</p>
                  <p className="text-xs text-gray-400">consumed</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: 'Goal', value: '2,200', color: 'text-gray-400' },
                  { label: 'Consumed', value: totalCals.toLocaleString(), color: 'text-purple-400' },
                  { label: 'Remaining', value: remaining.toLocaleString(), color: 'text-green-400' },
                ].map(s => (
                  <div key={s.label}>
                    <p className={`font-bold text-sm ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition breakdown */}
            <div className="glass-card p-5">
              <h3 className="font-semibold text-white mb-4">Nutrients</h3>
              {[
                { label: 'Protein', value: 156, goal: 180, color: '#a855f7' },
                { label: 'Carbs',   value: 205, goal: 250, color: '#06b6d4' },
                { label: 'Fat',     value: 53,  goal: 70,  color: '#a855f7' },
                { label: 'Sodium',  value: 1840, goal: 2300, color: '#06b6d4', unit: 'mg' },
                { label: 'Sugar',   value: 42,  goal: 50,  color: '#a855f7' },
              ].map(n => (
                <div key={n.label} className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{n.label}</span>
                    <span className="text-white">{n.value}{n.unit || 'g'} / {n.goal}{n.unit || 'g'}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full animate-progress-bar" style={{
                      '--target-width': `${Math.min((n.value / n.goal) * 100, 100)}%`,
                      background: n.color
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Meal timing */}
            <div className="glass-card p-5">
              <h3 className="font-semibold text-white mb-4">Meal Timing</h3>
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10" />
                {meals.map((meal, i) => (
                  <div key={meal.id} className="flex items-start gap-3 mb-4 last:mb-0 pl-8 relative">
                    <div className="absolute left-1.5 w-3 h-3 rounded-full border-2 border-purple-500 bg-dark-900" />
                    <div>
                      <p className="text-sm font-medium text-white">{meal.label}</p>
                      <p className="text-xs text-gray-500">{meal.time} · {meal.calories} kcal</p>
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

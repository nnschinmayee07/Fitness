import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, BarChart2, PieChart, Activity } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  ArcElement, Filler, Tooltip, Legend
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  ArcElement, Filler, Tooltip, Legend
);

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: '#9B8B7E', font: { family: 'Inter', size: 12 } } },
    tooltip: {
      backgroundColor: 'rgba(239, 230, 221, 0.95)',
      borderColor: 'rgba(201,123,99,0.3)',
      borderWidth: 1,
      titleColor: '#2B2B2B',
      bodyColor: '#9B8B7E',
      padding: 12,
      cornerRadius: 12,
    },
  },
  scales: {
    x: { grid: { color: 'rgba(43,43,43,0.04)' }, ticks: { color: '#9B8B7E' } },
    y: { grid: { color: 'rgba(43,43,43,0.04)' }, ticks: { color: '#9B8B7E' } },
  },
};

const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const calorieData = {
  labels: weekLabels,
  datasets: [
    {
      label: 'Consumed',
      data: [2100, 1950, 2300, 2050, 1847, 0, 0],
      borderColor: '#C97B63',
      backgroundColor: 'rgba(201,123,99,0.08)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#C97B63',
      pointBorderColor: '#fff',
      pointRadius: 5,
    },
    {
      label: 'Goal',
      data: [2200, 2200, 2200, 2200, 2200, 2200, 2200],
      borderColor: 'rgba(107,112,92,0.6)',
      borderDash: [6, 4],
      backgroundColor: 'transparent',
      tension: 0,
      pointRadius: 0,
    },
  ],
};

const weightData = {
  labels: monthLabels.slice(0, 8),
  datasets: [{
    label: 'Weight (kg)',
    data: [78, 77.4, 76.8, 76.1, 75.5, 75.0, 74.6, 74.2],
    borderColor: '#6B705C',
    backgroundColor: 'rgba(107,112,92,0.06)',
    fill: true,
    tension: 0.4,
    pointBackgroundColor: '#6B705C',
    pointBorderColor: '#fff',
    pointRadius: 5,
  }],
};

const macroData = {
  labels: ['Protein', 'Carbs', 'Fat', 'Fiber'],
  datasets: [{
    data: [28, 42, 22, 8],
    backgroundColor: [
      'rgba(201,123,99,0.75)',
      'rgba(107,112,92,0.75)',
      'rgba(201,123,99,0.4)',
      'rgba(107,112,92,0.4)',
    ],
    borderColor: ['#C97B63', '#6B705C', '#C97B63', '#6B705C'],
    borderWidth: 2,
    hoverOffset: 8,
  }],
};

const activityData = {
  labels: weekLabels,
  datasets: [
    {
      label: 'Calories Burned',
      data: [420, 380, 0, 480, 520, 0, 0],
      backgroundColor: (ctx) => {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(201,123,99,0.85)');
        gradient.addColorStop(1, 'rgba(107,112,92,0.45)');
        return gradient;
      },
      borderRadius: 8,
      borderSkipped: false,
    },
  ],
};

const noScaleOptions = {
  ...chartDefaults,
  scales: undefined,
  plugins: { ...chartDefaults.plugins, legend: { position: 'right', labels: { color: '#9B8B7E', padding: 16 } } },
};

// Activity heatmap — 7 weeks × 7 days
const heatmapData = Array.from({ length: 7 }, (_, week) =>
  Array.from({ length: 7 }, (_, day) => ({
    value: Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0,
    label: `W${week + 1} D${day + 1}`,
  }))
);

const heatColors = [
  'bg-black/5',
  'bg-[#C97B63]/25',
  'bg-[#C97B63]/50',
  'bg-[#C97B63]/75',
  'bg-[#C97B63]',
];

export default function AnalyticsSection() {
  const [activeChart, setActiveChart] = useState('calories');

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6B705C]/3 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <span className="badge-purple mb-3 inline-flex"><BarChart2 className="w-3 h-3" /> Analytics</span>
          <h2 className="section-title">Data-Driven <span className="gradient-text">Insights</span></h2>
          <p className="text-[#9B8B7E] mt-2 max-w-xl mx-auto">
            Beautiful visualizations of your health data — spot trends, track progress, stay motivated
          </p>
        </div>

        {/* Top charts row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Calorie trend */}
          <div className="glass-card p-5 border border-[#EFE6DD] shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-[#2B2B2B] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#C97B63]" /> Weekly Calorie Trend
              </h3>
              <span className="badge-purple">This Week</span>
            </div>
            <div className="h-48">
              <Line data={calorieData} options={chartDefaults} />
            </div>
            <div className="flex gap-4 mt-4 flex-wrap">
              {[
                { label: 'Avg Consumed', value: '2,049 kcal', color: 'text-[#C97B63]' },
                { label: 'Avg Goal', value: '2,200 kcal', color: 'text-[#6B705C]' },
                { label: 'Deficit', value: '-151 kcal/day', color: 'text-[#6B705C]' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className={`font-bold text-sm ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-[#9B8B7E]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weight progress */}
          <div className="glass-card p-5 border border-[#EFE6DD] shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-[#2B2B2B] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#6B705C]" /> Weight Progress
              </h3>
              <span className="badge-cyan">8 Months</span>
            </div>
            <div className="h-48">
              <Line data={weightData} options={chartDefaults} />
            </div>
            <div className="flex gap-4 mt-4 flex-wrap">
              {[
                { label: 'Start',   value: '78.0 kg', color: 'text-[#9B8B7E]' },
                { label: 'Current', value: '74.2 kg', color: 'text-[#6B705C]' },
                { label: 'Lost',    value: '3.8 kg',  color: 'text-[#C97B63]' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className={`font-bold text-sm ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-[#9B8B7E]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Macro donut */}
          <div className="glass-card p-5 border border-[#EFE6DD] shadow-sm">
            <h3 className="font-semibold text-[#2B2B2B] mb-5 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#6B705C]" /> Macro Distribution
            </h3>
            <div className="h-48">
              <Doughnut data={macroData} options={noScaleOptions} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {macroData.labels.map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: macroData.datasets[0].borderColor[i] }} />
                  <span className="text-xs text-[#9B8B7E]">{label}: <span className="text-[#2B2B2B]">{macroData.datasets[0].data[i]}%</span></span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity bars */}
          <div className="glass-card p-5 border border-[#EFE6DD] shadow-sm">
            <h3 className="font-semibold text-[#2B2B2B] mb-5 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#C97B63]" /> Activity This Week
            </h3>
            <div className="h-48">
              <Bar data={activityData} options={chartDefaults} />
            </div>
            <div className="flex justify-between mt-4 text-sm">
              <div>
                <p className="font-bold text-[#2B2B2B]">1,800 kcal</p>
                <p className="text-xs text-[#9B8B7E]">Total burned</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#C97B63]">4 workouts</p>
                <p className="text-xs text-[#9B8B7E]">This week</p>
              </div>
            </div>
          </div>

          {/* Heatmap */}
          <div className="glass-card p-5 border border-[#EFE6DD] shadow-sm">
            <h3 className="font-semibold text-[#2B2B2B] mb-5 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#C97B63]" /> Activity Heatmap
            </h3>
            <div className="flex gap-1 flex-col">
              <div className="flex gap-1 mb-1">
                {['M','T','W','T','F','S','S'].map((d, i) => (
                  <div key={i} className="w-8 text-xs text-[#6B705C] text-center">{d}</div>
                ))}
              </div>
              {heatmapData.map((week, wi) => (
                <div key={wi} className="flex gap-1">
                  {week.map((day, di) => (
                    <div key={di} title={`${day.label}: Level ${day.value}`}
                      className={`w-8 h-8 rounded-md transition-all duration-200 hover:scale-110 cursor-pointer ${heatColors[day.value]}`} />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 text-xs text-[#9B8B7E]">
              <span>Less</span>
              <div className="flex gap-1">
                {heatColors.map((c, i) => (
                  <div key={i} className={`w-5 h-5 rounded ${c}`} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

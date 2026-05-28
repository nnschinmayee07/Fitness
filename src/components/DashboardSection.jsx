import {
  Flame, Droplets, Footprints, Moon, Scale,
  Heart, Activity, ChevronUp, ChevronDown, Target
} from 'lucide-react';

const CircleProgress = ({ percent, color = '#C97B63', size = 80, stroke = 8 }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(43,43,43,0.06)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ}
        className="animate-progress-circle"
        style={{ '--target-offset': offset }}
      />
    </svg>
  );
};

const StatCard = ({ icon: Icon, label, value, unit, percent, color, bg, trend, sub }) => (
  <div className="stat-card group cursor-default">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      {trend && (
        <span className={`flex items-center gap-0.5 text-xs font-medium ${trend > 0 ? 'text-[#7A9A82]' : 'text-[#C96363]'}`}>
          {trend > 0 ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div className="flex items-end justify-between">
      <div>
        <p className="text-xs text-[#C9A889] mb-1">{label}</p>
        <p className="font-display font-bold text-2xl text-[#F5F5F5]">
          {value}<span className="text-sm text-[#C9A889] font-normal ml-1">{unit}</span>
        </p>
        {sub && <p className="text-xs text-[#C9A889] mt-1">{sub}</p>}
      </div>
      {percent !== undefined && (
        <div className="relative">
          <CircleProgress percent={percent} size={56} stroke={6} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-[#2B2B2B]">{percent}%</span>
          </div>
        </div>
      )}
    </div>
    {percent !== undefined && (
      <div className="mt-3 h-1.5 bg-black/5 rounded-full overflow-hidden">
        <div className="h-full rounded-full bg-[#C97B63] animate-progress-bar"
          style={{ '--target-width': `${percent}%` }} />
      </div>
    )}
  </div>
);

const MacroBar = ({ label, current, max, color }) => {
  const pct = Math.round((current / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="w-16 text-sm text-[#C9A889] text-right flex-shrink-0">{label}</div>
      <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full animate-progress-bar" style={{ '--target-width': `${pct}%`, background: color }} />
      </div>
      <div className="w-24 text-sm text-[#F5F5F5] font-medium flex-shrink-0">{current}g<span className="text-[#C9A889]">/{max}g</span></div>
    </div>
  );
};

export default function DashboardSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#1a1814]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="badge-purple mb-3 inline-flex"><Activity className="w-3 h-3" /> Live Dashboard</span>
          <h2 className="section-title">Your <span className="solid-primary">Health Hub</span></h2>
          <p className="text-[#D4B5A0] mt-2">Everything at a glance — real-time stats, goals, and progress</p>
        </div>

        {/* Calorie Overview */}
        <div className="glass-card p-6 mb-6 shadow-lg">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="relative flex-shrink-0">
              <div className="relative w-44 h-44">
                <CircleProgress percent={84} size={176} stroke={14} color="#C97B63" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <Flame className="w-6 h-6 text-[#C97B63] mb-1" />
                  <p className="font-display font-black text-3xl text-[#F5F5F5]">1,847</p>
                  <p className="text-xs text-[#C9A889]">of 2,200 kcal</p>
                  <span className="badge-green mt-2">On Track</span>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-[#F5F5F5]">Macro Breakdown</h3>
                <span className="text-sm text-[#C9A889]">Goal: 2,200 kcal</span>
              </div>
              <MacroBar label="Protein" current={142} max={180} color="#C97B63" />
              <MacroBar label="Carbs"   current={195} max={250} color="#6B705C" />
              <MacroBar label="Fat"     current={48}  max={70}  color="#D4A373" />
              <MacroBar label="Fiber"   current={22}  max={35}  color="#7A9A82" />
              <div className="flex items-center gap-6 pt-2 flex-wrap">
                <div className="flex items-center gap-2 text-sm">
                  <Flame className="w-4 h-4 text-[#C97B63]" />
                  <span className="text-[#C9A889]">Remaining:</span>
                  <span className="font-semibold text-[#F5F5F5]">353 kcal</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-[#7A9A82]" />
                  <span className="text-[#C9A889]">Net:</span>
                  <span className="font-semibold text-[#F5F5F5]">1,327 kcal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={Flame}      label="Calories Burned" value="520"   unit="kcal" percent={65}
            color="text-[#C97B63]" bg="bg-[#C97B63]/10" trend={12}  sub="Exercise + Resting" />
          <StatCard icon={Droplets}   label="Water Intake"    value="1.8"   unit="L"    percent={72}
            color="text-[#6B705C]"   bg="bg-[#6B705C]/10"   trend={5}   sub="Goal: 2.5L" />
          <StatCard icon={Footprints} label="Daily Steps"     value="8,420" unit=""      percent={84}
            color="text-[#C97B63]" bg="bg-[#C97B63]/10" trend={18}  sub="Goal: 10,000" />
          <StatCard icon={Moon}       label="Sleep"           value="7.5"   unit="hrs"  percent={94}
            color="text-[#6B705C]"   bg="bg-[#6B705C]/10"   trend={-3}  sub="Optimal: 8hrs" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Weight */}
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#6B705C]/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-[#6B705C]" />
              </div>
              <div>
                <p className="text-xs text-[#C9A889]">Current Weight</p>
                <p className="font-display font-bold text-2xl text-[#F5F5F5]">74.2 <span className="text-sm text-[#C9A889] font-normal font-sans ml-1">kg</span></p>
              </div>
              <div className="ml-auto flex items-center gap-1 text-[#6B705C] text-sm font-medium">
                <ChevronDown className="w-4 h-4" />0.8kg
              </div>
            </div>
            <div className="flex justify-between text-xs text-[#C9A889] mb-2">
              <span>Start: 78 kg</span><span>Goal: 70 kg</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[51%] rounded-full bg-[#C97B63]" />
            </div>
            <p className="text-xs text-[#C9A889] mt-2">51% to goal · Est. 6 weeks</p>
          </div>

          {/* Heart Rate */}
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C97B63]/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#C97B63]" />
                </div>
                <div>
                  <p className="text-xs text-[#C9A889]">Heart Rate</p>
                  <p className="font-display font-bold text-2xl text-[#F5F5F5]">72 <span className="text-sm text-[#C9A889] font-normal font-sans ml-1">bpm</span></p>
                </div>
              </div>
              <span className="badge-green">Normal</span>
            </div>
            <svg viewBox="0 0 120 40" className="w-full h-10">
              <polyline points="0,20 10,20 15,20 20,5 25,35 30,20 40,20 50,20 55,8 60,32 65,20 80,20 90,20 95,10 100,30 105,20 120,20"
                fill="none" stroke="#C97B63" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="flex justify-between text-xs text-[#C9A889] mt-1">
              <span>Resting: 60</span><span>Peak: 148</span><span>Avg: 82</span>
            </div>
          </div>

          {/* Water tracker */}
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#6B705C]/10 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-[#6B705C]" />
              </div>
              <div>
                <p className="text-xs text-[#C9A889]">Hydration</p>
                <p className="font-display font-bold text-2xl text-[#F5F5F5]">1.8 <span className="text-sm text-[#C9A889] font-normal font-sans ml-1">/ 2.5L</span></p>
              </div>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={`w-8 h-10 rounded-xl border flex items-end justify-center pb-1 ${
                  i < 7 ? 'border-[#6B705C]/30 bg-[#6B705C]/10' : 'border-black/6 bg-black/4'
                }`}>
                  <Droplets className={`w-3 h-3 ${i < 7 ? 'text-[#6B705C]' : 'text-[#A89F91]'}`} />
                </div>
              ))}
            </div>
            <p className="text-xs text-[#C9A889] mt-3">7 of 10 glasses · 3 remaining</p>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FadeIn } from '../motion/FadeIn';

const STEPS = [
  {
    title: 'What\'s your fitness goal?',
    field: 'goal',
    options: ['Lose weight', 'Build muscle', 'Maintain', 'Improve endurance'],
  },
  {
    title: 'Tell us about your body',
    field: 'stats',
    options: null,
    type: 'stats',
  },
  {
    title: 'What\'s your activity level?',
    field: 'activityLevel',
    options: ['Sedentary', 'Lightly active', 'Moderately active', 'Very active'],
  },
  {
    title: 'Any diet preferences?',
    field: 'diet',
    options: ['No restrictions', 'Vegan', 'Vegetarian', 'Keto', 'Paleo'],
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({
    goal: null,
    stats: { age: '', height: '', weight: '', targetWeight: '' },
    activityLevel: null,
    diet: null,
  });
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  const currentStep = STEPS[step];

  const handleSelect = (value) => {
    if (currentStep.field === 'stats') return;
    setProfile(prev => ({
      ...prev,
      [currentStep.field]: value,
    }));
  };

  const handleStatChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    if (step === STEPS.length - 1) {
      updateProfile(profile);
      navigate('/dashboard');
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    const current = STEPS[step];
    if (current.field === 'goal') return profile.goal !== null;
    if (current.field === 'stats') {
      return profile.stats.age && profile.stats.height && profile.stats.weight && profile.stats.targetWeight;
    }
    if (current.field === 'activityLevel') return profile.activityLevel !== null;
    if (current.field === 'diet') return profile.diet !== null;
    return false;
  };

  return (
    <div className="min-h-screen bg-[#1a1814] flex items-center justify-center px-4 py-8">
      <FadeIn>
        <div className="w-full max-w-lg glass-card p-8 rounded-3xl">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-[#C9A889] mb-2">
              <span>Step {step + 1}</span>
              <span>{step + 1} of {STEPS.length}</span>
            </div>
            <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C97B63] transition-all duration-300"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-center font-display font-bold text-2xl text-[#F5F5F5] mb-8">
            {currentStep.title}
          </h1>

          {/* Content */}
          <div className="mb-8">
            {currentStep.type === 'stats' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#F5F5F5] mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={profile.stats.age}
                    onChange={(e) => handleStatChange('age', e.target.value)}
                    className="input-field"
                    placeholder="25"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#F5F5F5] mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={profile.stats.height}
                    onChange={(e) => handleStatChange('height', e.target.value)}
                    className="input-field"
                    placeholder="180"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#F5F5F5] mb-2">
                    Current Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={profile.stats.weight}
                    onChange={(e) => handleStatChange('weight', e.target.value)}
                    className="input-field"
                    placeholder="75"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#F5F5F5] mb-2">
                    Target Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={profile.stats.targetWeight}
                    onChange={(e) => handleStatChange('targetWeight', e.target.value)}
                    className="input-field"
                    placeholder="70"
                    min="1"
                  />
                </div>
              </div>
            ) : (
              <div className="grid gap-3">
                {currentStep.options.map(option => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`p-4 rounded-2xl text-center font-semibold transition-all duration-200 ${
                      (currentStep.field === 'goal' && profile.goal === option) ||
                      (currentStep.field === 'activityLevel' && profile.activityLevel === option) ||
                      (currentStep.field === 'diet' && profile.diet === option)
                        ? 'bg-[#C97B63] text-white'
                        : 'glass-card text-[#D4B5A0] hover:bg-[#22201a]/85'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={step === 0}
              className="flex-1 secondary-btn justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 primary-btn justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === STEPS.length - 1 ? 'Complete' : 'Next'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

import React from 'react';
import { Utensils } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import MealTrackingSection from '../components/MealTrackingSection';
import Footer from '../components/Footer';

export default function NutritionPage() {
  return (
    <>
      <PageHeader
        title="Nutrition"
        subtitle="Track your meals, macros, and calorie intake with intelligent food logging."
        icon={Utensils}
        badge="Smart Tracking"
        gradient="from-cyan-400 to-purple-400"
        accentColor="cyan"
      />
      <MealTrackingSection />
      <Footer />
    </>
  );
}

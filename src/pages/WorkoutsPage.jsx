import React from 'react';
import { Dumbbell } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import WorkoutSection from '../components/WorkoutSection';
import Footer from '../components/Footer';

export default function WorkoutsPage() {
  return (
    <>
      <PageHeader
        title="Workouts"
        subtitle="Plan, log, and crush your workouts with AI-powered training recommendations."
        icon={Dumbbell}
        badge="AI Powered"
        gradient="from-purple-400 to-cyan-400"
        accentColor="purple"
      />
      <WorkoutSection />
      <Footer />
    </>
  );
}

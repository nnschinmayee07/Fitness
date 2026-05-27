import React from 'react';
import { Bot } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import AIAssistant from '../components/AIAssistant';
import Footer from '../components/Footer';

export default function AICoachPage() {
  return (
    <>
      <PageHeader
        title="AI Coach"
        subtitle="Your personal AI fitness coach — ask anything about nutrition, workouts, and recovery."
        icon={Bot}
        badge="NEW"
        gradient="from-purple-400 to-cyan-400"
        accentColor="purple"
      />
      <AIAssistant />
      <Footer />
    </>
  );
}

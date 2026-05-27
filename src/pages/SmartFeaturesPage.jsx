import React from 'react';
import { Sparkles } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SmartFeaturesSection from '../components/SmartFeaturesSection';
import Footer from '../components/Footer';

export default function SmartFeaturesPage() {
  return (
    <>
      <PageHeader
        title="Smart Features"
        subtitle="Next-gen fitness tech — wearable sync, smart reminders, and adaptive coaching."
        icon={Sparkles}
        badge="Next-Gen"
        gradient="from-purple-400 to-cyan-400"
        accentColor="purple"
      />
      <SmartFeaturesSection />
      <Footer />
    </>
  );
}

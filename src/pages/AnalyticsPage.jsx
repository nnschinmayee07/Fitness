import React from 'react';
import { TrendingUp } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import AnalyticsSection from '../components/AnalyticsSection';
import Footer from '../components/Footer';

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Analytics"
        subtitle="Deep-dive into your fitness data with beautiful charts and actionable insights."
        icon={TrendingUp}
        badge="Insights"
        gradient="from-cyan-400 to-purple-400"
        accentColor="cyan"
      />
      <AnalyticsSection />
      <Footer />
    </>
  );
}

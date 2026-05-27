import React from 'react';
import { BarChart2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DashboardSection from '../components/DashboardSection';
import Footer from '../components/Footer';

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Live Dashboard"
        subtitle="Your real-time fitness metrics, calories, and progress — all in one glance."
        icon={BarChart2}
        badge="Live"
        gradient="from-purple-400 to-cyan-400"
        accentColor="purple"
      />
      <DashboardSection />
      <Footer />
    </>
  );
}

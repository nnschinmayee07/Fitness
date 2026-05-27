import React from 'react';
import { Users } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import CommunitySection from '../components/CommunitySection';
import Footer from '../components/Footer';

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        title="Community"
        subtitle="Connect, compete, and celebrate with thousands of fitness enthusiasts worldwide."
        icon={Users}
        badge="Social"
        gradient="from-cyan-400 to-purple-400"
        accentColor="cyan"
      />
      <CommunitySection />
      <Footer />
    </>
  );
}

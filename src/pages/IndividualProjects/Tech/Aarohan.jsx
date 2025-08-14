import React from 'react';
import ProjectLayout from '../../../components/projects/ProjectLayout';

const Aarohan = () => {
  return (
    <ProjectLayout title="Aarohan" subtitle="Tech project" showHero={false} fullWidth={true} contentPadding="py-0" contentGap="space-y-0">
      <div className="text-center py-20">
        <h1 className="text-5xl lg:text-6xl font-medium" style={{
          background: 'linear-gradient(90deg, #FFFFFF 0%, #D770D7 50%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>Aarohan</h1>
        <p className="text-white/80 mt-4">Coming soon…</p>
      </div>
    </ProjectLayout>
  );
};

export default Aarohan;



import Header from '@/components/Header';
import HeroText from '@/components/HeroText';
import ConcentricRings from '@/components/ConcentricRings';
import SplineRobot from '@/components/SplineRobot';

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Header with logo */}
      <Header />
      
      {/* Background concentric rings */}
      <ConcentricRings />
      
      {/* 3D Spline Robot */}
      <SplineRobot />
      
      {/* Hero text and CTA */}
      <HeroText />
      
      {/* Subtle gradient overlay at edges */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]/30" />
      </div>
    </main>
  );
};

export default Index;

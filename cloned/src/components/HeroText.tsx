import { ArrowUpRight } from 'lucide-react';

const HeroText = () => {
  return (
    <>
      {/* Mobile layout - text at top */}
      <div className="md:hidden absolute top-20 left-0 right-0 z-20 px-6 text-center">
        <span className="text-accent text-xs font-medium tracking-[0.3em] uppercase block mb-4">
          Hand Made Intelligence
        </span>
        <h1 className="text-5xl sm:text-6xl font-bold text-foreground tracking-tighter animate-fade-up">
          COMING SOON
        </h1>
      </div>

      {/* Desktop layout - Tagline */}
      <div className="hidden md:block absolute left-16 lg:left-24 top-[35%] z-20 animate-fade-up-delay-1">
        <span className="text-sm font-medium tracking-[0.3em] uppercase">
          Hand Made Intelligence
        </span>
      </div>

      {/* Desktop layout - Main "COMING SOON" text split around robot */}
      <div className="hidden md:block absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none">
        <div className="relative flex items-center justify-center">
          <h1 className="text-massive text-foreground/90 tracking-tighter animate-fade-up whitespace-nowrap">
            <span className="inline-block" style={{ marginRight: '40px' }}>COMING</span>
            <span className="inline-block">SOON</span>
          </h1>
        </div>
      </div>

      {/* CTA Button */}
    </>
  );
};

export default HeroText;

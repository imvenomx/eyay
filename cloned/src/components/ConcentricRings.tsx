const ConcentricRings = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      {/* Static rings */}
      {[1, 2, 3, 4, 5].map((ring) => (
        <div
          key={ring}
          className="absolute rounded-full border border-muted/30"
          style={{
            width: `${ring * 180 + 200}px`,
            height: `${ring * 180 + 200}px`,
          }}
        />
      ))}
      
      {/* Animated expanding rings */}
      <div className="absolute w-[300px] h-[300px] rounded-full border border-muted-foreground/20 animate-ring-expand" />
      <div className="absolute w-[300px] h-[300px] rounded-full border border-muted-foreground/20 animate-ring-expand-delay" />
      <div className="absolute w-[300px] h-[300px] rounded-full border border-muted-foreground/20 animate-ring-expand-delay-2" />
      
      {/* Gradient overlay for depth */}
      <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-radial from-muted/10 to-transparent animate-pulse-slow" />
    </div>
  );
};

export default ConcentricRings;

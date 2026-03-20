const SplineRobot = () => {
  return (
    <div className="absolute inset-x-[2%] md:inset-x-0 top-40 md:top-0 bottom-0 z-10 flex items-center justify-center pointer-events-auto">
      {/* @ts-ignore */}
      <spline-viewer 
        url="https://prod.spline.design/fP0LH65i8bXQDQjZ/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default SplineRobot;

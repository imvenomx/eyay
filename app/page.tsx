import HeroSection from "@/components/hero-section";
import StaircaseTransition from "@/components/staircase-transition";
import ServicesBento from "@/components/services-bento";
import ProcessBento from "@/components/process-bento";
import ServicesSlider from "@/components/services-slider";
import SplineRobotSection from "@/components/spline-robot-section";
import StatsSection from "@/components/stats-section";
import CallToAction from "@/components/call-to-action";
import ErrorBoundary from "@/components/error-boundary";

export default function Home() {
    return (
        <>
            <ErrorBoundary label="hero" fallback={<HeroFallback/>}>
                <HeroSection/>
            </ErrorBoundary>
            <StaircaseTransition variant="to-light"/>
            {/* Continuous border rail for all white sections */}
            <div className="bg-white" data-nav-theme="light">
                <div className="mx-4 md:mx-8 lg:mx-12 border-l border-r border-black/15">
                    <ServicesBento/>
                    <ProcessBento/>
                </div>
            </div>
            <StaircaseTransition variant="to-dark"/>
            <ServicesSlider/>
            <ErrorBoundary label="spline">
                <SplineRobotSection/>
            </ErrorBoundary>
            {/* Continuous border rail for stats + CTA */}
            <div className="bg-white" data-nav-theme="light">
                <div className="mx-4 md:mx-8 lg:mx-12 border-l border-r border-black/15">
                    <StatsSection/>
                    <CallToAction/>
                </div>
            </div>
        </>
    )
}

function HeroFallback() {
    return (
        <div className="bg-black text-white" style={{height: '100svh'}}>
            <div className="h-full flex flex-col items-center justify-center px-8">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-4">Eey Aay</p>
                <h1 className="font-vcr text-4xl md:text-6xl text-center max-w-3xl leading-tight" style={{fontWeight: 900}}>
                    AI & Automazione<br/>per il Business Moderno
                </h1>
            </div>
        </div>
    )
}

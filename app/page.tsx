import HeroSection from "@/components/hero-section";
import StaircaseTransition from "@/components/staircase-transition";
import ServicesBento from "@/components/services-bento";
import ProcessBento from "@/components/process-bento";
import ServicesSlider from "@/components/services-slider";
import SplineRobotSection from "@/components/spline-robot-section";
import StatsSection from "@/components/stats-section";
import CallToAction from "@/components/call-to-action";

export default function Home() {
    return (
        <>
            <HeroSection/>
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
            <SplineRobotSection/>
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

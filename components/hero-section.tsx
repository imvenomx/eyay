'use client'

import {Canvas, useFrame, useThree} from '@react-three/fiber'
import {OrbitControls, Html} from '@react-three/drei'
import * as THREE from 'three'
import {useRef, useMemo, useEffect, useState, useCallback} from 'react'

const PARTICLE_COUNT = 5000
const SPHERE_RADIUS = 2.5

const floatingObjects = [
    {id: 'ai', geometry: 'icosahedron' as const, scale: 0.6, orbitRadius: 4.5, orbitSpeed: 0.15, orbitOffset: 0, yBase: 1, text: 'SOLUZIONI AI\nSistemi intelligenti\nche trasformano il business', textPos: [6.5, 1.5, 0] as [number, number, number]},
    {id: 'automation', geometry: 'box' as const, scale: 0.5, orbitRadius: 4, orbitSpeed: 0.12, orbitOffset: Math.PI * 0.7, yBase: -1.5, text: 'AUTOMAZIONE\nSemplifica le operazioni\nriduci il lavoro manuale', textPos: [-5.5, -1, 2] as [number, number, number]},
    {id: 'data', geometry: 'torus' as const, scale: 0.4, orbitRadius: 5, orbitSpeed: 0.1, orbitOffset: Math.PI * 1.3, yBase: 2.5, text: 'DATI & ML\nDashboard, previsioni\ne sistemi decisionali', textPos: [1.5, 4.5, 3] as [number, number, number]},
    {id: 'growth', geometry: 'octahedron' as const, scale: 0.5, orbitRadius: 4.2, orbitSpeed: 0.13, orbitOffset: Math.PI * 1.8, yBase: 2, text: 'CRESCITA\nWeb, SEO, e-commerce\nper la presenza digitale', textPos: [-4, 3, -3] as [number, number, number]},
    {id: 'voice', geometry: 'cone' as const, scale: 0.45, orbitRadius: 4.8, orbitSpeed: 0.11, orbitOffset: Math.PI * 0.4, yBase: -2, text: 'VOCE AI\nIn entrata, in uscita\nservizio clienti 24/7', textPos: [5, -2.5, -2] as [number, number, number]},
]

const scrollTexts = [
    {heading: 'AI & Automazione\nper il Business Moderno', sub: 'Eey Aay — Il tuo Partner AI', side: 'left' as const},
    {heading: 'Dai chatbot agli agenti vocali\nalla trasformazione digitale', sub: 'Costruiamo sistemi che scalano', side: 'right' as const},
    {heading: 'Risultati concreti\nnon solo tecnologia appariscente', sub: 'Risparmiare tempo · Ridurre i costi · Crescere', side: 'left' as const},
]

// ── Particle Sphere ──
function ParticleSphere({scrollProgress}: { scrollProgress: React.MutableRefObject<number> }) {
    const {positions, dispersed, offsets} = useMemo(() => {
        const pos = new Float32Array(PARTICLE_COUNT * 3)
        const disp = new Float32Array(PARTICLE_COUNT * 3)
        const off = new Float32Array(PARTICLE_COUNT * 3)
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            pos[i * 3] = SPHERE_RADIUS * Math.sin(phi) * Math.cos(theta)
            pos[i * 3 + 1] = SPHERE_RADIUS * Math.sin(phi) * Math.sin(theta)
            pos[i * 3 + 2] = SPHERE_RADIUS * Math.cos(phi)
            const dr = 10 + Math.random() * 15
            disp[i * 3] = dr * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * 8
            disp[i * 3 + 1] = dr * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 8
            disp[i * 3 + 2] = dr * Math.cos(phi) + (Math.random() - 0.5) * 8
            off[i * 3] = Math.random() * Math.PI * 2
            off[i * 3 + 1] = Math.random() * Math.PI * 2
            off[i * 3 + 2] = Math.random() * Math.PI * 2
        }
        return {positions: pos, dispersed: disp, offsets: off}
    }, [])

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geo.setAttribute('aDispersed', new THREE.BufferAttribute(dispersed, 3))
        geo.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 3))
        return geo
    }, [positions, dispersed, offsets])

    const material = useMemo(() => new THREE.ShaderMaterial({
        uniforms: {uTime: {value: 0}, uProgress: {value: 0}},
        vertexShader: `
      attribute vec3 aDispersed; attribute vec3 aOffset;
      uniform float uTime; uniform float uProgress;
      varying float vAlpha;
      void main(){
        vec3 pos = mix(position, aDispersed, uProgress);
        float n = 1.0 - uProgress;
        pos += n*0.08*vec3(sin(uTime*0.5+aOffset.x)*cos(uTime*0.3+aOffset.y),cos(uTime*0.4+aOffset.y)*sin(uTime*0.6+aOffset.z),sin(uTime*0.3+aOffset.z)*cos(uTime*0.5+aOffset.x));
        float a=uTime*0.15*n; float c=cos(a); float s=sin(a);
        pos.xz = mat2(c,-s,s,c)*pos.xz;
        vec4 mv = modelViewMatrix*vec4(pos,1.0);
        gl_PointSize = (12.0 / -mv.z) * (1.0 + uProgress*0.4);
        gl_Position = projectionMatrix*mv;
        vAlpha = mix(1.0, 0.35, uProgress);
      }`,
        fragmentShader: `
      varying float vAlpha;
      void main(){
        float d=length(gl_PointCoord-0.5);
        if(d>0.5) discard;
        float a=smoothstep(0.5,0.1,d)*vAlpha;
        gl_FragColor=vec4(1.0,1.0,1.0,a);
      }`,
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }), [])

    useFrame(({clock}) => {
        material.uniforms.uTime.value = clock.getElapsedTime()
        material.uniforms.uProgress.value = scrollProgress.current
    })
    return <points geometry={geometry} material={material}/>
}

// ── Floating Object ──
function FloatingObject({data, onObjectClick}: { data: (typeof floatingObjects)[number]; onObjectClick: (id: string, tp: [number, number, number]) => void }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const groupRef = useRef<THREE.Group>(null)
    useFrame(({clock}) => {
        if (!groupRef.current || !meshRef.current) return
        const t = clock.getElapsedTime()
        groupRef.current.position.x = Math.cos(t * data.orbitSpeed + data.orbitOffset) * data.orbitRadius
        groupRef.current.position.z = Math.sin(t * data.orbitSpeed + data.orbitOffset) * data.orbitRadius
        groupRef.current.position.y = data.yBase + Math.sin(t * 0.5 + data.orbitOffset) * 0.4
        meshRef.current.rotation.x += 0.004
        meshRef.current.rotation.y += 0.006
    })
    const geo = (() => {
        switch (data.geometry) {
            case 'icosahedron': return <icosahedronGeometry args={[data.scale, 1]}/>
            case 'box': return <boxGeometry args={[data.scale, data.scale, data.scale]}/>
            case 'torus': return <torusGeometry args={[data.scale, data.scale * 0.3, 16, 32]}/>
            case 'octahedron': return <octahedronGeometry args={[data.scale]}/>
            case 'cone': return <coneGeometry args={[data.scale * 0.5, data.scale, 6]}/>
        }
    })()
    return (
        <group ref={groupRef}>
            <mesh ref={meshRef} onClick={() => onObjectClick(data.id, data.textPos)}>
                {geo}
                <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.45}/>
            </mesh>
        </group>
    )
}

function SceneLabel({data, scrollProgress}: { data: (typeof floatingObjects)[number]; scrollProgress: React.MutableRefObject<number> }) {
    const ref = useRef<HTMLDivElement>(null)
    useFrame(() => { if (ref.current) ref.current.style.opacity = String(Math.max(0, 1 - scrollProgress.current * 2.5)) })
    return (
        <Html position={data.textPos} className="pointer-events-none select-none">
            <div ref={ref} className="font-mono text-[10px] text-white/30 whitespace-pre leading-relaxed tracking-[0.15em] uppercase">{data.text}</div>
        </Html>
    )
}

function CameraAnimator({target, isAnimating}: { target: { camPos: THREE.Vector3; lookAt: THREE.Vector3 } | null; isAnimating: React.MutableRefObject<boolean> }) {
    const {camera} = useThree()
    const controlsRef = useRef<any>(null)
    useEffect(() => {
        if (!target) return
        let tween: any
        import('gsap').then(({default: gsap}) => {
            isAnimating.current = true
            tween = gsap.to(camera.position, {
                x: target.camPos.x, y: target.camPos.y, z: target.camPos.z,
                duration: 1.5, ease: 'power3.inOut',
                onUpdate: () => { controlsRef.current?.target.lerp(target.lookAt, 0.1); controlsRef.current?.update() },
                onComplete: () => { isAnimating.current = false },
            })
        })
        return () => tween?.kill?.()
    }, [target, camera, isAnimating])
    return <OrbitControls ref={controlsRef} enableZoom={false} enablePan={false} rotateSpeed={0.4} maxPolarAngle={Math.PI * 0.8} minPolarAngle={Math.PI * 0.2}/>
}

function Scene({scrollProgress}: { scrollProgress: React.MutableRefObject<number> }) {
    const [camTarget, setCamTarget] = useState<{ camPos: THREE.Vector3; lookAt: THREE.Vector3 } | null>(null)
    const isAnimating = useRef(false)
    const handleClick = useCallback((id: string, tp: [number, number, number]) => {
        if (isAnimating.current) return
        const lookAt = new THREE.Vector3(...tp)
        setCamTarget({camPos: lookAt.clone().add(new THREE.Vector3(1.5, 0.5, 3)), lookAt})
    }, [])
    return (
        <>
            <ambientLight intensity={0.4}/><pointLight position={[10, 10, 10]} intensity={0.3}/>
            <ParticleSphere scrollProgress={scrollProgress}/>
            {floatingObjects.map(o => <FloatingObject key={o.id} data={o} onObjectClick={handleClick}/>)}
            {floatingObjects.map(o => <SceneLabel key={`l-${o.id}`} data={o} scrollProgress={scrollProgress}/>)}
            <CameraAnimator target={camTarget} isAnimating={isAnimating}/>
        </>
    )
}

// ── Main export ──
export default function HeroSection() {
    const scrollProgress = useRef(0)
    const heroRef = useRef<HTMLDivElement>(null)
    const canvasWrapRef = useRef<HTMLDivElement>(null)
    const textRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        if (typeof window === 'undefined') return
        const triggers: any[] = []

        const setup = async () => {
            const gsap = (await import('gsap')).default
            const {ScrollTrigger} = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)
            if (!heroRef.current || !canvasWrapRef.current) return

            // Master scroll progress
            triggers.push(ScrollTrigger.create({
                trigger: heroRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.5,
                onUpdate: (self) => { scrollProgress.current = self.progress },
            }))

            // Canvas fade out
            const t1 = gsap.to(canvasWrapRef.current, {
                opacity: 0,
                scrollTrigger: {trigger: heroRef.current, start: '82% top', end: '96% top', scrub: true},
            })
            triggers.push(t1.scrollTrigger)

            // Text 0 — visible by default, only fades OUT
            const el0 = textRefs.current[0]
            if (el0) {
                gsap.set(el0, {opacity: 1, scale: 1, y: 0})
                const t = gsap.to(el0, {
                    opacity: 0, scale: 1.06, y: -20, ease: 'none',
                    scrollTrigger: {trigger: heroRef.current, start: '18% top', end: '28% top', scrub: true},
                })
                triggers.push(t.scrollTrigger)
            }

            // Text 1 — fade IN then OUT
            const el1 = textRefs.current[1]
            if (el1) {
                gsap.set(el1, {opacity: 0, scale: 0.94, y: 20})
                const tIn = gsap.to(el1, {
                    opacity: 1, scale: 1, y: 0, ease: 'none',
                    scrollTrigger: {trigger: heroRef.current, start: '25% top', end: '35% top', scrub: true},
                })
                const tOut = gsap.to(el1, {
                    opacity: 0, scale: 1.06, y: -20, ease: 'none',
                    scrollTrigger: {trigger: heroRef.current, start: '48% top', end: '56% top', scrub: true},
                })
                triggers.push(tIn.scrollTrigger, tOut.scrollTrigger)
            }

            // Text 2 — fade IN then OUT
            const el2 = textRefs.current[2]
            if (el2) {
                gsap.set(el2, {opacity: 0, scale: 0.94, y: 20})
                const tIn = gsap.to(el2, {
                    opacity: 1, scale: 1, y: 0, ease: 'none',
                    scrollTrigger: {trigger: heroRef.current, start: '54% top', end: '64% top', scrub: true},
                })
                const tOut = gsap.to(el2, {
                    opacity: 0, scale: 1.06, y: -20, ease: 'none',
                    scrollTrigger: {trigger: heroRef.current, start: '76% top', end: '84% top', scrub: true},
                })
                triggers.push(tIn.scrollTrigger, tOut.scrollTrigger)
            }
        }

        setup()

        return () => { triggers.forEach(t => t?.kill?.()) }
    }, [])

    return (
        <div ref={heroRef} className="relative overflow-x-clip" style={{height: '400vh'}}>
            <div ref={canvasWrapRef} className="sticky top-0 h-screen w-full overflow-hidden">
                <Canvas camera={{position: [0, 0, 8], fov: 50}} dpr={[1, 2]}
                        gl={{antialias: true, alpha: false}} style={{background: '#000000'}}>
                    <Scene scrollProgress={scrollProgress}/>
                </Canvas>

                <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" style={{clipPath: 'inset(0)'}}>
                    {/* Scroll-driven text slides */}
                    {scrollTexts.map((t, i) => (
                        <div key={i} ref={el => { textRefs.current[i] = el }}
                             className={`absolute bottom-16 max-w-lg px-8 ${t.side === 'left' ? 'left-0' : 'right-0 text-right'}`}
                             style={{willChange: 'transform, opacity, filter'}}>
                            <h1 className="text-3xl md:text-5xl leading-[1.1] mb-3 whitespace-pre-line font-vcr" style={{fontWeight: 500}}>{t.heading}</h1>
                            <p className="text-sm text-white/40 font-mono uppercase tracking-[0.15em]">{t.sub}</p>
                        </div>
                    ))}

                    {/* Scroll hint */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25">Scorri</span>
                        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

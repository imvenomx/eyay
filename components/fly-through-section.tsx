'use client'

import {Canvas, useFrame} from '@react-three/fiber'
import {Html} from '@react-three/drei'
import * as THREE from 'three'
import {useRef, useMemo, useEffect} from 'react'

// ── Stage text data ──
const stages = [
    {label: '01 DISCOVER', heading: 'Discovering\nYour Voice', body: 'We learn your business, identify pain points, and map opportunities where AI and automation create measurable impact.'},
    {label: '02 DESIGN', heading: 'Designing\nThe System', body: 'We architect the right solution — technologies, workflows, and integrations tailored to your exact needs.'},
    {label: '03 BUILD', heading: 'Building With\nPrecision', body: 'We develop, test, and deploy from AI models to integrations to user-facing experiences.'},
    {label: '04 SCALE', heading: 'Scaling\nYour Growth', body: 'We optimize performance, expand capabilities, and ensure systems grow alongside your business.'},
]

// ── Tech text snippets ──
const techTexts = [
    '// VECTOR_SEARCH [-0.25, 0.00, 0.25]',
    '// EMBEDDING_DIM: 1536',
    '// NEURAL_NET.FORWARD()',
    '// LOSS: 0.0023',
    '// BATCH_SIZE: 128',
    '// GPT.INFERENCE()',
    '// RAG.RETRIEVE(query)',
    '// PIPELINE.EXEC()',
    '// ACCURACY: 0.9847',
    '// MODEL.DEPLOY(prod)',
]

// ── Binary number streams (replacing speed lines) ──
function BinaryStreams() {
    const items = useMemo(() => {
        const arr = []
        for (let i = 0; i < 40; i++) {
            // Generate random binary string
            const len = 6 + Math.floor(Math.random() * 12)
            let binary = ''
            for (let j = 0; j < len; j++) binary += Math.random() > 0.5 ? '1' : '0'
            arr.push({
                text: binary,
                pos: [
                    (Math.random() - 0.5) * 18,
                    (Math.random() - 0.5) * 12,
                    -5 - Math.random() * 190,
                ] as [number, number, number],
            })
        }
        return arr
    }, [])

    return (
        <>
            {items.map((item, i) => (
                <Html key={i} position={item.pos} className="pointer-events-none select-none">
                    <span className="font-mono text-[11px] text-black/12 tracking-[0.3em] whitespace-nowrap">
                        {item.text}
                    </span>
                </Html>
            ))}
        </>
    )
}

// ── Floating blocks ──
function FloatingBlocks({count}: { count: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const data = useMemo(() => {
        const d = []
        for (let i = 0; i < count; i++) {
            d.push({
                x: (Math.random() - 0.5) * 16,
                y: (Math.random() - 0.5) * 10,
                z: -10 - Math.random() * 180,
                w: 0.5 + Math.random() * 1.5,
                h: 0.08 + Math.random() * 0.15,
                rx: Math.random() * Math.PI,
                ry: Math.random() * Math.PI,
            })
        }
        return d
    }, [count])

    useEffect(() => {
        if (!meshRef.current) return
        const temp = new THREE.Object3D()
        data.forEach((d, i) => {
            temp.position.set(d.x, d.y, d.z)
            temp.rotation.set(d.rx, d.ry, 0)
            temp.scale.set(d.w, d.h, d.w * 0.8)
            temp.updateMatrix()
            meshRef.current!.setMatrixAt(i, temp.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    }, [data])

    const mat = useMemo(() => new THREE.MeshBasicMaterial({
        color: '#999', wireframe: true, transparent: true, opacity: 0.2,
    }), [])

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} material={mat}>
            <boxGeometry args={[1, 1, 1]}/>
        </instancedMesh>
    )
}

// ── Floating tech text ──
function TechTexts() {
    const items = useMemo(() =>
        techTexts.map((text, i) => ({
            text,
            pos: [
                (Math.random() - 0.5) * 14,
                (Math.random() - 0.5) * 8,
                -15 - i * 18,
            ] as [number, number, number],
        })), [])

    return (
        <>
            {items.map((item, i) => (
                <Html key={i} position={item.pos} className="pointer-events-none select-none">
                    <span className="font-mono text-[9px] text-black/15 tracking-wider whitespace-nowrap">
                        {item.text}
                    </span>
                </Html>
            ))}
        </>
    )
}

// ── Final dark object ──
function FinalObject({scrollProgress}: { scrollProgress: React.MutableRefObject<number> }) {
    const ref = useRef<THREE.Mesh>(null)

    useFrame(({clock}) => {
        if (!ref.current) return
        const p = scrollProgress.current
        // Appear in the last 20% of scroll
        const appear = Math.max(0, (p - 0.8) / 0.2)
        ref.current.position.y = -5 + appear * 5
        ref.current.material.opacity = appear
        ref.current.rotation.y = clock.getElapsedTime() * 0.3
        ref.current.rotation.x = clock.getElapsedTime() * 0.15
    })

    return (
        <mesh ref={ref} position={[0, -5, -8]}>
            <icosahedronGeometry args={[2.5, 1]}/>
            <meshBasicMaterial color="#111" wireframe transparent opacity={0}/>
        </mesh>
    )
}

// ── Main 3D scene ──
function FlyThroughScene({scrollProgress}: { scrollProgress: React.MutableRefObject<number> }) {
    const groupRef = useRef<THREE.Group>(null)

    useFrame(() => {
        if (!groupRef.current) return
        groupRef.current.position.z = scrollProgress.current * 180
    })

    return (
        <>
            <ambientLight intensity={0.8}/>
            <group ref={groupRef}>
                <BinaryStreams/>
                <FloatingBlocks count={35}/>
                <TechTexts/>
            </group>
            <FinalObject scrollProgress={scrollProgress}/>
        </>
    )
}

// ── Main export ──
export default function FlyThroughSection() {
    const scrollProgress = useRef(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const stageRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        if (typeof window === 'undefined') return
        const setup = async () => {
            const gsap = (await import('gsap')).default
            const {ScrollTrigger} = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)
            if (!containerRef.current) return

            // Drive scroll progress
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top top', end: 'bottom bottom', scrub: 0.8,
                onUpdate: (self) => { scrollProgress.current = self.progress },
            })

            // Text stage transitions (4 stages across scroll)
            stageRefs.current.forEach((el, i) => {
                if (!el) return
                const segmentSize = 0.25
                const enter = i * segmentSize
                const exitStart = enter + segmentSize * 0.65
                const exitEnd = enter + segmentSize

                // Initial: hidden
                gsap.set(el, {opacity: 0, scale: 0.88, filter: 'blur(14px)'})

                // Enter
                gsap.to(el, {
                    opacity: 1, scale: 1, filter: 'blur(0px)',
                    scrollTrigger: {
                        trigger: containerRef.current, scrub: true,
                        start: `${enter * 100}% top`,
                        end: `${(enter + segmentSize * 0.35) * 100}% top`,
                    },
                })

                // Exit (except last — it stays a bit longer)
                if (i < stages.length - 1) {
                    gsap.to(el, {
                        opacity: 0, scale: 1.12, filter: 'blur(14px)',
                        scrollTrigger: {
                            trigger: containerRef.current, scrub: true,
                            start: `${exitStart * 100}% top`,
                            end: `${exitEnd * 100}% top`,
                        },
                    })
                } else {
                    gsap.to(el, {
                        opacity: 0, scale: 1.12, filter: 'blur(14px)',
                        scrollTrigger: {
                            trigger: containerRef.current, scrub: true,
                            start: '85% top', end: '95% top',
                        },
                    })
                }
            })
        }
        setup()
    }, [])

    return (
        <div ref={containerRef} className="relative" data-nav-theme="light" style={{height: '500vh'}}>
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Light bg canvas */}
                <Canvas
                    camera={{position: [0, 0, 5], fov: 55}}
                    dpr={[1, 1.5]}
                    gl={{antialias: true, alpha: false}}
                    onCreated={({gl}) => { gl.setClearColor('#f0efe9', 1) }}
                    style={{background: '#f0efe9'}}
                >
                    <FlyThroughScene scrollProgress={scrollProgress}/>
                </Canvas>

                {/* Grain overlay */}
                <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.035]"
                     style={{
                         backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                         backgroundRepeat: 'repeat',
                         backgroundSize: '256px 256px',
                     }}/>

                {/* Text stage overlays */}
                <div className="absolute inset-0 flex items-center justify-center z-[2] pointer-events-none">
                    {stages.map((stage, i) => (
                        <div
                            key={i}
                            ref={el => { stageRefs.current[i] = el }}
                            className="absolute text-center px-6 max-w-2xl"
                            style={{willChange: 'transform, opacity, filter'}}
                        >
                            <span className="inline-block font-mono text-[11px] tracking-[0.3em] uppercase text-black/40 mb-4">
                                {stage.label}
                            </span>
                            <h2 className="text-5xl md:text-7xl font-bold text-black leading-[1] tracking-tight whitespace-pre-line mb-6">
                                {stage.heading}
                            </h2>
                            <p className="text-sm font-mono text-black/40 leading-relaxed max-w-md mx-auto">
                                {stage.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

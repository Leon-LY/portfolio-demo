import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function TorusRing({ radius, tube, color, opacity, speed, tilt }: {
  radius: number; tube: number; color: string; opacity: number; speed: number; tilt: [number, number, number]
}) {
  const ref = useRef<THREE.Mesh>(null)
  const geom = useMemo(() => new THREE.TorusGeometry(radius, tube, 32, 120), [radius, tube])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed
  })

  return (
    <mesh ref={ref} geometry={geom} rotation={tilt}>
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

function OrbitingDots({ count, radius, color, size, speed }: {
  count: number; radius: number; color: string; size: number; speed: number
}) {
  const ref = useRef<THREE.Group>(null)
  const geom = useMemo(() => new THREE.SphereGeometry(size, 8, 8), [size])
  const dots = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      arr.push(Math.cos(a) * radius, 0, Math.sin(a) * radius)
    }
    return arr
  }, [count, radius])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed
  })

  return (
    <group ref={ref}>
      {Array.from({ length: count }, (_, i) => (
        <mesh key={i} geometry={geom} position={[dots[i * 3], dots[i * 3 + 1], dots[i * 3 + 2]]}>
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Outer ring — bright cyan */}
      <TorusRing radius={1.3} tube={0.012} color="#00E5FF" opacity={0.6} speed={0.15} tilt={[1.2, 0, 0]} />
      {/* Middle ring — violet */}
      <TorusRing radius={0.9} tube={0.018} color="#7C3AED" opacity={0.4} speed={-0.2} tilt={[0, 0.7, 0]} />
      {/* Inner ring — brighter cyan */}
      <TorusRing radius={0.55} tube={0.025} color="#00E5FF" opacity={0.7} speed={0.3} tilt={[0.5, 0, 0]} />

      {/* Orbiting dots */}
      <OrbitingDots count={50} radius={1.3} color="#00E5FF" size={0.06} speed={0.4} />
      <OrbitingDots count={35} radius={0.9} color="#7C3AED" size={0.05} speed={-0.35} />
      <OrbitingDots count={25} radius={0.55} color="#00E5FF" size={0.07} speed={0.55} />

      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[0.07, 32, 32]} />
        <meshBasicMaterial color="#00E5FF" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.25} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.08} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.03} />
      </mesh>
    </group>
  )
}

export default function Hero3D() {
  return (
    <div className="w-full h-full min-h-[360px] lg:min-h-[460px]" style={{ background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.06) 0%, transparent 60%)' }}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        style={{ background: '#000' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

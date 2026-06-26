import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function TorusRing({ radius, tube, color, opacity, rotationSpeed, tilt }: {
  radius: number; tube: number; color: string; opacity: number; rotationSpeed: number; tilt: [number, number, number]
}) {
  const ref = useRef<THREE.Mesh>(null)
  const geom = useMemo(() => new THREE.TorusGeometry(radius, tube, 24, 100), [radius, tube])
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * rotationSpeed
  })
  return (
    <mesh ref={ref} geometry={geom} rotation={tilt}>
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  )
}

function OrbitingDots({ count, radius, color }: { count: number; radius: number; color: string }) {
  const ref = useRef<THREE.Group>(null)
  const geom = useMemo(() => new THREE.SphereGeometry(0.035, 6, 6), [])
  const dots = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      arr.push(Math.cos(a) * radius, 0, Math.sin(a) * radius)
    }
    return arr
  }, [count, radius])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.5
  })

  return (
    <group ref={ref}>
      {Array.from({ length: count }, (_, i) => (
        <mesh key={i} geometry={geom} position={[dots[i * 3], dots[i * 3 + 1], dots[i * 3 + 2]]}>
          <meshBasicMaterial color={color} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.12
    }
  })

  return (
    <group ref={groupRef}>
      <TorusRing radius={1.2} tube={0.015} color="#00E5FF" opacity={0.12} rotationSpeed={0.2} tilt={[1.2, 0, 0]} />
      <TorusRing radius={0.85} tube={0.02} color="#7C3AED" opacity={0.1} rotationSpeed={-0.25} tilt={[0, 0.8, 0]} />
      <TorusRing radius={0.5} tube={0.025} color="#00E5FF" opacity={0.2} rotationSpeed={0.35} tilt={[0.6, 0, 0]} />
      <OrbitingDots count={60} radius={1.2} color="#00E5FF" />
      <OrbitingDots count={40} radius={0.85} color="#7C3AED" />
      <OrbitingDots count={30} radius={0.5} color="#00E5FF" />
      {/* Core */}
      <mesh>
        <sphereGeometry args={[0.06, 32, 32]} />
        <meshBasicMaterial color="#00E5FF" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.08} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.03} />
      </mesh>
    </group>
  )
}

export default function Hero3D() {
  return (
    <div className="w-full h-full min-h-[320px] lg:min-h-[420px]">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}

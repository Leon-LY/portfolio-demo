import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Rotating data torus — wireframe + particle orbit.
 * A dense tech visualization: nested rings + orbiting dots + core glow.
 */
function DataRing({ radius, tubeR, color, segments }: { radius: number; tubeR: number; color: string; segments: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const geom = useMemo(() => new THREE.TorusGeometry(radius, tubeR, 16, segments), [radius, tubeR, segments])
  return (
    <mesh ref={ref} geometry={geom} rotation={[Math.PI / 2.5, 0, 0]}>
      <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
    </mesh>
  )
}

function OrbitingDots({ count, radius, color }: { count: number; radius: number; color: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const dots = useMemo(() => {
    const positions: number[] = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      positions.push(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
    }
    return positions
  }, [count, radius])

  const dotGeom = useMemo(() => new THREE.SphereGeometry(0.04, 6, 6), [])

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }, (_, i) => (
        <mesh key={i} geometry={dotGeom} position={[dots[i * 3], dots[i * 3 + 1], dots[i * 3 + 2]]}>
          <meshBasicMaterial color={color} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

function SceneContent() {
  const mainGroup = useRef<THREE.Group>(null)
  const ring1Ref = useRef<THREE.Group>(null)
  const ring2Ref = useRef<THREE.Group>(null)
  const ring3Ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (mainGroup.current) {
      mainGroup.current.rotation.y = t * 0.15
      mainGroup.current.rotation.x = Math.sin(t * 0.2) * 0.1
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * speedVals[0]
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * speedVals[1]
    if (ring3Ref.current) ring3Ref.current.rotation.y = t * speedVals[2]
  })

  const speedVals = [0.4, -0.3, 0.25]
  const radiusVals = [0.5, 0.8, 1.05]
  const tubeVals = [0.02, 0.015, 0.02]

  return (
    <group ref={mainGroup}>
      {/* Nested torus rings */}
      {radiusVals.map((r, i) => (
        <group key={i} ref={[ring1Ref, ring2Ref, ring3Ref][i]}>
          <DataRing radius={r} tubeR={tubeVals[i]} color={i === 0 ? '#00E5FF' : i === 1 ? '#7C3AED' : '#00B8D4'} segments={80 + i * 20} />
        </group>
      ))}
      {/* Orbiting dots on each ring */}
      <group ref={ring1Ref}><OrbitingDots count={40} radius={0.5} color="#00E5FF" /></group>
      <group ref={ring2Ref}><OrbitingDots count={30} radius={0.8} color="#7C3AED" /></group>
      <group ref={ring3Ref}><OrbitingDots count={50} radius={1.05} color="#00B8D4" /></group>
      {/* Core glow sphere */}
      <mesh>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.9} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.06} />
      </mesh>
    </group>
  )
}

export default function Hero3D() {
  return (
    <div className="w-full h-full min-h-[320px] lg:min-h-[420px]">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}

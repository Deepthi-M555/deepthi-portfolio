import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Facets({ pointer }) {
  const group = useRef(null)

  useFrame((state, delta) => {
    if (!group.current) return
    const position = pointer.current
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, position.x * 0.12, 2, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -position.y * 0.08, 2, delta)
    group.current.rotation.z += delta * 0.012
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.08
  })

  return (
    <group ref={group} position={[1.75, 0.05, 0]}>
      <mesh position={[0.55, 0.05, -0.6]} rotation={[0.3, 0.2, 0.1]}>
        <icosahedronGeometry args={[1.02, 0]} />
        <meshStandardMaterial color="#668cff" roughness={0.52} metalness={0.18} transparent opacity={0.2} wireframe />
      </mesh>
      <mesh position={[-1.45, 0.8, 0.2]} rotation={[0.4, 0.1, 0.3]}>
        <dodecahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial color="#8ce8ff" roughness={0.58} metalness={0.12} transparent opacity={0.38} />
      </mesh>
      <mesh position={[1.8, -0.95, -0.1]} rotation={[0.2, 0.5, 0]}>
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial color="#a98bff" roughness={0.58} metalness={0.12} transparent opacity={0.34} />
      </mesh>
      <mesh position={[-0.55, -1.1, -0.4]} rotation={[0.6, 0.2, 0.4]}>
        <icosahedronGeometry args={[0.19, 0]} />
        <meshStandardMaterial color="#72dda7" roughness={0.55} metalness={0.16} transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

export default function HeroDepth({ pointer }) {
  return (
    <div className="hero-depth" aria-hidden="true">
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 7], fov: 44 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={1.25} />
        <pointLight position={[2, 2, 4]} color="#80dfff" intensity={2} distance={8} />
        <Facets pointer={pointer} />
      </Canvas>
    </div>
  )
}

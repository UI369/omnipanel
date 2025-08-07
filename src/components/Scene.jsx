import { Canvas } from '@react-three/fiber'
import { GoldenPlane } from './GoldenPlane'
import { GridOverlay } from './GridOverlay'
import { GoldenBorder } from './GoldenBorder'

export function Scene() {
  return (
    <Canvas
      camera={{ 
        position: [0, 0, 5],
        fov: 75
      }}
      style={{ 
        pointerEvents: 'none' // Let HUD capture events
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <GoldenBorder />
      <GoldenPlane />
      <GridOverlay />
    </Canvas>
  )
}
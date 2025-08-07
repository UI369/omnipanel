import { useContext } from 'react'
import { Canvas } from '@react-three/fiber'
import { PlaneComposite } from './PlaneComposite'
import { SceneContext } from '../context/SceneContext'

export function Scene() {
  const { isOrthographic } = useContext(SceneContext)
  
  return (
    <Canvas
      key={isOrthographic ? 'ortho' : 'persp'}
      orthographic={isOrthographic}
      camera={{
        position: [0, 0, 5],
        fov: 75
      }}
      style={{ 
        pointerEvents: 'auto'
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <PlaneComposite />
    </Canvas>
  )
}
import { useRef, useContext } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useResponsiveCamera } from '../hooks/useResponsiveCamera'
import { SceneContext } from '../context/SceneContext'

const PLANE_RATIO = 1.6

export function GoldenPlane() {
  const planeRef = useRef()
  const { planeColor, rotation, scale } = useContext(SceneContext)
  
  // Hook to handle responsive camera positioning
  useResponsiveCamera(planeRef)
  
  // Fixed plane dimensions (camera will adjust to frame it properly)
  const baseWidth = 8
  const planeWidth = baseWidth
  const planeHeight = planeWidth / PLANE_RATIO
  
  // Animation loop for any continuous updates
  useFrame((state, delta) => {
    if (planeRef.current) {
      // Plane never rotates or scales - it's always the same size and orientation
      // Only the camera moves to create the illusion of changes
    }
  })
  
  return (
    <mesh ref={planeRef}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial 
        color={planeColor} 
        side={2} // DoubleSide
        transparent 
        opacity={0.8}
      />
    </mesh>
  )
}
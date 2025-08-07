import { useThree } from '@react-three/fiber'
import { useEffect, useContext } from 'react'
import * as THREE from 'three'
import { SceneContext } from '../context/SceneContext'

const GOLDEN_RATIO = 1.618
const SCREEN_WIDTH_PERCENTAGE = 0.9

export function useResponsiveCamera(planeRef) {
  const { camera, size } = useThree()
  const { rotation, scale } = useContext(SceneContext)
  
  useEffect(() => {
    if (!planeRef.current) return
    
    const updateCamera = () => {
      const { width: screenWidth, height: screenHeight } = size
      const aspect = screenWidth / screenHeight
      
      // Fixed plane dimensions (1:1.6 ratio for even square tiling)
      const baseWidth = 8
      const planeWidth = baseWidth
      const planeHeight = planeWidth / 1.6
      
      // Account for golden border (0.4 units on each side)
      const borderWidth = 0.4
      const totalWidth = planeWidth + (borderWidth * 2)
      const totalHeight = planeHeight + (borderWidth * 2)
      
      // Update plane geometry (keep consistent size)
      planeRef.current.geometry.dispose()
      planeRef.current.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight)
      
      const fovRadians = camera.fov * (Math.PI / 180)
      const halfFov = fovRadians / 2
      
      // Step 1: Calculate distance needed for TOTAL WIDTH (plane + border) to fill 90% of screen WIDTH
      const desiredWidthInView = totalWidth / SCREEN_WIDTH_PERCENTAGE
      const distanceForWidth = (desiredWidthInView / 2) / Math.tan(halfFov) / aspect
      
      // Step 2: At that distance, what height can the camera see?
      const viewableHeightAtDistance = 2 * Math.tan(halfFov) * distanceForWidth
      
      // Step 3: If TOTAL HEIGHT (plane + border) is more than 90% of viewable height, pull back
      const maxPlaneHeightRatio = 0.9  // Total area shouldn't fill more than 90% of height
      const requiredViewHeight = totalHeight / maxPlaneHeightRatio
      
      let finalDistance
      if (viewableHeightAtDistance >= requiredViewHeight) {
        // Width constraint is limiting factor
        finalDistance = distanceForWidth
      } else {
        // Height constraint is limiting factor - calculate distance for height
        finalDistance = requiredViewHeight / (2 * Math.tan(halfFov))
      }
      
      // Apply scale by moving camera closer/farther (inverse relationship)
      const distance = finalDistance / scale
      
      // Apply rotation by rotating the camera around the plane
      const x = Math.sin(rotation) * distance
      const z = Math.cos(rotation) * distance
      
      // Position camera with rotation and scale effects
      camera.position.set(x, 0, z)
      camera.lookAt(0, 0, 0)
      camera.updateProjectionMatrix()
    }
    
    updateCamera()
    
    // Listen for window resize
    window.addEventListener('resize', updateCamera)
    return () => window.removeEventListener('resize', updateCamera)
  }, [camera, size, planeRef, rotation, scale])
}
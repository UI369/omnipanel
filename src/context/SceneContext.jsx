import { createContext, useState, useCallback } from 'react'

export const SceneContext = createContext()

export function SceneProvider({ children }) {
  // 3D scene state
  const [planeColor, setPlaneColor] = useState('#4f46e5')
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  
  // HUD actions that affect the 3D scene
  const actions = {
    rotatePlane: useCallback((angle) => {
      setRotation(angle)
    }, []),
    
    scalePlane: useCallback((scaleValue) => {
      setScale(scaleValue)
    }, []),
    
    changePlaneColor: useCallback((color) => {
      setPlaneColor(color)
    }, []),
    
    resetPlane: useCallback(() => {
      setRotation(0)
      setScale(1)
      setPlaneColor('#4f46e5')
    }, [])
  }
  
  const value = {
    // State
    planeColor,
    rotation,
    scale,
    // Actions
    ...actions
  }
  
  return (
    <SceneContext.Provider value={value}>
      {children}
    </SceneContext.Provider>
  )
}
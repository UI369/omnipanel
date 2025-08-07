import { createContext, useState, useCallback } from 'react'

export const SceneContext = createContext()

export function SceneProvider({ children }) {
  // 3D scene state
  const [planeColor, setPlaneColor] = useState('#4f46e5')
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const [clickedTiles, setClickedTiles] = useState(new Set())
  const [isOrthographic, setIsOrthographic] = useState(false)
  
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
    
    toggleTile: useCallback((tileId) => {
      setClickedTiles(prev => {
        const newSet = new Set(prev)
        if (newSet.has(tileId)) {
          newSet.delete(tileId)
        } else {
          newSet.add(tileId)
        }
        return newSet
      })
    }, []),
    
    toggleCameraType: useCallback(() => {
      setIsOrthographic(prev => !prev)
    }, []),
    
    resetPlane: useCallback(() => {
      setRotation(0)
      setScale(1)
      setPlaneColor('#4f46e5')
      setClickedTiles(new Set())
      setIsOrthographic(false)
    }, [])
  }
  
  const value = {
    // State
    planeColor,
    rotation,
    scale,
    clickedTiles,
    isOrthographic,
    // Actions
    ...actions
  }
  
  return (
    <SceneContext.Provider value={value}>
      {children}
    </SceneContext.Provider>
  )
}
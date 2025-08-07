import { useMemo, useContext, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { SceneContext } from '../context/SceneContext'
import { PLANE_CONFIG } from '../config/planeConfig'
import { MaterialFactory } from '../factories/MaterialFactory'

function ClickableTile({ tile }) {
  const { clickedTiles, toggleTile } = useContext(SceneContext)
  const meshRef = useRef()
  const isClicked = clickedTiles.has(tile.id)
  
  // Animate levitation
  useFrame((state, delta) => {
    if (meshRef.current) {
      const targetZ = isClicked ? 0.05 : 0
      meshRef.current.position.z += (targetZ - meshRef.current.position.z) * delta * 5
    }
  })
  
  const materialProps = MaterialFactory.createClickableTileMaterial(tile.color, isClicked);
  
  return (
    <mesh 
      ref={meshRef}
      position={[tile.x, -tile.y, 0]} 
      onClick={(e) => {
        e.stopPropagation()
        toggleTile(tile.id)
      }}
      onPointerOver={(e) => {
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={(e) => {
        document.body.style.cursor = 'default'
      }}
    >
      <planeGeometry args={[tile.size * 0.95, tile.size * 0.95]} />
      <meshBasicMaterial {...materialProps} />
    </mesh>
  )
}

export function GridOverlay() {
  const gridData = useMemo(() => {
    // Generate grid positions
    const tiles = []
    for (let row = 0; row < PLANE_CONFIG.verticalTiles; row++) {
      for (let col = 0; col < PLANE_CONFIG.horizontalTiles; col++) {
        const x = (col * PLANE_CONFIG.tileSize) - (PLANE_CONFIG.baseWidth / 2) + (PLANE_CONFIG.tileSize / 2) + PLANE_CONFIG.gridOffsetX
        const y = (row * PLANE_CONFIG.tileSize) - (PLANE_CONFIG.planeHeight / 2) + (PLANE_CONFIG.tileSize / 2)
        
        // Create checkerboard pattern (red/green alternating)
        const isEven = (row + col) % 2 === 0
        const color = isEven ? '#8b0000' : '#006400'
        
        tiles.push({
          id: `${row}-${col}`,
          x,
          y,
          size: PLANE_CONFIG.tileSize,
          color
        })
      }
    }
    
    return { tiles }
  }, [])
  
  return (
    <group position={[0, 0, PLANE_CONFIG.layers.grid]}>
      {gridData.tiles.map((tile) => (
        <ClickableTile key={tile.id} tile={tile} />
      ))}
    </group>
  )
}
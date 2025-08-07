import { useMemo } from 'react'

const PLANE_RATIO = 1.6
const VERTICAL_TILES = 10

export function GridOverlay() {
  const gridData = useMemo(() => {
    // Plane dimensions (same as GoldenPlane)
    const planeWidth = 8
    const planeHeight = planeWidth / PLANE_RATIO
    
    // Calculate tile size based on height divided by 10
    const tileSize = planeHeight / VERTICAL_TILES
    
    // Calculate how many tiles fit horizontally (should be exactly 16)
    const horizontalTiles = Math.floor(planeWidth / tileSize)
    
    // Calculate leftover space to center the grid
    const totalGridWidth = horizontalTiles * tileSize
    const leftoverSpace = planeWidth - totalGridWidth
    const offsetX = leftoverSpace / 2
    
    // Generate grid positions
    const tiles = []
    for (let row = 0; row < VERTICAL_TILES; row++) {
      for (let col = 0; col < horizontalTiles; col++) {
        const x = (col * tileSize) - (planeWidth / 2) + (tileSize / 2) + offsetX
        const y = (row * tileSize) - (planeHeight / 2) + (tileSize / 2)
        
        tiles.push({
          id: `${row}-${col}`,
          x,
          y,
          size: tileSize
        })
      }
    }
    
    return { tiles, tileSize }
  }, [])
  
  return (
    <group position={[0, 0, 0.001]}> {/* Slightly in front of plane */}
      {gridData.tiles.map((tile) => (
        <mesh key={tile.id} position={[tile.x, -tile.y, 0]}> {/* Flip Y for correct orientation */}
          <planeGeometry args={[tile.size * 0.98, tile.size * 0.98]} /> {/* 98% size for grid lines */}
          <meshBasicMaterial 
            color="#ffffff"
            transparent 
            opacity={0.1}
            side={2}
          />
        </mesh>
      ))}
    </group>
  )
}
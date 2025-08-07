import { useMemo, useContext, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { SceneContext } from '../context/SceneContext'

const PLANE_RATIO = 1.6
const VERTICAL_TILES = 10

function ClickableTile({ tile }) {
  const { clickedTiles, toggleTile } = useContext(SceneContext)
  const meshRef = useRef()
  const isClicked = clickedTiles.has(tile.id)
  
  // Animate levitation
  useFrame((state, delta) => {
    if (meshRef.current) {
      const targetZ = isClicked ? 0.05 : 0 // Levitate 0.05 units when clicked
      meshRef.current.position.z += (targetZ - meshRef.current.position.z) * delta * 5
    }
  })
  
  // Determine color based on click state
  const displayColor = isClicked ? '#ffd700' : tile.color // Gold when clicked, original when not
  
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
      <meshBasicMaterial 
        color={displayColor}
        transparent 
        opacity={0.8}
        side={2}
      />
    </mesh>
  )
}

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
        
        // Create checkerboard pattern (red/green alternating)
        const isEven = (row + col) % 2 === 0
        const color = isEven ? '#8b0000' : '#006400' // Dark red : Dark green
        
        tiles.push({
          id: `${row}-${col}`,
          x,
          y,
          size: tileSize,
          color
        })
      }
    }
    
    return { tiles, tileSize }
  }, [])
  
  return (
    <group position={[0, 0, 0.001]}> {/* Slightly in front of plane */}
      {gridData.tiles.map((tile) => (
        <ClickableTile key={tile.id} tile={tile} />
      ))}
    </group>
  )
}
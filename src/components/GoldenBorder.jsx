const PLANE_RATIO = 1.6
const BORDER_WIDTH = 0.4 // Equal border width on all sides

export function GoldenBorder() {
  // Main plane dimensions
  const planeWidth = 8
  const planeHeight = planeWidth / PLANE_RATIO
  
  // Border plane dimensions (add equal border on all sides)
  const borderPlaneWidth = planeWidth + (BORDER_WIDTH * 2)
  const borderPlaneHeight = planeHeight + (BORDER_WIDTH * 2)
  
  return (
    <mesh position={[0, 0, -0.002]}> {/* Slightly behind main plane */}
      <planeGeometry args={[borderPlaneWidth, borderPlaneHeight]} />
      <meshStandardMaterial 
        color="#c0c0c0" // Metallic silver
        metalness={0.9} // Very metallic
        roughness={0.1} // Very smooth/shiny
        transparent 
        opacity={0.95}
        side={2}
      />
    </mesh>
  )
}
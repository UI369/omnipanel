import { GoldenBorder } from './GoldenBorder'
import { GoldenPlane } from './GoldenPlane'
import { GridOverlay } from './GridOverlay'

export function PlaneComposite() {
  return (
    <group>
      <GoldenBorder />
      <GoldenPlane />
      <GridOverlay />
    </group>
  )
}
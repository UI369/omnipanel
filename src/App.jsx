import { SceneProvider } from './context/SceneContext'
import { Scene } from './components/Scene'
import { TopHUD } from './components/hud/TopHUD'
import { BottomHUD } from './components/hud/BottomHUD'
import './App.css'

function App() {
  return (
    <SceneProvider>
      <div className="app">
        <TopHUD />
        
        <div className="scene-container">
          <Scene />
        </div>
        
        <BottomHUD />
      </div>
    </SceneProvider>
  )
}

export default App
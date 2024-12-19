import { useState } from 'react'
import Header from './components/Header'

function App() {
  const [presupuestos, setPresupuestos] = useState(0)

  return (
    <>
      <div>
        <Header 
          presupuestos={presupuestos}
          setPresupuestos={setPresupuestos}
        />
      </div>
    </>
  )
}

export default App

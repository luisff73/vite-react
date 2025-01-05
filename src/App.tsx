import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h2>Vite + React</h2>
      <h1>Practica Jenkins Luis Ferri</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Valor del contador {count}
        </button>
        <p>
          Puedes editar <code>src/App.tsx</code> y grabar para hacer un test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Haz click en los logos para aprender más.
      </p>
    </>
  )
}

export default App

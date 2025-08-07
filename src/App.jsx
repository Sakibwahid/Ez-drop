import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QRGenerator from './components/QRGenerator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-amber-400 h-screen'>
      <QRGenerator></QRGenerator>
    </div>
  )
}

export default App

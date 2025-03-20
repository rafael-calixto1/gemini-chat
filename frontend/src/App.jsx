import { useState } from 'react'
import './App.css'




function App() {
  const [count, setCount] = useState(0)


  return (
    <div className='App'>
      <header className='bg-primary text-white text-center py-4'>
        <h1>Gemini ChatBot</h1>
      </header>
    </div>
  )
}


export default App
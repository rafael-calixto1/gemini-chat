import { useState } from 'react'
import './App.css'
import TextInput from './components/TextInput'
import MediaInput from './components/MediaInput'
import ChatResponse from './components/ChatResponse'
import { chatService } from './services'


function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputMode, setInputMode] = useState('text'); // 'text' or 'media'


  const handleTextQuestion = async (question) => {
    setLoading(true);
    setResponse(null);
    try {
      const apiResponse = await chatService.sendTextQuestion(question);
      setResponse(apiResponse);
    } catch (error) {
      alert("Failed to get response");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  const handleMediaQuestion = async (prompt, mediaFile, mediaType) => {
    setLoading(true);
    setResponse(null);
    try {
      const apiResponse = await chatService.sendMediaQuestion(prompt, mediaFile, mediaType);
      setResponse(apiResponse);
    } catch (error) {
      alert("Failed to get response");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  const toggleInputMode = () => {
    setInputMode(inputMode === 'text' ? 'media' : 'text');
  }


  return (
    <div className='App'>
      <header className='bg-primary text-white text-center py-4'>
        <h1>Gemini ChatBot</h1>
      </header>
     
      <div className="container mt-4">
        <div className="d-flex justify-content-center mb-3">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn ${inputMode === 'text' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setInputMode('text')}
            >
              Text Only
            </button>
            <button
              type="button"
              className={`btn ${inputMode === 'media' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setInputMode('media')}
            >
              Media + Text
            </button>
          </div>
        </div>
      </div>
     
      {inputMode === 'text' ? (
        <TextInput onSubmit={handleTextQuestion} />
      ) : (
        <MediaInput onSubmit={handleMediaQuestion} />
      )}
     
      {loading && <div className="text-center"><h3>Loading...</h3></div>}
      <ChatResponse response={response} />
    </div>
  )
}


export default App
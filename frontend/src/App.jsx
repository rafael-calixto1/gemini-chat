import { useState } from 'react'
import './App.css'
import ChatInput from './components/ChatInput'
import ImageChatInput from './components/ImageChatInput'
import ChatResponse from './components/ChatResponse'
import { fetchChatResponse, fetchImageChatResponse } from './services/api';


function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputMode, setInputMode] = useState('text'); // 'text' or 'image'


  const handleQuestionSubmit = async (question) => {
    setLoading(true);
    setResponse(null);
    try {
      const apiResponse = await fetchChatResponse(question);
      setResponse(apiResponse);
    } catch (error) {
      alert("Failed to get response");
    } finally {
      setLoading(false);
    }
  }


  const handleImageQuestionSubmit = async (prompt, imageFile) => {
    setLoading(true);
    setResponse(null);
    try {
      const apiResponse = await fetchImageChatResponse(prompt, imageFile);
      setResponse(apiResponse);
    } catch (error) {
      alert("Failed to get response");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  const toggleInputMode = () => {
    setInputMode(inputMode === 'text' ? 'image' : 'text');
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
              className={`btn ${inputMode === 'image' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setInputMode('image')}
            >
              Image + Text
            </button>
          </div>
        </div>
      </div>
     
      {inputMode === 'text' ? (
        <ChatInput onSubmit={handleQuestionSubmit} />
      ) : (
        <ImageChatInput onSubmit={handleImageQuestionSubmit} />
      )}
     
      {loading && <div className="text-center"><h3>Loading...</h3></div>}
      <ChatResponse response={response} />
    </div>
  )
}


export default App
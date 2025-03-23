import { useState, useRef, useEffect } from "react";

const ChatInput = ({ onSubmit }) => {
    const [question, setQuestion] = useState("");
    
    // Speech recognition states
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    // Initialize speech recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            
            recognitionRef.current.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');
                
                setQuestion(transcript);
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }

        return () => {
            stopListening();
        };
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (question.trim()) {
            onSubmit(question);
            setQuestion("");
        }
    }

    // Start speech-to-text listening
    const startListening = () => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (error) {
                console.error("Error starting speech recognition:", error);
            }
        } else {
            alert("Speech recognition is not supported in your browser.");
        }
    };

    // Stop speech-to-text listening
    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    // Toggle speech recognition
    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <div className="container my-4">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="question">Ask a Question</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className="form-control"
                            id="question"
                            placeholder="Enter your question or click the mic to speak"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                        />
                        <button 
                            type="button" 
                            className={`btn ${isListening ? 'btn-danger' : 'btn-outline-secondary'}`}
                            onClick={toggleListening}
                            title={isListening ? "Stop dictating" : "Dictate your question"}
                        >
                            <i className={`bi ${isListening ? 'bi-mic-fill' : 'bi-mic'}`}></i>
                            {isListening ? ' Listening...' : ' Speak'}
                        </button>
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary mt-2"
                    disabled={!question.trim() || isListening}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ChatInput;
import { useState } from "react";
import PropTypes from "prop-types";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";

/**
 * Text input component with speech recognition
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback when the form is submitted
 */
const TextInput = ({ onSubmit }) => {
    const [question, setQuestion] = useState("");
    const [isListening, setIsListening] = useState(false);
    
    const { 
        isSupported, 
        startListening, 
        stopListening 
    } = useSpeechRecognition({
        onResult: setQuestion,
        onListeningChange: setIsListening
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (question.trim()) {
            onSubmit(question);
            setQuestion("");
        }
    };

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
                        {isSupported && (
                            <button 
                                type="button" 
                                className={`btn ${isListening ? 'btn-danger' : 'btn-outline-secondary'}`}
                                onClick={toggleListening}
                                title={isListening ? "Stop dictating" : "Dictate your question"}
                            >
                                <i className={`bi ${isListening ? 'bi-mic-fill' : 'bi-mic'}`}></i>
                                {isListening ? ' Listening...' : ' Speak'}
                            </button>
                        )}
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
    );
};

TextInput.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default TextInput; 
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";

/**
 * Component for text input with speech recognition capability
 * @param {Object} props - Component props
 * @param {string} props.value - Current input value
 * @param {Function} props.onChange - Callback when value changes
 * @param {string} props.mediaType - Type of media being responded to (for customized placeholder)
 * @param {boolean} props.isListening - Is speech recognition active
 * @param {Function} props.onListeningChange - Callback when listening state changes
 */
const PromptInput = ({ 
    value, 
    onChange, 
    mediaType, 
    isListening,
    onListeningChange
}) => {
    const { 
        isSupported, 
        startListening, 
        stopListening 
    } = useSpeechRecognition({
        onResult: (transcript) => onChange(transcript),
        onListeningChange: onListeningChange
    });
    
    const getMediaTypeName = () => {
        if (mediaType?.startsWith('image/')) return 'image';
        if (mediaType?.startsWith('audio/')) return 'audio';
        return 'media';
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <div className="form-group mb-3">
            <label htmlFor="prompt">Ask about this {getMediaTypeName()}</label>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    id="prompt"
                    placeholder={`Enter your question about the ${getMediaTypeName()}`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
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
    );
};

PromptInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    mediaType: PropTypes.string,
    isListening: PropTypes.bool.isRequired,
    onListeningChange: PropTypes.func.isRequired
};

export default PromptInput; 
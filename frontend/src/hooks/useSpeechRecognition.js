import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook for speech recognition functionality
 * @param {Object} options - Configuration options
 * @param {Function} options.onResult - Callback when speech is recognized
 * @param {Function} options.onListeningChange - Callback when listening state changes
 * @returns {Object} Speech recognition controls and state
 */
const useSpeechRecognition = ({ onResult, onListeningChange }) => {
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const recognitionRef = useRef(null);

    // Initialize speech recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            setIsSupported(true);
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            
            recognitionRef.current.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');
                
                if (onResult) {
                    onResult(transcript);
                }
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
                if (onListeningChange) {
                    onListeningChange(false);
                }
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
                if (onListeningChange) {
                    onListeningChange(false);
                }
            };
        }

        return () => {
            if (recognitionRef.current && isListening) {
                recognitionRef.current.stop();
            }
        };
    }, [onResult, onListeningChange]);

    // Update parent component when listening state changes
    useEffect(() => {
        if (onListeningChange) {
            onListeningChange(isListening);
        }
    }, [isListening, onListeningChange]);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (error) {
                console.error("Error starting speech recognition:", error);
            }
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }
    };

    return {
        isSupported,
        isListening,
        startListening,
        stopListening
    };
};

export default useSpeechRecognition; 
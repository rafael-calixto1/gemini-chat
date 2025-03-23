import { useState, useRef, useEffect } from "react";

const MediaChatInput = ({ onSubmit }) => {
    const [prompt, setPrompt] = useState("");
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [mediaType, setMediaType] = useState(null);
    
    // Speech recognition states
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    // Clean up speech recognition on component unmount
    useEffect(() => {
        return () => {
            stopListening();
        };
    }, []);

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
                
                setPrompt(transcript);
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (prompt.trim() && mediaFile) {
            onSubmit(prompt, mediaFile, mediaType);
            setPrompt("");
            setMediaFile(null);
            setMediaPreview(null);
            setMediaType(null);
        }
    };

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMediaFile(file);
            setMediaType(file.type);
            
            // Handle preview based on file type
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setMediaPreview({
                        type: 'image',
                        data: reader.result
                    });
                };
                reader.readAsDataURL(file);
            } else if (file.type.startsWith('audio/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setMediaPreview({
                        type: 'audio',
                        data: reader.result
                    });
                };
                reader.readAsDataURL(file);
            } else {
                setMediaPreview(null);
            }
        }
    };

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

    // List of supported audio formats
    const supportedAudioFormats = [
        "audio/wav", 
        "audio/mp3", 
        "audio/aiff", 
        "audio/aac", 
        "audio/ogg", 
        "audio/flac"
    ];

    // Combined accept attribute for file input
    const acceptedFormats = "image/*," + supportedAudioFormats.join(",");
    const audioFormats = supportedAudioFormats.join(",");

    return (
        <div className="container my-4">
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Choose Media Type</label>
                    <div className="d-flex gap-2 mb-3">
                        <button 
                            type="button" 
                            className="btn btn-outline-primary"
                            onClick={() => document.getElementById("media-image").click()}
                        >
                            Upload Image
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-outline-danger"
                            onClick={() => document.getElementById("media-audio").click()}
                        >
                            Upload Audio
                        </button>
                    </div>
                    <input
                        type="file"
                        className="form-control d-none"
                        id="media-image"
                        accept="image/*"
                        onChange={handleMediaChange}
                    />
                    <input
                        type="file"
                        className="form-control d-none"
                        id="media-audio"
                        accept={audioFormats}
                        onChange={handleMediaChange}
                    />
                    <small className="form-text text-muted">
                        Supported audio formats: WAV, MP3, AIFF, AAC, OGG, FLAC
                    </small>
                </div>

                {mediaPreview && mediaPreview.type === 'image' && (
                    <div className="mb-3">
                        <img 
                            src={mediaPreview.data} 
                            alt="Preview" 
                            className="img-thumbnail" 
                            style={{ maxHeight: "200px" }} 
                        />
                    </div>
                )}

                {mediaPreview && mediaPreview.type === 'audio' && (
                    <div className="mb-3">
                        <audio 
                            controls 
                            src={mediaPreview.data}
                            className="w-100"
                        />
                    </div>
                )}

                {mediaFile && (
                    <div className="form-group mb-3">
                        <label htmlFor="prompt">Ask about this {mediaType?.startsWith('image/') ? 'image' : mediaType?.startsWith('audio/') ? 'audio' : 'media'}</label>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                id="prompt"
                                placeholder={`Enter your question about the ${mediaType?.startsWith('image/') ? 'image' : mediaType?.startsWith('audio/') ? 'audio' : 'media'}`}
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
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
                )}

                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={!mediaFile || !prompt.trim() || isListening}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default MediaChatInput;
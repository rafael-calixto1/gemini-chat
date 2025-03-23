import { useState } from "react";
import MediaUploader from "./MediaUploader";
import MediaPreview from "./MediaPreview";
import PromptInput from "../PromptInput";

/**
 * MediaInput component that handles media (image/audio) uploads and question prompts
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback when form is submitted with media and prompt
 */
const MediaInput = ({ onSubmit }) => {
    const [prompt, setPrompt] = useState("");
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [mediaType, setMediaType] = useState(null);
    const [isListening, setIsListening] = useState(false);

    const handleMediaUpload = (file, type, previewData) => {
        setMediaFile(file);
        setMediaType(type);
        setMediaPreview(previewData);
    };

    const handlePromptChange = (text) => {
        setPrompt(text);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (prompt.trim() && mediaFile) {
            onSubmit(prompt, mediaFile, mediaType);
            // Reset form after submission
            setPrompt("");
            setMediaFile(null);
            setMediaPreview(null);
            setMediaType(null);
        }
    };

    return (
        <div className="container my-4">
            <form onSubmit={handleSubmit}>
                <MediaUploader onMediaSelected={handleMediaUpload} />

                {mediaPreview && (
                    <MediaPreview 
                        type={mediaPreview.type} 
                        data={mediaPreview.data} 
                    />
                )}

                {mediaFile && (
                    <PromptInput
                        value={prompt}
                        onChange={handlePromptChange}
                        mediaType={mediaType}
                        onListeningChange={setIsListening}
                        isListening={isListening}
                    />
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

export default MediaInput; 
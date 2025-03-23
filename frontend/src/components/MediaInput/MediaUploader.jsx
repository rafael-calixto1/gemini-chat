import { useMemo } from "react";
import PropTypes from "prop-types";

/**
 * MediaUploader component that provides buttons to upload image or audio files
 * @param {Object} props - Component props
 * @param {Function} props.onMediaSelected - Callback when media is selected
 */
const MediaUploader = ({ onMediaSelected }) => {
    // List of supported audio formats
    const supportedAudioFormats = useMemo(() => [
        "audio/wav", 
        "audio/mp3", 
        "audio/aiff", 
        "audio/aac", 
        "audio/ogg", 
        "audio/flac"
    ], []);

    // Formats string for audio input accept attribute
    const audioFormats = useMemo(() => 
        supportedAudioFormats.join(","), 
    [supportedAudioFormats]);

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const mediaType = file.type;
        
        // Handle preview based on file type
        if (file.type.startsWith('image/') || file.type.startsWith('audio/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onMediaSelected(
                    file, 
                    mediaType, 
                    {
                        type: file.type.startsWith('image/') ? 'image' : 'audio',
                        data: reader.result
                    }
                );
            };
            reader.readAsDataURL(file);
        }
    };

    return (
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
    );
};

MediaUploader.propTypes = {
    onMediaSelected: PropTypes.func.isRequired
};

export default MediaUploader; 
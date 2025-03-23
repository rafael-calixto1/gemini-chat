import { useState } from "react";

const ImageChatInput = ({ onSubmit }) => {
    const [prompt, setPrompt] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (prompt.trim() && imageFile) {
            onSubmit(prompt, imageFile);
            setPrompt("");
            setImageFile(null);
            setImagePreview(null);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container my-4">
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="image">Upload Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>

                {imagePreview && (
                    <div className="mb-3">
                        <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="img-thumbnail" 
                            style={{ maxHeight: "200px" }} 
                        />
                    </div>
                )}

                <div className="form-group mb-3">
                    <label htmlFor="prompt">Ask about this image</label>
                    <input
                        type="text"
                        className="form-control"
                        id="prompt"
                        placeholder="Enter your question about the image"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        required
                    />
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={!imageFile || !prompt.trim()}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ImageChatInput; 
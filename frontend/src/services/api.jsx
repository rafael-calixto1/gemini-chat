import axios from "axios";


const API_URL = "http://localhost:8080/api/qna/ask";
const API_URL_IMAGE = "http://localhost:8080/api/qna/ask-with-image";
const API_URL_AUDIO = "http://localhost:8080/api/qna/ask-with-audio";


export const fetchChatResponse = async (question) => {
    try {
        const response = await axios.post(API_URL, {question});
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const fetchImageChatResponse = async (prompt, imageFile) => {
    try {
        // Convert image to base64
        const base64Image = await fileToBase64(imageFile);
       
        const payload = {
            prompt,
            image: base64Image,
            mimeType: imageFile.type
        };
       
        const response = await axios.post(API_URL_IMAGE, payload);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchAudioChatResponse = async (prompt, audioFile) => {
    try {
        // Convert audio to base64
        const base64Audio = await fileToBase64(audioFile);
       
        const payload = {
            prompt,
            audio: base64Audio,
            mimeType: audioFile.type
        };
       
        const response = await axios.post(API_URL_AUDIO, payload);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchMediaChatResponse = async (prompt, mediaFile, mediaType) => {
    if (mediaType.startsWith('image/')) {
        return fetchImageChatResponse(prompt, mediaFile);
    } else if (mediaType.startsWith('audio/')) {
        return fetchAudioChatResponse(prompt, mediaFile);
    } else {
        throw new Error(`Unsupported media type: ${mediaType}`);
    }
}

// Helper function to convert file to base64
const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Extract the base64 data part from the data URL
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
};

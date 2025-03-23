import apiClient, { ENDPOINTS } from './config';

/**
 * Utility function to convert file to base64
 * @param {File} file - File object to convert
 * @returns {Promise<string>} Base64 encoded file data
 */
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

/**
 * Service for chat-related API interactions
 */
const chatService = {
    /**
     * Send a text-only question to the API
     * @param {string} question - User's question
     * @returns {Promise<Object>} API response
     */
    sendTextQuestion: async (question) => {
        try {
            const response = await apiClient.post(ENDPOINTS.TEXT_CHAT, { question });
            return response.data;
        } catch (error) {
            console.error('Error sending text question:', error);
            throw error;
        }
    },

    /**
     * Send a question with an image to the API
     * @param {string} prompt - User's question about the image
     * @param {File} imageFile - Image file
     * @returns {Promise<Object>} API response
     */
    sendImageQuestion: async (prompt, imageFile) => {
        try {
            const base64Image = await fileToBase64(imageFile);
            
            const payload = {
                prompt,
                image: base64Image,
                mimeType: imageFile.type
            };
            
            const response = await apiClient.post(ENDPOINTS.IMAGE_CHAT, payload);
            return response.data;
        } catch (error) {
            console.error('Error sending image question:', error);
            throw error;
        }
    },

    /**
     * Send a question with an audio file to the API
     * @param {string} prompt - User's question about the audio
     * @param {File} audioFile - Audio file
     * @returns {Promise<Object>} API response
     */
    sendAudioQuestion: async (prompt, audioFile) => {
        try {
            const base64Audio = await fileToBase64(audioFile);
            
            const payload = {
                prompt,
                audio: base64Audio,
                mimeType: audioFile.type
            };
            
            const response = await apiClient.post(ENDPOINTS.AUDIO_CHAT, payload);
            return response.data;
        } catch (error) {
            console.error('Error sending audio question:', error);
            throw error;
        }
    },

    /**
     * Determine the appropriate service to use based on media type
     * @param {string} prompt - User's question about the media
     * @param {File} mediaFile - Media file (image or audio)
     * @param {string} mediaType - MIME type of the media
     * @returns {Promise<Object>} API response
     */
    sendMediaQuestion: async (prompt, mediaFile, mediaType) => {
        if (mediaType.startsWith('image/')) {
            return chatService.sendImageQuestion(prompt, mediaFile);
        } else if (mediaType.startsWith('audio/')) {
            return chatService.sendAudioQuestion(prompt, mediaFile);
        } else {
            throw new Error(`Unsupported media type: ${mediaType}`);
        }
    }
};

export default chatService; 
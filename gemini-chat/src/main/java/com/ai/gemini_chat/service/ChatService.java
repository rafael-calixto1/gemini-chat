package com.ai.gemini_chat.service;

/**
 * Service interface for AI chat interactions
 */
public interface ChatService {
    
    /**
     * Get an answer for a text-only question
     * @param question The text question
     * @return AI-generated answer
     */
    String getAnswer(String question);
    
    /**
     * Get an answer for a question about an image
     * @param prompt The text prompt/question about the image
     * @param base64Image The base64 encoded image data
     * @param mimeType The MIME type of the image
     * @return AI-generated answer
     */
    String getAnswerWithImage(String prompt, String base64Image, String mimeType);
    
    /**
     * Get an answer for a question about an audio
     * @param prompt The text prompt/question about the audio
     * @param base64Audio The base64 encoded audio data
     * @param mimeType The MIME type of the audio
     * @return AI-generated answer
     */
    String getAnswerWithAudio(String prompt, String base64Audio, String mimeType);
} 
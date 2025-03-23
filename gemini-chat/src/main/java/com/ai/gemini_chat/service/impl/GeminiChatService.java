package com.ai.gemini_chat.service.impl;

import com.ai.gemini_chat.service.ChatService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Implementation of ChatService using Google's Gemini API
 */
@Service
public class GeminiChatService implements ChatService {
    
    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final WebClient webClient;

    public GeminiChatService(WebClient.Builder webClient) {
        this.webClient = webClient.build();
    }

    @Override
    public String getAnswer(String question) {
        // Build request payload
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[] {
                        Map.of("parts", new Object[] {
                                Map.of("text", question)
                        })
                }
        );

        return sendRequest(requestBody);
    }

    @Override
    public String getAnswerWithImage(String prompt, String base64Image, String mimeType) {
        // Default to image/jpeg if mime type is not provided
        if (mimeType == null || mimeType.isEmpty()) {
            mimeType = "image/jpeg";
        }
        
        // Create parts list for multimodal input
        List<Map<String, Object>> parts = new ArrayList<>();

        // Add text part
        parts.add(Map.of("text", prompt));

        // Add image part
        Map<String, Object> inlineData = new HashMap<>();
        inlineData.put("mime_type", mimeType);
        inlineData.put("data", base64Image);

        Map<String, Object> imagePart = new HashMap<>();
        imagePart.put("inline_data", inlineData);
        parts.add(imagePart);

        // Build request payload
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[] {
                        Map.of("parts", parts)
                }
        );

        return sendRequest(requestBody);
    }

    @Override
    public String getAnswerWithAudio(String prompt, String base64Audio, String mimeType) {
        // Default to audio/mp3 if mime type is not provided
        if (mimeType == null || mimeType.isEmpty()) {
            mimeType = "audio/mp3";
        }
        
        // Create parts list for multimodal input
        List<Map<String, Object>> parts = new ArrayList<>();

        // Add text part
        parts.add(Map.of("text", prompt));

        // Add audio part
        Map<String, Object> inlineData = new HashMap<>();
        inlineData.put("mime_type", mimeType);
        inlineData.put("data", base64Audio);

        Map<String, Object> audioPart = new HashMap<>();
        audioPart.put("inline_data", inlineData);
        parts.add(audioPart);

        // Build request payload
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[] {
                        Map.of("parts", parts)
                }
        );

        return sendRequest(requestBody);
    }
    
    /**
     * Send the request to Gemini API
     * @param requestBody The prepared request body
     * @return The API response
     */
    private String sendRequest(Map<String, Object> requestBody) {
        return webClient.post()
                .uri(geminiApiUrl + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
} 
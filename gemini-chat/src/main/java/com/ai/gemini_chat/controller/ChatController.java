package com.ai.gemini_chat.controller;

import com.ai.gemini_chat.dto.ChatRequest;
import com.ai.gemini_chat.dto.MediaChatRequest;
import com.ai.gemini_chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller handling chat interactions with the Gemini AI
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/qna")
public class ChatController {

    private final ChatService chatService;

    /**
     * Endpoint for text-only questions
     * @param request The chat request containing the question
     * @return AI-generated response
     */
    @PostMapping("/ask")
    public ResponseEntity<String> askQuestion(@RequestBody ChatRequest request) {
        String answer = chatService.getAnswer(request.getQuestion());
        return ResponseEntity.ok(answer);
    }

    /**
     * Endpoint for image-based questions
     * @param request The request containing prompt, image data and mime type
     * @return AI-generated response
     */
    @PostMapping("/ask-with-image")
    public ResponseEntity<String> askWithImage(@RequestBody MediaChatRequest request) {
        String answer = chatService.getAnswerWithImage(
                request.getPrompt(),
                request.getImage(),
                request.getMimeType()
        );
        return ResponseEntity.ok(answer);
    }
    
    /**
     * Endpoint for audio-based questions
     * @param request The request containing prompt, audio data and mime type
     * @return AI-generated response
     */
    @PostMapping("/ask-with-audio")
    public ResponseEntity<String> askWithAudio(@RequestBody MediaChatRequest request) {
        String answer = chatService.getAnswerWithAudio(
                request.getPrompt(),
                request.getAudio(),
                request.getMimeType()
        );
        return ResponseEntity.ok(answer);
    }
} 
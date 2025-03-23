package com.ai.gemini_chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object for chat requests with media (image or audio)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MediaChatRequest {
    private String prompt;
    private String image;
    private String audio;
    private String mimeType;
} 
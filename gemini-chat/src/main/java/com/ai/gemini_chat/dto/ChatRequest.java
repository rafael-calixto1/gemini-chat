package com.ai.gemini_chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object for text-only chat requests
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequest {
    private String question;
} 
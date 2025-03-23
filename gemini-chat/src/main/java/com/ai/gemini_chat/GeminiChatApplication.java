package com.ai.gemini_chat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class for the Gemini Chat application
 * This Spring Boot application provides a REST API to interact with
 * Google's Gemini AI model for text, image, and audio processing.
 */
@SpringBootApplication
public class GeminiChatApplication {

	public static void main(String[] args) {
		SpringApplication.run(GeminiChatApplication.class, args);
	}

}

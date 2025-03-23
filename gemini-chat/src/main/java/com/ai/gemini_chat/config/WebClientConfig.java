package com.ai.gemini_chat.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * WebClient configuration for API communication
 */
@Configuration
public class WebClientConfig {

    /**
     * Configure WebClient with appropriate buffer size for large media payloads
     */
    @Bean
    public WebClient.Builder webClientBuilder() {
        // Increase buffer size to handle large media files
        final int size = 16 * 1024 * 1024; // 16MB buffer
        final ExchangeStrategies strategies = ExchangeStrategies.builder()
                .codecs(codecs -> codecs.defaultCodecs().maxInMemorySize(size))
                .build();
        
        return WebClient.builder()
                .exchangeStrategies(strategies);
    }
} 
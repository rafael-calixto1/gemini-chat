package com.ai.gemini_chat;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class QnAService {
        //Access API key and URL to Gemini
    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    @Value("${gemini.api.key}")
    private String apiKey;

    public String getService(String question) {
        //construct the request payload

        //api call

        //return response
        return "";
    }
}
package com.ai.gemini_chat;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/qna")

public class AIController {

    private final QnAService qnAService;

    public ResponseEntity<String> askQuestion(@RequestBody Map<String, String> payload){
        String question = payload.get("queestion");
        String answer = qnAService.getService(question);
        return ResponseEntity.ok(answer);
    }
}

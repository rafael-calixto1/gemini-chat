package com.ai.gemini_chat;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.Map;


@RestController
@AllArgsConstructor
@RequestMapping("/api/qna")
public class AIController {


    private final QnAService qnAService;


    @PostMapping("/ask")
    public ResponseEntity<String> askQuestion(@RequestBody Map<String, String> payload) {
        String question = payload.get("question");
        String answer = qnAService.getAnswer(question);
        return ResponseEntity.ok(answer);
    }

    @PostMapping("/ask-with-image")
    public ResponseEntity<String> askWithImage(@RequestBody Map<String, String> payload) {
        String prompt = payload.get("prompt");
        String base64Image = payload.get("image");
        String mimeType = payload.get("mimeType");

        // Default to image/jpeg if mime type is not provided
        if (mimeType == null || mimeType.isEmpty()) {
            mimeType = "image/jpeg";
        }

        String answer = qnAService.getAnswerWithImage(prompt, base64Image, mimeType);
        return ResponseEntity.ok(answer);
    }
}

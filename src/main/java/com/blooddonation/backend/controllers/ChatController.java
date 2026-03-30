package com.blooddonation.backend.controllers;

import com.blooddonation.backend.models.ChatMessage;
import com.blooddonation.backend.repositories.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @GetMapping("/history/{userId1}/{userId2}")
    public List<ChatMessage> getChatHistory(@PathVariable Long userId1, @PathVariable Long userId2) {
        return chatMessageRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderBySentAtAsc(
                userId1, userId2, userId1, userId2);
    }

    @PostMapping
    public ChatMessage sendMessage(@RequestBody ChatMessage message) {
        return chatMessageRepository.save(message);
    }
}

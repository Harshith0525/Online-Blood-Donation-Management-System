package com.blooddonation.backend.repositories;

import com.blooddonation.backend.models.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderBySentAtAsc(
        Long senderId, Long receiverId, Long rId, Long sId
    );
}

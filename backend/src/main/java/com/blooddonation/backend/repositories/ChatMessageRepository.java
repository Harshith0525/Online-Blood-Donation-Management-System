package com.blooddonation.backend.repositories;
 
import com.blooddonation.backend.models.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
 
import java.util.List;
 
@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderBySentAtAsc(
        String senderId, String receiverId, String rId, String sId
    );
}

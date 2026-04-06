package com.blooddonation.backend.models;
 
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;
import lombok.NoArgsConstructor;
 
import java.time.LocalDateTime;
 
@Document(collection = "chat_messages")
@Data
@NoArgsConstructor
public class ChatMessage {
 
    @Id
    private String id;
 
    @DBRef
    private User sender;
 
    @DBRef
    private User receiver;
 
    private String message;
 
    private Boolean isSystemMessage = false;
 
    @Field("sent_at")
    private LocalDateTime sentAt = LocalDateTime.now();
}

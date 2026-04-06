package com.blooddonation.backend.models;
 
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;
import lombok.NoArgsConstructor;
 
import java.time.LocalDateTime;
 
@Document(collection = "badges")
@Data
@NoArgsConstructor
public class Badge {
 
    @Id
    private String id;
 
    @DBRef
    private User user;
 
    private String badgeName;
 
    private String description;
    private String iconUrl;
 
    @Field("awarded_at")
    private LocalDateTime awardedAt = LocalDateTime.now();
}

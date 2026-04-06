package com.blooddonation.backend.models;
 
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;
import lombok.NoArgsConstructor;
 
import java.time.LocalDateTime;
 
@Document(collection = "users")
@Data
@NoArgsConstructor
public class User {
    
    @Id
    private String id;
 
    private String name;
 
    private String email;
 
    private String password;
 
    private String phone;
 
    private String bloodGroup;
 
    private String location;
 
    private String role; // "DONOR", "REQUESTER"
 
    private Double latitude;
    private Double longitude;
 
    private Integer points = 0;
 
    @Field("created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}

package com.blooddonation.backend.models;
 
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;
import lombok.NoArgsConstructor;
 
import java.time.LocalDateTime;
 
@Document(collection = "blood_requests")
@Data
@NoArgsConstructor
public class BloodRequest {
 
    @Id
    private String id;
 
    @DBRef
    private User requester;
 
    private String patientName;
 
    private Integer age;
 
    private String bloodGroupNeeded;
 
    @DBRef
    private Hospital hospital;
 
    private String doctorName;
 
    private String reason;
 
    private String status; // "PENDING", "ACCEPTED", "FULFILLED"
 
    @Field("created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}

package com.blooddonation.backend.models;
 
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;
import lombok.NoArgsConstructor;
 
import java.time.LocalDateTime;
 
@Document(collection = "donation_appointments")
@Data
@NoArgsConstructor
public class DonationAppointment {
 
    @Id
    private String id;
 
    @DBRef
    private User donor;
 
    @DBRef
    private Hospital hospital;
 
    private LocalDateTime appointmentTime;
 
    private String status; // "SCHEDULED", "COMPLETED", "CANCELLED"
 
    @Field("created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}

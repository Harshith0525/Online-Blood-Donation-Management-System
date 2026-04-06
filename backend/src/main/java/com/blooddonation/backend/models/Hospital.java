package com.blooddonation.backend.models;
 
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
 
@Document(collection = "hospitals")
@Data
@NoArgsConstructor
public class Hospital {
 
    @Id
    private String id;
 
    private String name;
 
    private String address;
 
    private Double latitude;
    private Double longitude;
 
    private Double rating;
    
    private String contactPhone;
}

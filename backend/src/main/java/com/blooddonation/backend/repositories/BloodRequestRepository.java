package com.blooddonation.backend.repositories;
 
import com.blooddonation.backend.models.BloodRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
 
import java.util.List;
 
@Repository
public interface BloodRequestRepository extends MongoRepository<BloodRequest, String> {
    List<BloodRequest> findByRequesterId(String requesterId);
    List<BloodRequest> findByStatus(String status);
    List<BloodRequest> findByBloodGroupNeededAndStatus(String bloodGroup, String status);
    List<BloodRequest> findByRequesterIdAndStatus(String requesterId, String status);
}

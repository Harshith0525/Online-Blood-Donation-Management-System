package com.blooddonation.backend.repositories;
 
import com.blooddonation.backend.models.Hospital;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
 
@Repository
public interface HospitalRepository extends MongoRepository<Hospital, String> {
}

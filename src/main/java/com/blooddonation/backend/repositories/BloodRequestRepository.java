package com.blooddonation.backend.repositories;

import com.blooddonation.backend.models.BloodRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {
    List<BloodRequest> findByRequesterId(Long requesterId);
    List<BloodRequest> findByStatus(String status);
}

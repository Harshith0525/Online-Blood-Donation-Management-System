package com.blooddonation.backend.controllers;

import com.blooddonation.backend.models.BloodRequest;
import com.blooddonation.backend.repositories.BloodRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")
public class BloodRequestController {

    @Autowired
    private BloodRequestRepository bloodRequestRepository;

    @GetMapping
    public List<BloodRequest> getAllRequests() {
        return bloodRequestRepository.findAll();
    }

    @GetMapping("/status/{status}")
    public List<BloodRequest> getRequestsByStatus(@PathVariable String status) {
        return bloodRequestRepository.findByStatus(status);
    }

    @PostMapping
    public BloodRequest createRequest(@RequestBody BloodRequest request) {
        request.setStatus("PENDING");
        return bloodRequestRepository.save(request);
    }

    @GetMapping("/notifications/{donorId}/{bloodGroup}")
    public List<BloodRequest> getNotifications(@PathVariable String donorId, @PathVariable String bloodGroup) {
        // Return "PENDING" requests matching the donor's blood group
        List<BloodRequest> pendingMatching = bloodRequestRepository.findByBloodGroupNeededAndStatus(bloodGroup, "PENDING");
        
        // Return "ACCEPTED" requests where the user is the requester
        List<BloodRequest> acceptedForMe = bloodRequestRepository.findByRequesterIdAndStatus(donorId, "ACCEPTED");
        
        pendingMatching.addAll(acceptedForMe);
        return pendingMatching;
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<BloodRequest> updateRequestStatus(@PathVariable String id, @RequestBody String status) {
        return bloodRequestRepository.findById(id).map(req -> {
            req.setStatus(status.replace("\"", ""));
            return ResponseEntity.ok(bloodRequestRepository.save(req));
        }).orElse(ResponseEntity.notFound().build());
    }
}

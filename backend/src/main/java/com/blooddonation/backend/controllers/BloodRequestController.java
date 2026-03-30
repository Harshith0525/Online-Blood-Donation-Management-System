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

    @PutMapping("/{id}/status")
    public ResponseEntity<BloodRequest> updateRequestStatus(@PathVariable Long id, @RequestBody String status) {
        return bloodRequestRepository.findById(id).map(req -> {
            req.setStatus(status.replace("\"", ""));
            return ResponseEntity.ok(bloodRequestRepository.save(req));
        }).orElse(ResponseEntity.notFound().build());
    }
}

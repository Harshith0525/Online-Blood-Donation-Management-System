package com.blooddonation.backend.controllers;

import com.blooddonation.backend.models.Badge;
import com.blooddonation.backend.models.User;
import com.blooddonation.backend.repositories.BadgeRepository;
import com.blooddonation.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BadgeRepository badgeRepository;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserProfile(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/gamification")
    public ResponseEntity<?> getUserGamificationData(@PathVariable Long id) {
        return userRepository.findById(id).map(user -> {
            List<Badge> badges = badgeRepository.findByUserId(id);
            Map<String, Object> data = new HashMap<>();
            data.put("points", user.getPoints());
            data.put("badges", badges);
            return ResponseEntity.ok(data);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/points/{points}")
    public ResponseEntity<User> awardPoints(@PathVariable Long id, @PathVariable Integer points) {
        return userRepository.findById(id).map(user -> {
            user.setPoints(user.getPoints() + points);
            return ResponseEntity.ok(userRepository.save(user));
        }).orElse(ResponseEntity.notFound().build());
    }
}

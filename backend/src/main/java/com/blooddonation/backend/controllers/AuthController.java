package com.blooddonation.backend.controllers;

import com.blooddonation.backend.models.User;
import com.blooddonation.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        // Simple placeholder logic for MVP purposes. Next step is full Spring Security JWT integration.
        return userRepository.findByEmail(email).map(user -> {
            if (user.getPassword().equals(password)) {
                Map<String, Object> response = new HashMap<>();
                response.put("token", "fake-jwt-token-for-demo");
                response.put("id", user.getId());
                response.put("email", user.getEmail());
                response.put("role", user.getRole());
                response.put("name", user.getName());
                response.put("bloodGroup", user.getBloodGroup());
                response.put("points", user.getPoints());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body("Error: Invalid credentials!");
            }
        }).orElse(ResponseEntity.badRequest().body("Error: User not found!"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }
        if (userRepository.existsByPhone(signUpRequest.getPhone())) {
            return ResponseEntity.badRequest().body("Error: Phone number is already in use!");
        }

        // Create new user's account
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword()); // In a real app we encode this!
        user.setPhone(signUpRequest.getPhone());
        user.setRole(signUpRequest.getRole() != null ? signUpRequest.getRole() : "DONOR");
        user.setBloodGroup(signUpRequest.getBloodGroup());
        user.setLocation(signUpRequest.getLocation());
        user.setPoints(0);

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}

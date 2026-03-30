package com.blooddonation.backend.controllers;

import com.blooddonation.backend.models.DonationAppointment;
import com.blooddonation.backend.repositories.DonationAppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class DonationAppointmentController {

    @Autowired
    private DonationAppointmentRepository repository;

    @GetMapping("/donor/{donorId}")
    public List<DonationAppointment> getAppointmentsByDonor(@PathVariable Long donorId) {
        return repository.findByDonorId(donorId);
    }

    @PostMapping
    public DonationAppointment scheduleAppointment(@RequestBody DonationAppointment appointment) {
        appointment.setStatus("SCHEDULED");
        return repository.save(appointment);
    }
}

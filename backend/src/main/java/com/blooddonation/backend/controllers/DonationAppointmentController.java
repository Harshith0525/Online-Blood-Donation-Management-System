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
    public List<DonationAppointment> getAppointmentsByDonor(@PathVariable String donorId) {
        return repository.findByDonorId(donorId);
    }

    @PostMapping
    public DonationAppointment scheduleAppointment(@RequestBody DonationAppointment appointment) {
        appointment.setStatus("SCHEDULED");
        return repository.save(appointment);
    }

    @PutMapping("/{id}")
    public DonationAppointment updateAppointment(@PathVariable String id, @RequestBody DonationAppointment updatedData) {
        return repository.findById(id).map(appointment -> {
            appointment.setAppointmentTime(updatedData.getAppointmentTime());
            return repository.save(appointment);
        }).orElseThrow(() -> new RuntimeException("Appointment not found"));
    }
}

package com.blooddonation.backend.repositories;

import com.blooddonation.backend.models.DonationAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationAppointmentRepository extends JpaRepository<DonationAppointment, Long> {
    List<DonationAppointment> findByDonorId(Long donorId);
    List<DonationAppointment> findByHospitalId(Long hospitalId);
}

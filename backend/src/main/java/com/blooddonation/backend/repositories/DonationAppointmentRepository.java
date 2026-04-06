package com.blooddonation.backend.repositories;
 
import com.blooddonation.backend.models.DonationAppointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
 
import java.util.List;
 
@Repository
public interface DonationAppointmentRepository extends MongoRepository<DonationAppointment, String> {
    List<DonationAppointment> findByDonorId(String donorId);
    List<DonationAppointment> findByHospitalId(String hospitalId);
}

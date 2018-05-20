package tech.spaceoso.jobboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.spaceoso.jobboard.model.JobApplicants;

import java.util.List;
import java.util.UUID;

public interface JobApplicantRepository extends JpaRepository<JobApplicants, UUID> {
    List<JobApplicants> getJobApplicantsById(UUID uuid);
    
    List<JobApplicants> findAllByJob_Id(UUID uuid);
}

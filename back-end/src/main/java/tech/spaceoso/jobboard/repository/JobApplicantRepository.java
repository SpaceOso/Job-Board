package tech.spaceoso.jobboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.spaceoso.jobboard.model.JobApplicants;

import java.util.UUID;

public interface JobApplicantRepository extends JpaRepository<JobApplicants, UUID> {
}

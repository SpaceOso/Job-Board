package tech.spaceoso.jobboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.spaceoso.jobboard.model.Applicant;

import java.util.UUID;

public interface ApplicantRepository extends JpaRepository<Applicant, UUID> {
}

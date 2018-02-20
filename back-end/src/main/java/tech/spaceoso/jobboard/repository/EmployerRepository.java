package tech.spaceoso.jobboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.spaceoso.jobboard.model.Employer;

import java.util.UUID;

public interface EmployerRepository extends JpaRepository<Employer, UUID> {
}

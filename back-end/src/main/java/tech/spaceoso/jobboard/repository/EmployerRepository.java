package tech.spaceoso.jobboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import tech.spaceoso.jobboard.model.Employee;
import tech.spaceoso.jobboard.model.Employer;

import java.util.UUID;

public interface EmployerRepository extends JpaRepository<Employer, UUID> {
//    Employer findById(UUID id);
}

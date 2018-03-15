package tech.spaceoso.jobboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.spaceoso.jobboard.model.Employee;

import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
    //    Employee findByLastName(String lastName);
    Employee findByUsername(String username);

//    Employee findById(UUID id);
}

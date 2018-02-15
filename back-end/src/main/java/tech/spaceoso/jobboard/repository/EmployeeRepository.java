package tech.spaceoso.jobboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.spaceoso.jobboard.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
//    Employee findByLastName(String lastName);
}

package tech.spaceoso.jobboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.spaceoso.jobboard.model.Company;
import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID> {
//    Company findById(UUID id);

}

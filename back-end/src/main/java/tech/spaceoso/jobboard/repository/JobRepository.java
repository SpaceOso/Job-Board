package tech.spaceoso.jobboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.spaceoso.jobboard.model.Job;

import java.util.UUID;

public interface JobRepository extends JpaRepository<Job, UUID> {

}

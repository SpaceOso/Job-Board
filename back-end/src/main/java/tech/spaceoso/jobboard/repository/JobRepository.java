package tech.spaceoso.jobboard.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import tech.spaceoso.jobboard.model.Job;
import tech.spaceoso.jobboard.model.JobWrapper;

import java.util.List;
import java.util.UUID;

public interface JobRepository extends JpaRepository<Job, UUID> {


    List<Job> findJobsByEmployer_Id(UUID employerId);
}

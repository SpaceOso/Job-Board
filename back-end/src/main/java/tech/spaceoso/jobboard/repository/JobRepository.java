package tech.spaceoso.jobboard.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tech.spaceoso.jobboard.model.Job;
import tech.spaceoso.jobboard.model.JobWrapper;

import java.util.List;
import java.util.UUID;

public interface JobRepository extends JpaRepository<Job, UUID> {


    // TODO create list of 'other jobs by' for the job view page
    List<Job> findAllByOrderByCreatedDateDesc();

    // TODO create list of all jobs with applicants for dashboard which will be different because of auth
    List<Job> findJobsByCompany_Id(UUID companyId);
    
    Job getOne(UUID id);

}

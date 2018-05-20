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

    List<Job> findJobsByCompany_Id(UUID companyId);
    
    Job getOne(UUID id);
    
    @Query("select j.id from Job j where j.company.id = ?1")
    List<UUID> getAllJob_IdFromCompany_Id(UUID companyId);

}

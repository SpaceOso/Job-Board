package tech.spaceoso.jobboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tech.spaceoso.jobboard.model.Applicant;
import tech.spaceoso.jobboard.model.JobApplicants;

import java.util.List;
import java.util.UUID;

public interface JobApplicantRepository extends JpaRepository<JobApplicants, UUID> {
    List<JobApplicants> getJobApplicantsById(UUID uuid);
    
    List<JobApplicants> findAllByJob_Id(UUID uuid);
    
    // https://stackoverflow.com/questions/36328063/how-to-return-a-custom-object-from-a-spring-data-jpa-group-by-query?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    
    // @Query("select a.applicant, a.reviewed AS revieweds, a.status AS statuss from JobApplicants a where a.job.id = ?1")
    @Query("select a.reviewed as status from JobApplicants a where a.job.id = :jobId")
    List<JobApplicants> getOnlyApplicants(@Param("jobId") UUID jobId);
    
}

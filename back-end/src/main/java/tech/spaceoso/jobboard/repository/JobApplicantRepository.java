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
    
    // @Query("select a.applicant as Applicant, new map(a.reviewed as reviewed, a.status as status) from JobApplicants a where a.job.id = ?1")
    @Query("select new JobApplicants (a.id, a.status, a.reviewed, a.applicant, a.appliedOnDate, a.lastModifiedDate) from JobApplicants a where a.job.id = :jobId")
    List<JobApplicants> getOnlyApplicants(@Param("jobId") UUID jobId);
    
}

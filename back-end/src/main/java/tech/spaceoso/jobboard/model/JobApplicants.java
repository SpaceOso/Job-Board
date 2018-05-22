package tech.spaceoso.jobboard.model;


import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.web.bind.annotation.GetMapping;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "JOB_APPLICANTS")
public class JobApplicants {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @org.hibernate.annotations.Type(type="org.hibernate.type.PostgresUUIDType")
    private UUID id;
    
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "APPLICANT_ID")
    private Applicant applicant;
    @ManyToOne()
    @JoinColumn(name = "JOB_ID")
    private Job job;
    
    @CreationTimestamp
    private LocalDateTime appliedOnDate;
    @UpdateTimestamp
    private LocalDateTime lastModifiedDate;
    private String status;
    private Boolean reviewed;
    
    
    public JobApplicants(){}
    
    public JobApplicants(String status, Boolean reviewed, Applicant applicant, Job job, LocalDateTime appliedOnDate, LocalDateTime lastModifiedDate) {
        this.status = status;
        this.reviewed = reviewed;
        this.applicant = applicant;
        this.job = job;
        this.appliedOnDate = appliedOnDate;
        this.lastModifiedDate = lastModifiedDate;
    }
    
    public JobApplicants(UUID id, String status, Boolean reviewed, Applicant applicant, LocalDateTime appliedOnDate, LocalDateTime lastModifiedDate){
        this.id = id;
        this.status = status;
        this.reviewed = reviewed;
        this.applicant = applicant;
        this.appliedOnDate = appliedOnDate;
        this.lastModifiedDate = lastModifiedDate;
        
    }
    
    @Override
    public String toString() {
        return "JobApplicants{" +
                "id=" + id +
                ", applicant=" + applicant +
                ", job=" + job +
                ", appliedOnDate=" + appliedOnDate +
                ", lastModifiedDate=" + lastModifiedDate +
                '}';
    }
    
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public Boolean getReviewed() {
        return reviewed;
    }
    
    public void setReviewed(Boolean reviewed) {
        this.reviewed = reviewed;
    }
    
    public Applicant getApplicant() {
        return applicant;
    }
    
    public void setApplicant(Applicant applicant) {
        this.applicant = applicant;
    }
    
    public Job getJob() {
        return job;
    }
    
    public void setJob(Job job) {
        this.job = job;
    }
    
    public LocalDateTime getAppliedOnDate() {
        return appliedOnDate;
    }
    
    public void setAppliedOnDate(LocalDateTime appliedOnDate) {
        this.appliedOnDate = appliedOnDate;
    }
    
    public LocalDateTime getLastModifiedDate() {
        return lastModifiedDate;
    }
    
    public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }
    
}

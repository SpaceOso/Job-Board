package tech.spaceoso.jobboard.model;

public class ApplicantDTO {
    Applicant applicant;
    String jobId;
    
    public ApplicantDTO() {
    }
    
    public ApplicantDTO(Applicant applicant, String jobId) {
        this.applicant = applicant;
        this.jobId = jobId;
    }
    
    public Applicant getApplicant() {
        return applicant;
    }
    
    public void setApplicant(Applicant applicant) {
        this.applicant = applicant;
    }
    
    public String getJobId() {
        return jobId;
    }
    
    public void setJobId(String jobId) {
        this.jobId = jobId;
    }
    
    @Override
    public String toString() {
        return "ApplicantDTO{" +
                "applicant=" + applicant +
                ", jobId='" + jobId + '\'' +
                '}';
    }
}

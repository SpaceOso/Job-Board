package tech.spaceoso.jobboard.model;

public class ApplicantDAO {
    Applicant applicant;
    String jobId;
    
    public ApplicantDAO() {
    }
    
    public ApplicantDAO(Applicant applicant, String jobId) {
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
}

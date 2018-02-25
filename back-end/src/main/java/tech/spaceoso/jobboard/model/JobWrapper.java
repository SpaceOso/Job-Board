package tech.spaceoso.jobboard.model;

import java.util.UUID;

public class JobWrapper {
    private Job job;
    private UUID employerId;
    private Employer employer;

    public JobWrapper(){

    }

    public JobWrapper(Job job, UUID employerId) {
        this.job = job;
        this.employerId = employerId;
    }

    public void setEmployer(Employer employer){
        this.employer = employer;
    }

    public Employer getEmployer(){
        return employer;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public UUID getEmployerId() {
        return employerId;
    }

    public void setEmployerId(UUID employerId) {
        this.employerId = employerId;
    }


}

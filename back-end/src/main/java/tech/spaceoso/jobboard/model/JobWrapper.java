package tech.spaceoso.jobboard.model;

import java.util.UUID;

public class JobWrapper {
    private Job job;
    private UUID companyId;
    private Company company;

    public JobWrapper(){

    }

    public JobWrapper(Job job, UUID companyId) {
        this.job = job;
        this.companyId = companyId;
    }

    public void setCompany(Company company){
        this.company = company;
    }

    public Company getCompany(){
        return company;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public UUID getCompanyId() {
        return companyId;
    }

    public void setCompanyId(UUID companyId) {
        this.companyId = companyId;
    }


}

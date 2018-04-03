package tech.spaceoso.jobboard;

import tech.spaceoso.jobboard.model.Address;
import tech.spaceoso.jobboard.model.Company;
import tech.spaceoso.jobboard.model.Job;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

final public class ObjectCreator {

    static public UUID generateId() {
        return UUID.randomUUID();
    }

    static public Address createAddress() {
        return new Address("Test Tube ville", "Fakertown", "NY", 12345);
    }

    static public List<Job> createJobs(int totalJobs) {
        List<Job> jobList = new ArrayList<Job>();
        for (int i = 0; i < totalJobs; i++) {
            Job newJob = new Job(generateId(), LocalDateTime.now(), "Tester title", createAddress(), "fake description", null);
            jobList.add(newJob);
        }


        return jobList;

    }

    static public Job createJobs() {
        return new Job(generateId(), LocalDateTime.now(), "Tester title", createAddress(), "fake description", null);
    }

    static public Company createCompany() {

        // generate id for the company
        UUID companyId = UUID.randomUUID();

        Company company = new Company(companyId, new Date(), "Test Company", createAddress(), "noLogo.png", "fake.com", "twitter.com", "facebook", "linkedin.com", null, null);
        // get list of jobs
        List<Job> jobs = createJobs(3);
        // add this companyId to all jobs that we receive
        for (Job job : jobs) {
            job.setCompany(company);
        }

        // add this job list to the jobs section of the company
        company.setJobs(jobs);

        return company;
    }
}

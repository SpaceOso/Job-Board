package tech.spaceoso.jobboard;

import tech.spaceoso.jobboard.model.Address;
import tech.spaceoso.jobboard.model.Employer;
import tech.spaceoso.jobboard.model.Job;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

final public class ObjectCreator {

    static public UUID generateId(){
        return UUID.randomUUID();
    }

    static public Address createAddress(){
        return new Address("Test Tube ville", "Fakertown", "NY", 12345);
    }

    static public List<Job> createJobs(){
        Job newJob = new Job(generateId(), "Tester title", createAddress(), "fake description", null);
        List<Job> jobList= new ArrayList<Job>();
        jobList.add(newJob);

        return jobList;

    }

    static public Employer createEmployer(){

        // generate id for the employer
        UUID employerId = UUID.randomUUID();

        Employer employer = new Employer(employerId, "Test Employer", createAddress(), "noLogo.png", "fake.com", "twitter.com", "facebook", "linkedin.com", null);
        // get list of jobs
        List<Job> jobs = createJobs();
        // add this employerId to all jobs that we receive
        for (Job job : jobs) {
            job.setEmployer(employer);
        }

        // add this job list to the jobs section of the employer
        employer.setJobs(jobs);

        return employer;
    }
}

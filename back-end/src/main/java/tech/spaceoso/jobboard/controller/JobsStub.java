package tech.spaceoso.jobboard.controller;

import tech.spaceoso.jobboard.model.Address;
import tech.spaceoso.jobboard.model.Employer;
import tech.spaceoso.jobboard.model.Job;

import java.util.*;

public class JobsStub {
    private static Map<Long, Job> jobs = new HashMap<Long, Job>();
    private static Long idIndex = 3L;

    private static Employer employer = new Employer(
            UUID.randomUUID(),
            "Job Stub Emp",
            new Address("Fake street", "palmdale", "CA", 12345),
            "Faker.png",
            "www.rico.3d",
            "twitter,com",
            "facebook.com",
            "linkedin.com",
            null);

    static {
        Job a = new Job(
                UUID.randomUUID(),
                "Fake job",
                new Address("fake city", "palmdale", "AZ", 12345),
                "Fake job yo", employer);
        jobs.put(1L, a);
        Job b = new Job(
                UUID.randomUUID(),
                "Fake job",
                new Address("fake city", "palmdale", "AZ", 12345),
                "Fake job yo", employer);
        jobs.put(2L, b);
    }

    /**
     * Get all the jobs
     * @return {ArrayList<Job>}
     */
    public static List<Job> list() {
        return new ArrayList<Job>(jobs.values());
    }

    public static Job getJobById(UUID id){
        return jobs.get(id);
    }
}

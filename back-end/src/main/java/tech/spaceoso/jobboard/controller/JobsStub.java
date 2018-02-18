package tech.spaceoso.jobboard.controller;

import tech.spaceoso.jobboard.model.Address;
import tech.spaceoso.jobboard.model.Job;

import java.util.*;

public class JobsStub {
    private static Map<Long, Job> jobs = new HashMap<Long, Job>();
    private static Long idIndex = 3L;

    static {
        Job a = new Job(
                UUID.randomUUID(),
                "First Job",
                new Address("test street", "test city", "NY", 12345),
                "first job on list",
                1L);
//                new Employer(2l,"Spring Test Employer", new Address("test street", "palmdale", "ny", 12345), "jhsayp.png", "miguelricodev.com", "tiwtter.com", "facebook.com", "linkedin.com"));
        jobs.put(1L, a);
        Job b = new Job(
                UUID.randomUUID(),
                "Second Job",
                new Address("test street", "test city", "NY", 12345),
                "2 job on list",
                2L);
//                new Employer(2l,"Spring Test Employer", new Address("test street", "palmdale", "ny", 12345), "jhsayp.png", "miguelricodev.com", "tiwtter.com", "facebook.com", "linkedin.com"));
        jobs.put(2L, b);
    }

    /**
     * Get all the jobs
     * @return {ArrayList<Job>}
     */
    public static List<Job> list() {
        return new ArrayList<Job>(jobs.values());
    }

    public static Job getJobById(Long id){
        return jobs.get(id);
    }
}

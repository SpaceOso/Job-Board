package tech.spaceoso.jobboard.controller;

import tech.spaceoso.jobboard.model.Employer;
import tech.spaceoso.jobboard.model.Job;
import tech.spaceoso.jobboard.model.Location;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JobsStub {
    private static Map<Long, Job> jobs = new HashMap<Long, Job>();
    private static Long idIndex = 3L;

    static {
        Job a = new Job(
                1L,
                "First Job",
                new Location("test street", "test city", "NY", 12345),
                "first job on list",
                1L,
                new Employer(2l,"Spring Test Employer", new Location("test street", "palmdale", "ny", 12345), "jhsayp.png", "miguelricodev.com", "tiwtter.com", "facebook.com", "linkedin.com"));
        jobs.put(1L, a);
        Job b = new Job(
                2L,
                "Second Job",
                new Location("test street", "test city", "NY", 12345),
                "2 job on list",
                2L,
                new Employer(2l,"Spring Test Employer", new Location("test street", "palmdale", "ny", 12345), "jhsayp.png", "miguelricodev.com", "tiwtter.com", "facebook.com", "linkedin.com"));
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

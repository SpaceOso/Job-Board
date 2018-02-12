package tech.spaceoso.jobboard.controller;

import tech.spaceoso.jobboard.model.Job;
import tech.spaceoso.jobboard.model.Location;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JobsStub {
    private static Map<Long, Job> jobs = new HashMap<Long, Job>();
    private static Long idIndex = 3L;

    static {
        Job a = new Job(1L, "First Job", new Location("test street", "test city", "NY", 12345), "first job on list", 1L);
        jobs.put(1L, a);
        Job b = new Job(2L, "Second Job", new Location("test street", "test city", "NY", 12345), "2 job on list", 2L);
        jobs.put(2L, b);
        Job c = new Job(3L, "Third Job", new Location("test street", "test city", "NY", 12345), "33 job on list", 3L);
        jobs.put(3L, c);
        Job d = new Job(4L, "Fourth Job", new Location("test street", "test city", "NY", 12345), "44 job on list", 4L);
//        jobs.put(4L, b);
    }

    public static List<Job> list() {
        return new ArrayList<Job>(jobs.values());
    }
}

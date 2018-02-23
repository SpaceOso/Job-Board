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
        Job newJob = new Job(generateId(), "Tester title", createAddress(), "fake description", creatEmployer());
        List<Job> jobList= new ArrayList<Job>();
        jobList.add(newJob);

        return jobList;

    }

    static public Employer creatEmployer(){
        return new Employer(generateId(),
                "fake employer",
                createAddress(),
                "fakelogo.png",
                "website.com",
                "twitter.com",
                "facebook.com",
                "linkedin.com",
                createJobs());
    }
}

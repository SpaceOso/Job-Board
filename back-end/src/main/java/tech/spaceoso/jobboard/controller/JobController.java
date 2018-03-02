package tech.spaceoso.jobboard.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tech.spaceoso.jobboard.model.Employer;
import tech.spaceoso.jobboard.model.Job;
import tech.spaceoso.jobboard.model.JobWrapper;
import tech.spaceoso.jobboard.repository.JobRepository;

import java.util.*;

import org.springframework.web.bind.annotation.RequestMapping;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


@RestController
@CrossOrigin
@RequestMapping("/api/v1/")
public class JobController {

    @PersistenceContext
    private EntityManager em;

    final Logger logger = LoggerFactory.getLogger(JobController.class);

    @Autowired
    private JobRepository jobRepository;


    // TODO need to either return JobWrapper or crete new url with wrapper
    @RequestMapping(value = "jobposts/list/home-page", method = RequestMethod.GET)
    public List<Job> homeJobList(){
//        List<Job> ascJobs = jobRepository.findAllAndOrderByCreatedDate();

        //todo you can pass a sort
        List<Job> ascJobs = jobRepository.findAll();
        for(Job job : ascJobs){
            // get employer reference from employerId sent in JSON
            logger.info("each job: " + job);
//            Employer emp = em.getReference(Employer.class, job.e());
        }

        return ascJobs;
    }

    @RequestMapping(value = "jobposts/list", method = RequestMethod.GET)
    public List<Job> list() {

        return jobRepository.findAll();
    }

/*    @RequestMapping(value = "jobposts/list-with-employer", method = RequestMethod.GET)
    public List<JobWrapper> listWithEmployer(){
        List<Job> jobs = jobRepository.findAll();

        for(Job job : jobs){
            job.getEmployer();
        }
    }*/

    @RequestMapping(value = "jobposts/{id}", method = RequestMethod.GET)
    public Job getJobById(@PathVariable UUID id){
        return jobRepository.findOne(id);
    }


    @RequestMapping(value = "jobposts/employer/{employerId}", method = RequestMethod.GET)
    public List<Job> getJobByEmployer(@PathVariable UUID employerId){
        logger.info("geting all employer jobs");
        return jobRepository.findJobsByEmployer_Id(employerId);
    }

    @RequestMapping(value = "jobposts/create", method = RequestMethod.POST)
    public JobWrapper create(@RequestBody JobWrapper jobWrapper){
        // get employer reference from employerId sent in JSON
        Employer emp = em.getReference(Employer.class, jobWrapper.getEmployerId());

        // create and save a default job
        Job newJob = jobWrapper.getJob();
        newJob.setEmployer(emp);
        jobRepository.saveAndFlush(newJob);

        // send back the new job with employer info and all other jobs
        JobWrapper wrappedJob = new JobWrapper(newJob, emp.getId());
        wrappedJob.setEmployer(emp);

        return wrappedJob;
    }
}

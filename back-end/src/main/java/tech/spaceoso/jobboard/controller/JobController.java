package tech.spaceoso.jobboard.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
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

    @Transactional
    @RequestMapping(value = "jobposts/list/home-page", method = RequestMethod.GET)
    public List<JobWrapper> homeJobList(){
        List<JobWrapper> wrappedJobs = new ArrayList<JobWrapper>();

        for(Job job : jobRepository.findAllByOrderByCreatedDateDesc()){
            JobWrapper newJob = new JobWrapper(job, job.getEmployer().getId());
            newJob.setEmployer(job.getEmployer());
            wrappedJobs.add(newJob);
        }
        return wrappedJobs;
    }


    @RequestMapping(value = "jobposts/list", method = RequestMethod.GET)
    public List<Job> list() {

        return jobRepository.findAll();
    }

    @RequestMapping(value = "jobposts/{id}", method = RequestMethod.GET)
    public JobWrapper getJobById(@PathVariable UUID id){
        Job job = jobRepository.findOne(id);
        JobWrapper wrappedJob = new JobWrapper(job, job.getEmployer().getId());
        wrappedJob.setEmployer(job.getEmployer());
        return wrappedJob;
    }


    @RequestMapping(value = "jobposts/employer/{employerId}", method = RequestMethod.GET)
    public List<Job> getJobByEmployer(@PathVariable UUID employerId){
        logger.info("geting all employer jobs");
        return jobRepository.findJobsByEmployer_Id(employerId);
    }

    @RequestMapping(value = "jobposts/create", method = RequestMethod.POST)
    public JobWrapper create(@RequestBody JobWrapper jobWrapper){
        logger.info("creating a new job with:", jobWrapper);
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

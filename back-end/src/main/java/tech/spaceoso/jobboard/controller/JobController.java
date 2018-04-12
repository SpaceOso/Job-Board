package tech.spaceoso.jobboard.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.spaceoso.jobboard.model.Company;
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
            JobWrapper newJob = new JobWrapper(job, job.getCompany().getId().toString());
            newJob.setCompany(job.getCompany());
            wrappedJobs.add(newJob);
        }

        return wrappedJobs;
    }


    @RequestMapping(value = "jobposts/list", method = RequestMethod.GET)
    public List<Job> list() {

        return jobRepository.findAll();
    }

    @RequestMapping(value = "jobposts/{id}", method = RequestMethod.GET)
    public ResponseEntity<JobWrapper> getJobById(@PathVariable UUID id){
        Job job = jobRepository.getOne(id);
        System.out.println(job.getCreatedDate().toString());

        JobWrapper wrappedJob = new JobWrapper(job, job.getCompany().getId().toString());
        wrappedJob.setCompany(job.getCompany());
        return new ResponseEntity<>(wrappedJob, HttpStatus.OK);
    }


    @RequestMapping(value = "jobposts/company/{companyId}", method = RequestMethod.GET)
    public List<Job> getJobByCompany(@PathVariable UUID companyId){
        logger.info("geting all company jobs");
        return jobRepository.findJobsByCompany_Id(companyId);
    }
    
}

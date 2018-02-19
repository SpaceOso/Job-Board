package tech.spaceoso.jobboard.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tech.spaceoso.jobboard.model.Job;
import tech.spaceoso.jobboard.repository.JobRepository;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@CrossOrigin
@RequestMapping("/api/v1/")
public class JobController {

    final Logger logger = LoggerFactory.getLogger(JobController.class);

    @Autowired
    private JobRepository jobRepository;

    @RequestMapping(value = "jobposts/list", method = RequestMethod.GET)
    public List<Job> list() {

        return jobRepository.findAll();
    }

    @RequestMapping(value = "jobposts/{id}", method = RequestMethod.GET)
    public Job getJobById(@PathVariable UUID id){

        return jobRepository.findOne(id);
    }

    @RequestMapping(value = "jobposts/create", method = RequestMethod.POST)
    public Job create(@RequestBody Job job){

        logger.info("The job to be saved {}", job);
        return jobRepository.saveAndFlush(job);
    }
}

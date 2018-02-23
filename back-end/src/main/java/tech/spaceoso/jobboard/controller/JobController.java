package tech.spaceoso.jobboard.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import jdk.nashorn.internal.codegen.ObjectCreator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tech.spaceoso.jobboard.model.Address;
import tech.spaceoso.jobboard.model.Employer;
import tech.spaceoso.jobboard.model.Job;
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

    @RequestMapping(value = "jobposts/list", method = RequestMethod.GET)
    public List<Job> list() {

        return jobRepository.findAll();
    }

    @RequestMapping(value = "jobposts/{id}", method = RequestMethod.GET)
    public Job getJobById(@PathVariable UUID id){

        return jobRepository.findOne(id);
    }

    @RequestMapping(value = "jobposts/create", method = RequestMethod.POST)
    public Job create(@RequestBody Map<String, String> payload){
        Employer emp = em.getReference(Employer.class, payload.get("employerId"));
//        HashMap<String, String> customerInfo = requestData.get("employer");
        System.out.println(payload);
        Address newAdd = new Address("tester", "city", "NY", 1234);
        Job newJob = new Job(UUID.randomUUID(), payload.get("description"), newAdd, payload.get("description"), emp);
        logger.info("The employer is: {} ", emp);
        //mapper.configure(DeserializationConfig.Feature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true)
        logger.info("The job to be saved {}", newJob);
//        return ObjectCrea
        return jobRepository.saveAndFlush(newJob);
    }
}

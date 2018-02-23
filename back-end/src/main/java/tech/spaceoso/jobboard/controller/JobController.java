package tech.spaceoso.jobboard.controller;


import com.fasterxml.jackson.databind.DeserializationFeature;
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

    @Autowired
    private ObjectMapper mapper;

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
    public Job create(@RequestBody Map<String, Object> payload){
        Employer emp = em.getReference(Employer.class, UUID.fromString(payload.get("employerId").toString()));
//        HashMap<String, String> customerInfo = requestData.get("employer");
        logger.info("The payload is {} ", payload);
//        Address addressa = payload.get("address");
        Address jsonAddres = Address.class.cast(payload.get("address"));
//        Address newAdd = new Address(payload.get("address"), "city", "NY", 1234);
        Job newJob = new Job(UUID.randomUUID(), payload.get("title").toString(), jsonAddres, payload.get("description").toString(), emp);
        logger.info("The employer is: {} ", emp);
        //mapper.configure(DeserializationConfig.Feature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true)
        logger.info("The job to be saved {}", newJob);
//        return ObjectCrea
        return jobRepository.saveAndFlush(newJob);
    }
}

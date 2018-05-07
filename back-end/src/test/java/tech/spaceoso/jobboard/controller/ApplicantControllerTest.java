package tech.spaceoso.jobboard.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import tech.spaceoso.jobboard.ObjectCreator;
import tech.spaceoso.jobboard.model.Applicant;
import tech.spaceoso.jobboard.model.ApplicantDAO;
import tech.spaceoso.jobboard.model.Job;
import tech.spaceoso.jobboard.repository.ApplicantRepository;
import tech.spaceoso.jobboard.repository.JobRepository;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.isA;
import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.contains;
import static org.mockito.Mockito.when;

@RunWith(SpringJUnit4ClassRunner.class)
public class ApplicantControllerTest {
    
    @InjectMocks
    ApplicantController applicantController;
    
    @Mock
    ApplicantRepository applicantRepository;
    @Mock
    JobRepository jobRepository;
    @Mock
    EntityManager em;
    
    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
    }
    
    @Test
    public void crateApplicant() {
    
        // job information
        Job refJob = ObjectCreator.createJobs();
        String jobId = refJob.getId().toString();
        
        // applicant information
        Applicant testApplicant = ObjectCreator.createApplicant();
        // will not have an idea when coming from client
        testApplicant.setId(null);
        
        // create version of applicant that will have id after being saved
        Applicant savedApplicant = ObjectCreator.createApplicant();
        // create job list to add to applicant
        List<Job> applicantJobs = new ArrayList<>();
        applicantJobs.add(refJob);
        // add job list to employee
        savedApplicant.setJobs(applicantJobs);
        
        // create version of job that will have the applicant assigned
        Job savedJob = refJob;
        List<Applicant> applicantList = new ArrayList<>();
        applicantList.add(savedApplicant);
        savedJob.setApplicants(applicantList);
        
        // create data object client will send
        ApplicantDAO applicantDao = new ApplicantDAO(testApplicant, jobId);
    
        when(em.getReference(Job.class, jobId)).thenReturn(refJob);
        savedApplicant.setJobs(applicantJobs);
        
        when(applicantRepository.saveAndFlush(any(Applicant.class))).thenReturn(savedApplicant);
        
        // assertThat(applicantController.CrateApplicant(applicantDao), isA(ApplicantDAO.class));
        
    }
}
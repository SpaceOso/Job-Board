package tech.spaceoso.jobboard.controller;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import tech.spaceoso.jobboard.ObjectCreator;
import tech.spaceoso.jobboard.model.Applicant;
import tech.spaceoso.jobboard.model.ApplicantDAO;
import tech.spaceoso.jobboard.model.Job;
import tech.spaceoso.jobboard.repository.ApplicantRepository;
import tech.spaceoso.jobboard.repository.JobRepository;

import javax.persistence.EntityManager;
import java.util.*;

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

        // configure the mapper
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
        mapper.findAndRegisterModules();

        // ***FROM CLIENT ***
        // job information
        Job refJob = ObjectCreator.createJobs();
        String jobId = refJob.getId().toString();
        // applicant information
        Applicant clientSideApplicant = ObjectCreator.createApplicant();
        // will not have an id when coming from client
        clientSideApplicant.setId(null);

        Map<String, Object> applicantDaoWrapper = new HashMap<>();
        applicantDaoWrapper.put("applicant", clientSideApplicant);
        applicantDaoWrapper.put("jobId", jobId);

        // create multi part
        MockMultipartFile applicantMultiPart = new MockMultipartFile("companyDao", "", "application/json", mapper.writerWithDefaultPrettyPrinter().writeValueAsString(json).getBytes());



        // create data object client will send
        ApplicantDAO applicantDao = new ApplicantDAO(clientSideApplicant, jobId);

        // server side applicant
        List<Job> applicantJobs = new ArrayList<>();
        applicantJobs.add(refJob);
        clientSideApplicant.setJobs(applicantJobs);

        // create version of applicant that will have id after being saved
        Applicant savedApplicant = clientSideApplicant;
        // set ID to mimic it saved
        savedApplicant.setId(ObjectCreator.generateId());

        // create version of job that will have the applicant assigned
        Job savedJob = refJob;
        List<Applicant> applicantList = new ArrayList<>();
        applicantList.add(savedApplicant);
        savedJob.setApplicants(applicantList);

        // create backend versions
        when(em.getReference(Job.class, jobId)).thenReturn(refJob);

        when(applicantRepository.saveAndFlush(any(Applicant.class))).thenReturn(savedApplicant);


        
        assertThat(applicantController.CrateApplicant(applicantDao), isA(ApplicantDAO.class));
        
    }

}
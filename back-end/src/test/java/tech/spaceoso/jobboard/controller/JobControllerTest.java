package tech.spaceoso.jobboard.controller;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tech.spaceoso.jobboard.ObjectCreator;
import tech.spaceoso.jobboard.model.Address;
import tech.spaceoso.jobboard.model.Job;
import tech.spaceoso.jobboard.model.JobWrapper;
import tech.spaceoso.jobboard.repository.JobRepository;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.*;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class JobControllerTest {
    private UUID id;

    public JobControllerTest() {
        this.id = UUID.randomUUID();
    }

    @InjectMocks
    JobController jobController;

    @Mock
    JobRepository jobRepository;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testJobControllerGetById() {
//        Job job = new Job(id, LocalDateTime.now(),"Fake job", new Address("6df02 fake street", "palmdaless", "NY", 12345), "Test tube job ", ObjectCreator.createCompany());
//
//        when(jobRepository.getOne(id)).thenReturn(job);
//
//        JobWrapper jobTest = jobController.getJobById(id);
//
//        verify(jobRepository).getOne(id);
//
//        assertThat(jobTest, is(job));
    }

    @Test
    public void testJobControllerList() {
        List<Job> jobs = ObjectCreator.createJobs(4);

        when(jobRepository.findAll()).thenReturn(jobs);

        List<Job> returnedJobs = jobController.list();

        verify(jobRepository).findAll();

        assertThat(returnedJobs.get(0), is(jobs.get(0)));
    }

    @Test
    public void testJobCreate() {
        UUID companyId = UUID.randomUUID();

        //TODO create test
    }


}

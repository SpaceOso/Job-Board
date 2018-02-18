package tech.spaceoso.jobboard.controller;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tech.spaceoso.jobboard.model.Address;
import tech.spaceoso.jobboard.model.Job;
import tech.spaceoso.jobboard.repository.JobRepository;

import java.util.Random;
import java.util.UUID;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class JobControllerTest {
    @InjectMocks
    JobController jobController;

    @Mock
    JobRepository jobRepository;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testJobControllerGetById(){
        UUID id = UUID.randomUUID();

        Job job = new Job(id, "Fake job", new Address("6df02 fake street", "palmdaless", "NY", 12345), "Test tube job ", 1L);

        when(jobRepository.findOne(id)).thenReturn(job);

        Job jobTest = jobController.getJobById(id);

        verify(jobRepository).findOne(id);

        assertThat(jobTest, is(job) );

    }


}

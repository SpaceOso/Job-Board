package tech.spaceoso.jobboard.controller;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tech.spaceoso.jobboard.ObjectCreator;
import tech.spaceoso.jobboard.model.Address;
import tech.spaceoso.jobboard.model.Employer;
import tech.spaceoso.jobboard.model.Job;
import tech.spaceoso.jobboard.repository.EmployerRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class EmployerControllerTest {
    // creates an instance
    @InjectMocks
    EmployerController employerController;

    // injects this into employerController
    @Mock
    EmployerRepository employerRepository;

    // tells mockito to check what needs to be inject
    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    private UUID id = UUID.randomUUID();
    private Address testerAddress = new Address("test street", "test city", "NY", 12345);
    private Job jobTest = new Job(UUID.randomUUID(), LocalDateTime.now(), "Tester 1", testerAddress, "Fake job", ObjectCreator.createEmployer());
    private List<Job> jobList = new ArrayList<Job>();



    @Test
    public void testEmployerControllerGetById() {
        // create and save id for later use

        jobList.add(jobTest);

        // create mock mockEmployer
        Employer mockEmployer = new Employer(id, new Date(), "Test Tube Employer", new Address("fake street", "fake city", "NY", 12345), "fake.png", "fake.com", "twitter", "facebook", "linkedin", jobList);

        // when we search the repo for id return mock mockEmployer
        when(employerRepository.getOne(id)).thenReturn(mockEmployer);

        // the controller calls the repo.findOne method the above snippet is what returns an mockEmployer to employer
        Employer employer = employerController.getEmployerById(id);

        // this checks that the actual method was called
        verify(employerRepository).getOne(id);

        // compare
        assertThat(employer, is(mockEmployer));

    }

    @Test
    public void testEmployerCreate() {
        jobList.add(jobTest);
        // create mockEmployer to use within this test
        Employer mockEmployer = new Employer(UUID.randomUUID(), new Date(), "Test Tube Created", new Address("fake street", "fake city", "NY", 12345), "fake.png", "fake.com", "twitter", "facebook", "linkedin", jobList);

        // when we contact the repo to create return the created employer
        when(employerRepository.saveAndFlush(mockEmployer)).thenReturn(mockEmployer);

        // send the mock employer to the controller to store in repo
        Employer employerTest = employerController.create(mockEmployer);

        // check that correct method was called
        verify(employerRepository).saveAndFlush(mockEmployer);

        // compare the created returned employer with our mockEmployer
        assertThat(employerTest, is(mockEmployer));
    }


}

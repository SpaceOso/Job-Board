package tech.spaceoso.jobboard.controller;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tech.spaceoso.jobboard.ObjectCreator;
import tech.spaceoso.jobboard.model.Address;
import tech.spaceoso.jobboard.model.Company;
import tech.spaceoso.jobboard.model.Employee;
import tech.spaceoso.jobboard.model.Job;
import tech.spaceoso.jobboard.repository.CompanyRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class CompanyControllerTest {
    // creates an instance
    @InjectMocks
    CompanyController companyController;

    // injects this into companyController
    @Mock
    CompanyRepository companyRepository;

    // tells mockito to check what needs to be inject
    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    private UUID id = UUID.randomUUID();
    private Address testerAddress = new Address("test street", "test city", "NY", 12345);
    private Job jobTest = new Job(UUID.randomUUID(), LocalDateTime.now(), "Tester 1", testerAddress, "Fake job", ObjectCreator.createCompany());
    private List<Job> jobList = new ArrayList<Job>();
    private List<Employee> employerList = new ArrayList<Employee>();



    @Test
    public void testCompanyControllerGetById() {
        // create and save id for later use

        jobList.add(jobTest);

        // create mock mockCompany
        Company mockCompany = new Company(id, new Date(), "Test Tube Company", new Address("fake street", "fake city", "NY", 12345), "fake.png", "fake.com", "twitter", "facebook", "linkedin", employerList,jobList);

        // when we search the repo for id return mock mockCompany
        when(companyRepository.getOne(id)).thenReturn(mockCompany);

        // the controller calls the repo.findOne method the above snippet is what returns an mockCompany to company
        Company company = companyController.getCompanyById(id);

        // this checks that the actual method was called
        verify(companyRepository).getOne(id);

        // compare
        assertThat(company, is(mockCompany));

    }

    @Test
    public void testCompanyCreate() {
        jobList.add(jobTest);
        // create mockCompany to use within this test
        Company mockCompany = new Company(UUID.randomUUID(), new Date(), "Test Tube Created", new Address("fake street", "fake city", "NY", 12345), "fake.png", "fake.com", "twitter", "facebook", "linkedin",employerList, jobList);

        // when we contact the repo to create return the created company
        when(companyRepository.saveAndFlush(mockCompany)).thenReturn(mockCompany);

        // send the mock company to the controller to store in repo
        Company companyTest = companyController.create(mockCompany);

        // check that correct method was called
        verify(companyRepository).saveAndFlush(mockCompany);

        // compare the created returned company with our mockCompany
        assertThat(companyTest, is(mockCompany));
    }


}

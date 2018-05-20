package tech.spaceoso.jobboard.controller;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import static org.hamcrest.CoreMatchers.notNullValue;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import tech.spaceoso.jobboard.ObjectCreator;
import tech.spaceoso.jobboard.model.*;
import tech.spaceoso.jobboard.repository.CompanyRepository;
import tech.spaceoso.jobboard.repository.EmployeeRepository;
import tech.spaceoso.jobboard.repository.JobApplicantRepository;
import tech.spaceoso.jobboard.repository.JobRepository;

import javax.persistence.EntityManager;
import java.lang.reflect.Array;
import java.time.LocalDateTime;
import java.util.*;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.emptyIterable;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.iterableWithSize;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
// @WebMvcTest
public class CompanyControllerTest {
    
    private MockMvc mockMvc;
    
    // creates an instance
    @InjectMocks
    CompanyController companyController;
    
    @Mock
    EntityManager entityManager;
    
    // injects this into companyController
    @Mock
    CompanyRepository companyRepository;
    @Mock
    EmployeeRepository employeeRepository;
    @Mock
    JobRepository jobRepository;
    @Mock
    JobApplicantRepository jobApplicantRepository;
    
    
    // tells mockito to check what needs to be inject
    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(companyController)
                .build();
    }
    
    private UUID id = UUID.randomUUID();
    private Address testerAddress = new Address("test street", "test city", "NY", "12345");
    private Job jobTest = new Job(UUID.randomUUID(), LocalDateTime.now(), "Tester 1", testerAddress, "Fake job", ObjectCreator.createCompany());
    private List<Job> jobList = new ArrayList<Job>();
    private List<Employee> employerList = new ArrayList<Employee>();
    Company company = ObjectCreator.createCompany();
    
    @Test
    public void testCreateNewCompany() throws Exception {
        // test that it saves the a company and returns an employee wrapper
        // create the companyWrapper that is used in the post body
        
        // configure the mapper
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
        mapper.findAndRegisterModules();
        
        // create mock company and employee
        Company company = ObjectCreator.createCompany();
        // set to null to mock how it is received from the client
        company.setId(null);
        
        // employee is already created at this point so it's id is ok
        Employee employee = ObjectCreator.createEmployee();
        
        Map<String, Object> newWrapper = new HashMap<>();
        newWrapper.put("company", company);
        newWrapper.put("employeeId", employee.getId());
        
        System.out.println("The employee id before we ship" + newWrapper.get("employeeId"));
        
        // when we find a user when the id
        when(entityManager.getReference(Employee.class, employee.getId())).thenReturn(employee);
        
        // when we save the company to create the UUID
        Company newSaved = company;
        newSaved.setId(ObjectCreator.generateId());
        when(companyRepository.saveAndFlush(any(Company.class))).thenReturn(newSaved);
        
        System.out.println("The newSaved mock is: " + newSaved);
        
        JsonNode json = mapper.valueToTree(newWrapper);
        
        MockMultipartFile companyMultiPart = new MockMultipartFile("companyWrapper", "", "application/json", mapper.writerWithDefaultPrettyPrinter().writeValueAsString(json).getBytes());
        System.out.println("newWrapper.tostring() : " + mapper.writerWithDefaultPrettyPrinter().writeValueAsString(json));
    
        MvcResult result = this.mockMvc.perform(
                multipart("/secured/company/create")
                        .file(companyMultiPart))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andDo(print())
                .andExpect(jsonPath("$.company").exists())
                .andExpect(jsonPath("$.company.id").value(Matchers.isA(String.class)))
                .andExpect(jsonPath("$.company.name").value(Matchers.isA(String.class)))
                .andExpect(jsonPath("$.company.logoImg").value(Matchers.isA(String.class)))
                .andExpect(jsonPath("$.company.website").value(Matchers.isA(String.class)))
                .andExpect(jsonPath("$.company.createdDate").value(Matchers.isA(net.minidev.json.JSONArray.class)))
                .andExpect(jsonPath("$.company.address").exists())
                .andExpect(jsonPath("$.employee").exists())
                .andExpect(jsonPath("$.employee.id").value(Matchers.isA(String.class)))
                .andExpect(jsonPath("$.employee.firstName").value(Matchers.isA(String.class)))
                .andExpect(jsonPath("$.employee.lastName").value(Matchers.isA(String.class)))
                .andExpect(jsonPath("$.employee.email").value(Matchers.isA(String.class)))
                .andExpect(jsonPath("$.employee.createdDate").value(Matchers.isA(net.minidev.json.JSONArray.class)))
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.token").value(Matchers.isA(String.class)))
                .andExpect(jsonPath("$.employee.password").doesNotExist())
                .andReturn();
        
    }
    
    @Test
    public void getCompanyName() throws Exception {
        UUID id = UUID.fromString("3cbec9db-cb65-4137-862f-a3d532c949a4");
        
        Company comp = ObjectCreator.createCompany();
        
        when(companyRepository.getOne(id)).thenReturn(comp);
        
        this.mockMvc.perform(
                get("/secured/company/getname/" + id)
        ).andExpect(status().isOk());
    }
    
    @Test
    public void testEmptyArrayWhenNoJobs() throws Exception{
        given(jobRepository.getAllJob_IdFromCompany_Id(company.getId())).willReturn(new ArrayList<>());
    
        this.mockMvc.perform(
                get("/secured/company/" + company.getId() + "/get-jobs"))
                .andExpect(status().isOk())
                .andDo(print());
    }
    
    @Test
    public void testGetCompanyJobs() throws Exception {
        
        // create two jobs
        Job job1 = ObjectCreator.createJobs();
        Job job2 = ObjectCreator.createJobs();
        
        // create two applicants
        Applicant applicant1 = ObjectCreator.createApplicant();
        applicant1.setFirstName("First");
        Applicant applicant2 = ObjectCreator.createApplicant();
        applicant2.setFirstName("Second");
    
        // we want to loop through the list of jobs that the applicant has
        // and add all the applicants per job
        List<UUID> uuidList = new ArrayList<>();
        uuidList.add(job1.getId());
        uuidList.add(job2.getId());
    
        System.out.println("The job list before sending: " + uuidList);
        
        // create two job applicants
        JobApplicants job1Applicant = new JobApplicants();
        job1Applicant.setJob(job1);
        job1Applicant.setApplicant(applicant1);
        
        JobApplicants job2Applicant = new JobApplicants();
        job2Applicant.setJob(job1);
        job2Applicant.setApplicant(applicant2);
        
        List<JobApplicants> applicantList = new ArrayList<>();
        applicantList.add(job1Applicant);
        applicantList.add(job2Applicant);
        
        given(jobRepository.getAllJob_IdFromCompany_Id(company.getId())).willReturn(uuidList);
        given(jobApplicantRepository.getOnlyApplicants(job1.getId())).willReturn(applicantList);
        given(jobApplicantRepository.getOnlyApplicants(job2.getId())).willReturn(new ArrayList<>());
        
        this.mockMvc.perform(
                get("/secured/company/" + company.getId() + "/get-jobs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath(job1.getId().toString()).exists())
                .andExpect(jsonPath(job1.getId().toString()).isArray())
                .andExpect(jsonPath(job2.getId().toString()).exists())
                .andExpect(jsonPath(job2.getId().toString()).isArray())
                .andDo(print())
        ;
        
    }

    @Test
    public void testGetCompanyJobsFail() throws Exception{
        UUID uuid = ObjectCreator.generateId();
        assertThat(jobRepository.findJobsByCompany_Id(uuid), is(emptyIterable()));
    }
    
    @Test
    public void testCreateNewJob() {
        // create wrapper that front-end sends
        JobWrapper jobWrapper = new JobWrapper();

        Company company = ObjectCreator.createCompany();

        Job job1 = ObjectCreator.createJobs();
        job1.setId(null);

        jobWrapper.setCompanyId(company.getId().toString());
        jobWrapper.setJob(job1);

        when(entityManager.getReference(Company.class, company.getId())).thenReturn(company);
        
        Job jobWithId = ObjectCreator.createJobs();
        jobWithId.setCompany(company);
        jobWithId.setTitle("Job With ID");

        when(jobRepository.saveAndFlush(any(Job.class))).thenReturn(jobWithId);

        JobWrapper response = companyController.createNewJob(jobWrapper);
        System.out.println("The response that we get " + response.getJob().getId());

        assertThat(response, Matchers.isA(JobWrapper.class));
        assertThat(response.getJob().getId(), is(notNullValue()));
        assertThat(response.getJob().getCompany(), Matchers.isA(Company.class));
        assertThat(response.getJob(), Matchers.isA(Job.class));
    }

}

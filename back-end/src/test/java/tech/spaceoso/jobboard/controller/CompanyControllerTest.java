package tech.spaceoso.jobboard.controller;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.apache.tomcat.jni.Local;
import org.hamcrest.Matcher;
import org.hamcrest.Matchers;
import org.json.JSONArray;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import tech.spaceoso.jobboard.ObjectCreator;
import tech.spaceoso.jobboard.model.*;
import tech.spaceoso.jobboard.repository.CompanyRepository;
import tech.spaceoso.jobboard.repository.EmployeeRepository;
import tech.spaceoso.jobboard.repository.JobRepository;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.*;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.emptyIterable;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.iterableWithSize;
import static org.junit.Assert.assertNull;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
// @WebMvcTest()
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
    public void testGetCompanyJobs() throws Exception {
        Company company = ObjectCreator.createCompany();
        
        List<Job> jobs = new ArrayList<>();
        Job job1 = ObjectCreator.createJobs();
        Job job2 = ObjectCreator.createJobs();
        jobs.add(job1);
        jobs.add(job2);

        company.setJobs(jobs);

        when(jobRepository.findJobsByCompany_Id(company.getId())).thenReturn(jobs);

        assertThat(companyController.getCompanyJobs(company.getId()), is(iterableWithSize(2)));
        assertThat(jobs, is(companyController.getCompanyJobs(company.getId())));
    }

    @Test
    public void testGetCompanyJobsFail() throws Exception{
        UUID uuid = ObjectCreator.generateId();
        assertThat(jobRepository.findJobsByCompany_Id(uuid), is(emptyIterable()));
    }
    
    @Test
    public void createNewJob() {
    }

}

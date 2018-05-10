package tech.spaceoso.jobboard.controller;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import tech.spaceoso.jobboard.ObjectCreator;
import tech.spaceoso.jobboard.model.Applicant;
import tech.spaceoso.jobboard.model.ApplicantDAO;
import tech.spaceoso.jobboard.repository.ApplicantRepository;
import tech.spaceoso.jobboard.repository.JobApplicantRepository;
import tech.spaceoso.jobboard.repository.JobRepository;

import javax.persistence.EntityManager;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
// @WebMvcTest(ApplicantController.class)
// @SpringBootTest
// @AutoConfigureMockMvc
public class ApplicantControllerTest {
    
    private static final Applicant applicant = ObjectCreator.createApplicant();
    
    @Mock
    ApplicantRepository applicantRepository;
    @Mock
    JobRepository jobRepository;
    @Mock
    JobApplicantRepository jobApplicantRepository;
    @Mock
    EntityManager em;
    
    @InjectMocks
    ApplicantController applicantController;
    
    // @Autowired
    private MockMvc mockMvc;
    
    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(applicantController)
                .build();
    }
    
    @Test
    public void crateApplicant() throws Exception {
        applicant.setId(null);
        ApplicantDAO applicantDao = new ApplicantDAO(applicant, "f60d0781-e3fe-419b-a4f5-8bd34be843c8");
    
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        mapper.findAndRegisterModules();
        
        
        MockMultipartFile resumeFile = new MockMultipartFile("resume", "resume.text", "text/plain", "Someones coverletter".getBytes());
        MockMultipartFile coverLetterFile = new MockMultipartFile("coverLetter", "coverletter.text", "text/plain", "Someones coverletter".getBytes());
        Map<String, Object> newWrapper = new HashMap<>();
        newWrapper.put("applicantDao", applicantDao);
        newWrapper.put("resume", resumeFile);
        newWrapper.put("coverLetter", coverLetterFile);
    
        JsonNode json = mapper.valueToTree(applicantDao);
    
        System.out.println("The json: " + json);
    
        MockMultipartFile companyMultiPart = new MockMultipartFile("applicantDao", "", "application/json", mapper.writerWithDefaultPrettyPrinter().writeValueAsString(json).getBytes());
        MockMultipartFile applicantDao1 = new MockMultipartFile("applicantDao","", "application/json", mapper.writerWithDefaultPrettyPrinter().writeValueAsString(json).getBytes());
        
        this.mockMvc.perform(
                multipart("/api/v1/applicant/create")
                        .file(applicantDao1)
                        .file(resumeFile)
                        .file(coverLetterFile))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andDo(print())
                .andReturn();

    }

}
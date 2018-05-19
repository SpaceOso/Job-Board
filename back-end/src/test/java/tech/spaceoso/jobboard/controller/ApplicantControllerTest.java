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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import tech.spaceoso.jobboard.ObjectCreator;
import tech.spaceoso.jobboard.model.Applicant;
import tech.spaceoso.jobboard.model.ApplicantDTO;
import tech.spaceoso.jobboard.repository.ApplicantRepository;
import tech.spaceoso.jobboard.repository.JobApplicantRepository;
import tech.spaceoso.jobboard.repository.JobRepository;
import tech.spaceoso.jobboard.service.AmazonClient;

import javax.persistence.EntityManager;

import java.util.HashMap;
import java.util.Map;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
public class ApplicantControllerTest {
    
    private static final Applicant applicant = ObjectCreator.createApplicant();
    private static final MockMultipartFile resumeFile = new MockMultipartFile("resume", "resume.text", "text/plain", "Someones coverletter".getBytes());
    private static final MockMultipartFile coverLetterFile = new MockMultipartFile("coverLetter", "coverletter.text", "text/plain", "Someones coverletter".getBytes());
    ObjectMapper mapper = new ObjectMapper();
    ApplicantDTO applicantDTO = new ApplicantDTO(applicant, ObjectCreator.generateId().toString());
    
    @Mock
    ApplicantRepository applicantRepository;
    @Mock
    JobRepository jobRepository;
    @Mock
    JobApplicantRepository jobApplicantRepository;
    @Mock
    AmazonClient amazonClient;
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
        
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        mapper.findAndRegisterModules();
    }
    
    @Test
    public void createApplicant_Error_WhenNoResumeIsGiven() throws Exception{
        applicant.setId(null);

        JsonNode json = mapper.valueToTree(applicantDTO);
    
        MockMultipartFile applicantFile = new MockMultipartFile("applicantDTO","", "application/json", mapper.writerWithDefaultPrettyPrinter().writeValueAsString(json).getBytes());
    
        when(amazonClient.uploadFile(coverLetterFile)).thenReturn(coverLetterFile.getOriginalFilename());
        
        this.mockMvc.perform(
                multipart("/api/v1/applicant/create")
                        .file(applicantFile)
                        .file(coverLetterFile))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").exists())
                .andExpect(jsonPath("$.message").value("Sorry, but you need to include a resume"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andDo(print())
                .andReturn();
                
    }
    
    @Test
    public void crateApplicant() throws Exception {
        
        applicant.setId(null);
        
        JsonNode json = mapper.valueToTree(applicantDTO);
    
        System.out.println("The json: " + json);
    
        MockMultipartFile applicantFile = new MockMultipartFile("applicantDTO","", "application/json", mapper.writerWithDefaultPrettyPrinter().writeValueAsString(json).getBytes());
    
        when(amazonClient.uploadFile(coverLetterFile)).thenReturn(coverLetterFile.getOriginalFilename());
        when(amazonClient.uploadFile(resumeFile)).thenReturn(resumeFile.getOriginalFilename());
    
    
        this.mockMvc.perform(
                multipart("/api/v1/applicant/create")
                        .file(applicantFile)
                        .file(resumeFile)
                        .file(coverLetterFile))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").exists())
                .andExpect(jsonPath("$.message").value("Thank you for submitting your application!"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andDo(print())
                .andReturn();
    
    }

}

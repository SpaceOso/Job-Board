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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import org.springframework.web.client.RestTemplate;
import tech.spaceoso.jobboard.ObjectCreator;
import tech.spaceoso.jobboard.model.Applicant;
import tech.spaceoso.jobboard.model.ApplicantDAO;
import tech.spaceoso.jobboard.repository.ApplicantRepository;
import tech.spaceoso.jobboard.repository.JobApplicantRepository;
import tech.spaceoso.jobboard.repository.JobRepository;
import tech.spaceoso.jobboard.service.AmazonClient;

import javax.persistence.EntityManager;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
// @WebMvcTest(ApplicantController.class)
// @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
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
    }
    
    @Test
    public void crateApplicant() throws Exception {
        
        applicant.setId(null);
        ApplicantDAO applicantDao = new ApplicantDAO(applicant, ObjectCreator.generateId().toString());
    
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
    
        MockMultipartFile applicantFile = new MockMultipartFile("applicantDao","", "application/json", mapper.writerWithDefaultPrettyPrinter().writeValueAsString(json).getBytes());
    
        when(amazonClient.uploadFile(coverLetterFile)).thenReturn(coverLetterFile.getOriginalFilename());
        when(amazonClient.uploadFile(resumeFile)).thenReturn(resumeFile.getOriginalFilename());
    
    
        this.mockMvc.perform(
                multipart("/api/v1/applicant/create")
                        .file(applicantFile)
                        .file(resumeFile)
                        .file(coverLetterFile))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").exists())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andDo(print())
                .andReturn();
    
    }

}

package tech.spaceoso.jobboard.controller;

import jdk.nashorn.internal.codegen.ObjectCreator;
import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tech.spaceoso.jobboard.App;
import tech.spaceoso.jobboard.exception.ResourceNotFoundException;
import tech.spaceoso.jobboard.model.*;
import tech.spaceoso.jobboard.repository.ApplicantRepository;
import tech.spaceoso.jobboard.repository.JobApplicantRepository;
import tech.spaceoso.jobboard.repository.JobRepository;
import tech.spaceoso.jobboard.service.AmazonClient;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.*;
import java.util.logging.Logger;

@RestController
@RequestMapping("api/v1/applicant/")
public class ApplicantController {
    
    @PersistenceContext
    private EntityManager em;
    
    private JobApplicantRepository jobApplicantRepository;
    private ApplicantRepository applicantRepository;
    private AmazonClient amazonClient;
    
    final org.slf4j.Logger logger = LoggerFactory.getLogger(ApplicantController.class);
    
    @Autowired
    public ApplicantController( ApplicantRepository applicantRepository, AmazonClient amazonClient, JobApplicantRepository jobApplicantRepository) {
        this.applicantRepository = applicantRepository;
        this.amazonClient = amazonClient;
        this.jobApplicantRepository = jobApplicantRepository;
    }
    
    
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<ResponseTransfer> CrateApplicant(@RequestPart ApplicantDAO applicantDao,
                                                          @RequestPart(value = "coverLetter")Optional<MultipartFile> coverLetter,
                                                          @RequestPart(value = "resume")Optional<MultipartFile> resume) {
        
        // applicantRepository
        Applicant applicant = applicantDao.getApplicant();
        JobApplicants jobApplicants = new JobApplicants();
        
        Job job = em.getReference(Job.class, UUID.fromString(applicantDao.getJobId()));
        // get applicant jobs
        List<Job> applicantJobs = new ArrayList<>();
        
        // set file names for cover letter and resume
        String coverLetterUrl;
        String resumeUrl;
    
        //TODO need to check that there is a file being uploaded
        if(coverLetter.isPresent() && coverLetter != null ){
            coverLetterUrl = this.amazonClient.uploadFile(coverLetter.get());
            applicant.setCoverLetterUrl(coverLetterUrl);
        }
        
        if(resume.isPresent() && resume != null){
            resumeUrl = this.amazonClient.uploadFile(resume.get());
            applicant.setResumeUrl(resumeUrl);
        } else {
            throw new ResourceNotFoundException("Sorry, but you need to include a resume");
        }
        
        if(applicant.getJobs() != null){
            applicantJobs = applicant.getJobs();
        }
        
        applicantJobs.add(job);
        
        jobApplicants.setApplicant(applicant);
        jobApplicants.setJob(job);
    
        jobApplicantRepository.saveAndFlush(jobApplicants);
        
        Applicant savedApplicant = applicantRepository.saveAndFlush(applicantDao.getApplicant());
        
        applicantDao.setApplicant(savedApplicant);
        
        return ResponseEntity.ok(new ResponseTransfer("Thank you for submitting your application!"));
    }
}

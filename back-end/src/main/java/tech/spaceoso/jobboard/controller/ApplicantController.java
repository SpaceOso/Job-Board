package tech.spaceoso.jobboard.controller;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tech.spaceoso.jobboard.model.*;
import tech.spaceoso.jobboard.repository.ApplicantRepository;
import tech.spaceoso.jobboard.repository.JobApplicantRepository;
import tech.spaceoso.jobboard.service.AmazonClient;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.*;

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
    public ResponseEntity<ResponseTransfer> CrateApplicant(@RequestPart ApplicantDTO applicantDTO,
                                                          @RequestPart(value = "coverLetter")Optional<MultipartFile> coverLetter,
                                                          @RequestPart(value = "resume")Optional<MultipartFile> resume) {
        
        // applicantRepository
        Applicant applicant = applicantDTO.getApplicant();
        // System.out.println("The applicant in the backend: " + applicant.toString());
        JobApplicants jobApplicants = new JobApplicants();
        
        Job job = em.getReference(Job.class, UUID.fromString(applicantDTO.getJobId()));
        
        
        // set file names for cover letter and resume
        String coverLetterUrl;
        String resumeUrl;
    
        //TODO need to check that there is a file being uploaded
        if(coverLetter.isPresent() && coverLetter != null ){
            coverLetterUrl = this.amazonClient.uploadFile(coverLetter.get());
            System.out.println("The cover letter name is: " + coverLetterUrl);
            applicant.setCoverLetterUrl(coverLetterUrl);
        }
        
        if(resume.isPresent() && resume != null){
            resumeUrl = this.amazonClient.uploadFile(resume.get());
            System.out.println("The cover letter name is: " + resumeUrl);
            applicant.setResumeUrl(resumeUrl);
        } else {
            return ResponseEntity.badRequest().body(new ResponseTransfer("Sorry, but you need to include a resume"));
        }
        
        
        jobApplicants.setApplicant(applicant);
        jobApplicants.setJob(job);
    
        jobApplicantRepository.saveAndFlush(jobApplicants);
        
        Applicant savedApplicant = applicantRepository.saveAndFlush(applicantDTO.getApplicant());
        
        applicantDTO.setApplicant(savedApplicant);
        
        return ResponseEntity.ok(new ResponseTransfer("Thank you for submitting your application!"));
    }
}

package tech.spaceoso.jobboard.controller;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tech.spaceoso.jobboard.App;
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
    
    private JobRepository jobRepository;
    private JobApplicantRepository jobApplicantRepository;
    private ApplicantRepository applicantRepository;
    private AmazonClient amazonClient;
    
    final org.slf4j.Logger logger = LoggerFactory.getLogger(ApplicantController.class);
    
    @Autowired
    public ApplicantController(JobRepository jobRepository, ApplicantRepository applicantRepository, AmazonClient amazonClient, JobApplicantRepository jobApplicantRepository) {
        this.jobRepository = jobRepository;
        this.applicantRepository = applicantRepository;
        this.amazonClient = amazonClient;
        this.jobApplicantRepository = jobApplicantRepository;
    }
    
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ApplicantDAO CrateApplicant(@RequestPart ApplicantDAO applicantDao,
                                       @RequestPart(value = "coverLetter")Optional<MultipartFile> coverLetter,
                                       @RequestPart(value = "resume")Optional<MultipartFile> resume){
        System.out.println("Inside the createApplicant call");
        System.out.println("AppcliantDAO: " + applicantDao.toString());
        System.out.println("The cover letter " + coverLetter);
        
        // applicantRepository.
        Applicant applicant = applicantDao.getApplicant();
        JobApplicants jobApplicants = new JobApplicants();
        
        Job job = em.getReference(Job.class, UUID.fromString(applicantDao.getJobId()));
        // get applicant jobs
        List<Job> applicantJobs = new ArrayList<>();
        
        // set file names for cover letter and resume
        String coverLetterUrl = "";
        String resumeUrl = "";
    
        //TODO need to check that there is a file being uploaded
        if(coverLetter.isPresent() ){
            System.out.println("THERE WAS A COVER LETTER TO ADD!!!!!!!");
            coverLetterUrl = this.amazonClient.uploadFile(coverLetter.get());
            logger.info(coverLetter.toString());
            logger.info("The cover letter name is!!" + coverLetterUrl);
            applicant.setCoverLetterUrl(coverLetterUrl);
        }
        
        if(resume.isPresent()){
            System.out.println("THERE WAS ALSO A RESUME!!!");
            resumeUrl = this.amazonClient.uploadFile(resume.get());
            logger.info(resume.toString());
            logger.info("THe resume file name is! " + resumeUrl);
            applicant.setResumeUrl(resumeUrl);
        }
        
        if(applicant.getJobs() != null){
            applicantJobs = applicant.getJobs();
        }
        
        System.out.println("The job list we got from the applicant: " + applicantJobs.toString());
        applicantJobs.add(job);
        
        jobApplicants.setApplicant(applicant);
        jobApplicants.setJob(job);
    
        jobApplicantRepository.saveAndFlush(jobApplicants);
        
        Applicant savedApplicant = applicantRepository.saveAndFlush(applicantDao.getApplicant());
        
        applicantDao.setApplicant(savedApplicant);
        
        return applicantDao;
    }
}

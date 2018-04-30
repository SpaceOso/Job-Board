package tech.spaceoso.jobboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tech.spaceoso.jobboard.App;
import tech.spaceoso.jobboard.model.Applicant;
import tech.spaceoso.jobboard.model.ApplicantDAO;
import tech.spaceoso.jobboard.model.Company;
import tech.spaceoso.jobboard.model.Job;
import tech.spaceoso.jobboard.repository.ApplicantRepository;
import tech.spaceoso.jobboard.repository.JobRepository;
import tech.spaceoso.jobboard.service.AmazonClient;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@RequestMapping("api/v1/applicant/")
public class ApplicantController {
    
    @PersistenceContext
    private EntityManager em;
    
    private JobRepository jobRepository;
    private ApplicantRepository applicantRepository;
    private AmazonClient amazonClient;
    
    @Autowired
    public ApplicantController(JobRepository jobRepository, ApplicantRepository applicantRepository, AmazonClient amazonClient) {
        this.jobRepository = jobRepository;
        this.applicantRepository = applicantRepository;
        this.amazonClient = amazonClient;
    }
    
    @RequestMapping(value = "create", method = RequestMethod.POST)
    public ApplicantDAO CrateApplicant(ApplicantDAO applicantDao){
        System.out.println("CreateApplicant with: " + applicantDao.toString());
        // applicantRepository.
        Applicant applicant = applicantDao.getApplicant();
        Job job = em.getReference(Job.class, applicantDao.getJobId());
        // get applicant jobs
        List<Job> applicantJobs = applicant.getJobs();
        applicantJobs.add(job);
        
        Applicant savedApplicant = applicantRepository.saveAndFlush(applicantDao.getApplicant());
        
        applicantDao.setApplicant(savedApplicant);
        
        return applicantDao;
    }
}

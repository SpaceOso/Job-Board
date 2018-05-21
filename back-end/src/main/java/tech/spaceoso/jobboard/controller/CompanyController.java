package tech.spaceoso.jobboard.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tech.spaceoso.jobboard.model.*;
import tech.spaceoso.jobboard.repository.CompanyRepository;
import tech.spaceoso.jobboard.repository.EmployeeRepository;
import tech.spaceoso.jobboard.repository.JobApplicantRepository;
import tech.spaceoso.jobboard.repository.JobRepository;
import tech.spaceoso.jobboard.security.JWTBuilder;
import tech.spaceoso.jobboard.service.AmazonClient;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.*;

@RestController
@RequestMapping(value = "/secured/company/")
public class CompanyController {

    @PersistenceContext
    private EntityManager em;

    final Logger logger = LoggerFactory.getLogger(CompanyController.class);

    private CompanyRepository companyRepository;
    private EmployeeRepository employeeRepository;
    private AmazonClient amazonClient;
    private JobRepository jobRepository;
    private JobApplicantRepository jobApplicantRepository;

    @Autowired
    CompanyController(CompanyRepository companyRepository,
                      EmployeeRepository employeeRepository,
                      AmazonClient amazonClient,
                      JobRepository jobRepository,
                      JobApplicantRepository jobApplicantRepository){
        this.companyRepository = companyRepository;
        this.employeeRepository = employeeRepository;
        this.amazonClient = amazonClient;
        this.jobRepository = jobRepository;
        this.jobApplicantRepository = jobApplicantRepository;
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public EmployeeWrapper createNewCompany(@RequestPart CompanyWrapper companyWrapper, @RequestPart(value = "logoFile") Optional<MultipartFile> file){
        System.out.println("createNewCompany Loaded" + companyWrapper.getEmployeeId().toString());
        String logoUrl = "";

        //TODO need to check that there is a file being uploaded
        if(file.isPresent() ){
            logoUrl = this.amazonClient.uploadFile(file.get());
            logger.info(file.toString());
        }

        logger.info("the wrapper id:" + companyWrapper.getEmployeeId().toString());
        logger.info("the wrapper company:" + companyWrapper.getCompany().toString());

        // create company object from wrapper
        Company company = companyWrapper.getCompany();
    
        System.out.println("company built " + company.toString());
        
        // update the logo for the company
        company.setLogoImg(logoUrl);
    
        System.out.println("employee ref bout to be grabbed...");
        
        // get reference to employee object from wrapper employeeId
        Employee employee = em.getReference(Employee.class, companyWrapper.getEmployeeId());
    
        System.out.println("employee grabbed " + employee.toString());
        // save and return company to get it's auto generated ID

        Company newSaved = companyRepository.saveAndFlush(company);

        System.out.println("newSavedCOmpany crated : " + newSaved);
        
        // update the employee reference with the newly saved company
        employee.setCompany(newSaved);
    
        System.out.println("employee company set : " + employee.toString());

        // save the updated employee object
        employeeRepository.saveAndFlush(employee);

        EmployeeWrapper updatedEmployee = new EmployeeWrapper(employee, newSaved.getId(), newSaved);

        String updatedToken = JWTBuilder.buildCompanyToken(employee.getEmail(), employee);
        updatedEmployee.setToken(updatedToken);

        return updatedEmployee;
    }

    /**
     * Called when logging into dashboard
     * @param companyId
     * @return
     */
    @RequestMapping(value = "/{companyId}/get-jobs", method = RequestMethod.GET)
    public List<Job> getCompanyJobs(@PathVariable UUID companyId){
        return jobRepository.findJobsByCompany_Id(companyId);
    }
    
    @RequestMapping(value = "/{companyId}/get-jobs-and-applicants", method = RequestMethod.GET)
    public Map<String, Object> getJobListAndApplicantList(@PathVariable UUID companyId){
        Map<UUID, List<JobApplicants>> jobApplicantList = getApplicantsForJobs(companyId);
        Map<String, Object> combinedList = new HashMap<>();
        combinedList.put("jobApplicantList", jobApplicantList);
        List<Job> jobLists = jobRepository.findJobsByCompany_Id(companyId);
        combinedList.put("jobList", jobLists);
    
        return combinedList;
    }
    
    /**
     * Called when logging into dashboard
     * @param companyId
     * @return
     */
    @RequestMapping(value = "/{companyId}/get-applicants", method = RequestMethod.GET)
    public Map<UUID, List<JobApplicants>> getApplicantsForJobs(@PathVariable UUID companyId){
        // get a list of all the jobs this company has
        List<UUID> companyJobs = jobRepository.getAllJob_IdFromCompany_Id(companyId);
        // will collect all the applicants per job
        HashMap<UUID, List<JobApplicants>> jobApplicantList = new HashMap<>();
        
        // need to loop through list of companyJobs and find all applicants per job
        if(!companyJobs.isEmpty()){
            for(UUID id : companyJobs){
                jobApplicantList.put(id, jobApplicantRepository.getOnlyApplicants(id));
            }
        } else {
            return null;
        }
        
        return jobApplicantList;
    }
    
    @RequestMapping(value = "/{companyId}/get-test", method = RequestMethod.GET)
    public List<JobApplicants> findAllByJob_Id(@PathVariable UUID companyId){
        
        return jobApplicantRepository.findAllByJob_Id(companyId);
    }
    
    
    /**
     * Creates a new job from within the companies dashboard
     * @param jobWrapper
     * @return
     */
    @RequestMapping(value = "/jobposts/create", method = RequestMethod.POST)
    public JobWrapper createNewJob(@RequestBody JobWrapper jobWrapper){
        logger.info("creating a new job with:", jobWrapper);
        
        // get company reference from companyId sent in JSON
        Company company = em.getReference(Company.class, UUID.fromString(jobWrapper.getCompanyId()));
        System.out.println("The company created " + company.toString());
        
        // create and save a default job
        Job newJob = jobWrapper.getJob();
        newJob.setCompany(company);
        
        newJob = jobRepository.saveAndFlush(newJob);
        
        // send back the new job with company info and all other jobs
        JobWrapper wrappedJob = new JobWrapper(newJob, company.getId().toString());
        wrappedJob.setCompany(company);
        
        return wrappedJob;
    }

}

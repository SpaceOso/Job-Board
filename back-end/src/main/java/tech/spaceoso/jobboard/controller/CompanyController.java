package tech.spaceoso.jobboard.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tech.spaceoso.jobboard.model.*;
import tech.spaceoso.jobboard.repository.CompanyRepository;
import tech.spaceoso.jobboard.repository.EmployeeRepository;
import tech.spaceoso.jobboard.repository.JobRepository;
import tech.spaceoso.jobboard.security.JWTBuilder;
import tech.spaceoso.jobboard.service.AmazonClient;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    @Autowired
    CompanyController(CompanyRepository companyRepository,
                      EmployeeRepository employeeRepository,
                      AmazonClient amazonClient,
                      JobRepository jobRepository){
        this.companyRepository = companyRepository;
        this.employeeRepository = employeeRepository;
        this.amazonClient = amazonClient;
        this.jobRepository = jobRepository;
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
//        companyRepository.saveAndFlush(company);

        Company newSaved = new Company();
        newSaved = companyRepository.saveAndFlush(company);

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

    @RequestMapping(value = "/private", method = RequestMethod.GET)
    public String getBackEnd(){
        return "you've made it to back end";
    }

    @RequestMapping(value = "/{companyId}/get-jobs", method = RequestMethod.GET)
    public List<Job> getCompanyJobs(@PathVariable UUID companyId){
        System.out.println("looking to get jobs for: " + companyId);

        return jobRepository.findJobsByCompany_Id(companyId);
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
        jobRepository.saveAndFlush(newJob);
        
        // send back the new job with company info and all other jobs
        JobWrapper wrappedJob = new JobWrapper(newJob, company.getId().toString());
        wrappedJob.setCompany(company);
        
        return wrappedJob;
    }

    @RequestMapping(value = "/getsinglecompany{id}")
    public Company getCompanyById(@PathVariable UUID id){
        return companyRepository.getOne(id);
    }
    
    @RequestMapping(value = "/getname/{id}", method = RequestMethod.GET)
    public String getCompanyName(@PathVariable UUID id) {
        Company comp = new Company();
        comp = companyRepository.getOne(id);
        return comp.getName();
    }
}

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
    public EmployeeWrapper create(@RequestPart CompanyWrapper companyWrapper, @RequestPart(value = "logoFile") Optional<MultipartFile> file){

        String logoUrl = "";

        //TODO need to check that there is a file being uploaded
        if(file.isPresent() ){
            logoUrl = this.amazonClient.uploadFile(file.get());
            logger.info(file.toString());
        }

        logger.info("the wrapper:" + companyWrapper.toString());

        // create company object from wrapper
        Company company = companyWrapper.getCompany();

        // update the logo for the company
        company.setLogoImg(logoUrl);

        // get reference to employee object from wrapper employeeId
        Employee employee = em.getReference(Employee.class, companyWrapper.getEmployeeId());

        // save and return company to get it's auto generated ID
        Company newlySavedCompany = companyRepository.saveAndFlush(company);

        // update the employee reference with the newly saved company
        employee.setCompany(newlySavedCompany);

        // save the updated employee object
        employeeRepository.saveAndFlush(employee);

        EmployeeWrapper updatedEmployee = new EmployeeWrapper(employee, newlySavedCompany.getId(), newlySavedCompany);

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
    public JobWrapper create(@RequestBody JobWrapper jobWrapper){
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

    public Company getCompanyById(UUID id){
        return companyRepository.getOne(id);
    }
}

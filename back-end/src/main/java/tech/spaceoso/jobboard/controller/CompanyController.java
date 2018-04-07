package tech.spaceoso.jobboard.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tech.spaceoso.jobboard.model.Company;
import tech.spaceoso.jobboard.model.CompanyWrapper;
import tech.spaceoso.jobboard.model.Employee;
import tech.spaceoso.jobboard.model.EmployeeWrapper;
import tech.spaceoso.jobboard.repository.CompanyRepository;
import tech.spaceoso.jobboard.repository.EmployeeRepository;
import tech.spaceoso.jobboard.security.JWTBuilder;
import tech.spaceoso.jobboard.service.AmazonClient;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(value = "/secured/company/")
public class CompanyController {

    @PersistenceContext
    private EntityManager em;

    final Logger logger = LoggerFactory.getLogger(CompanyController.class);

//    @Autowired
    private CompanyRepository companyRepository;

//    @Autowired
    private EmployeeRepository employeeRepository;
    private AmazonClient amazonClient;

    @Autowired
    CompanyController(CompanyRepository companyRepository, EmployeeRepository employeeRepository, AmazonClient amazonClient){
        this.companyRepository = companyRepository;
        this.employeeRepository = employeeRepository;
        this.amazonClient = amazonClient;
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

    public Company getCompanyById(UUID id){
        return companyRepository.getOne(id);
    }
}

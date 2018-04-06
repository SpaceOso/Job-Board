package tech.spaceoso.jobboard.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tech.spaceoso.jobboard.model.Company;
import tech.spaceoso.jobboard.model.CompanyWrapper;
import tech.spaceoso.jobboard.model.Employee;
import tech.spaceoso.jobboard.repository.CompanyRepository;
import tech.spaceoso.jobboard.repository.EmployeeRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.UUID;

@RestController
@RequestMapping(value = "/secured/company/")
public class CompanyController {

    @PersistenceContext
    private EntityManager em;

    final Logger logger = LoggerFactory.getLogger(CompanyController.class);

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public Company create(@RequestBody CompanyWrapper companyWrapper){

        // create company object from wrapper
        Company company = companyWrapper.getCompany();
        logger.info(companyWrapper.toString());

        // get reference to employee object from wrapper employeeId
        Employee employee = em.getReference(Employee.class, companyWrapper.getEmployeeId());

        // save and return company to get it's auto generated ID
        Company newlySavedCompany = companyRepository.saveAndFlush(company);

        // update the employee reference with the newly saved comany
        employee.setCompany(newlySavedCompany);

        // save the updated employee object
        employeeRepository.saveAndFlush(employee);

        return newlySavedCompany;
    }

    @RequestMapping(value = "/private", method = RequestMethod.GET)
    public String getBackEnd(){
        return "you've made it to back end";
    }

    public Company getCompanyById(UUID id){
        return companyRepository.getOne(id);
    }
}

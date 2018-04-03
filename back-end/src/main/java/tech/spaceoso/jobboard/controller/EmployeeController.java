package tech.spaceoso.jobboard.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import tech.spaceoso.jobboard.model.Company;
import tech.spaceoso.jobboard.model.Employee;
import tech.spaceoso.jobboard.model.EmployeeWrapper;
import tech.spaceoso.jobboard.repository.EmployeeRepository;


import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.security.Principal;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/employee/")
public class EmployeeController {

    @PersistenceContext
    private EntityManager em;

    final Logger logger = LoggerFactory.getLogger(JobController.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public EmployeeController(EmployeeRepository employeeRepository, BCryptPasswordEncoder bCryptPasswordEncoder){
        this.employeeRepository = employeeRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @RequestMapping(value = "create", method = RequestMethod.POST)
    public EmployeeWrapper create(@RequestBody EmployeeWrapper employeeWrapped) {
        logger.info("creating a new employee with:" + employeeWrapped.toString());

        // get employee reference
        Employee employee = employeeWrapped.getEmployee();
        // get company reference
//        Company company = em.getReference(Company.class, employeeWrapped.getCompanyId());

        // TODO make sure that it comes encrypted already from the front end
        // encrypt password
        employee.setPassword(bCryptPasswordEncoder.encode(employee.getPassword()));
        // set company
//        employee.setCompany(company);
        // save employee with company
        employeeRepository.saveAndFlush(employee);

        // send back a fully populated EmployeeWrapper
        EmployeeWrapper savedWrappedEmployee = new EmployeeWrapper(employee);
//        EmployeeWrapper savedWrappedEmployee = new EmployeeWrapper(employee, company.getId());
//        savedWrappedEmployee.setCompany(company);

        return savedWrappedEmployee;
    }

    @RequestMapping(value = "/getuser", method = RequestMethod.GET)
    public ModelMap backEnd(Principal principal, ModelMap model){
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        UserDetailsServiceImpl userDetails = (UserDetailsServiceImpl)auth.getPrincipal();
        model.addAttribute("message", "Something");
        return model;
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Employee getById(@PathVariable UUID id) {
        return employeeRepository.getOne(id);
    }
}

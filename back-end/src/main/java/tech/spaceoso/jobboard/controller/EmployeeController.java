package tech.spaceoso.jobboard.controller;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
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
import java.util.Date;
import java.util.UUID;

import static tech.spaceoso.jobboard.security.SecurityConstants.EXPIRATION_TIME;
import static tech.spaceoso.jobboard.security.SecurityConstants.SECRET;

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

        // TODO make sure that it comes encrypted already from the front end
        // encrypt password
        employee.setPassword(bCryptPasswordEncoder.encode(employee.getPassword()));

        // save employee
        employeeRepository.saveAndFlush(employee);

        // send back a fully populated EmployeeWrapper
        EmployeeWrapper savedWrappedEmployee = new EmployeeWrapper(employee);

        String token = Jwts.builder()
                .setSubject(employee.getEmail())
                .claim("firstName", employee.getFirstName())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET.getBytes())
                .compact();

        savedWrappedEmployee.setToken(token);
        /*
            TODO we need to create a token at this step, one way to do it is to do it manually by using the JWT buildier
        */



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

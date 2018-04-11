package tech.spaceoso.jobboard.controller;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.postgresql.util.PSQLException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import tech.spaceoso.jobboard.exception.ResourceNotFoundException;
import tech.spaceoso.jobboard.model.Company;
import tech.spaceoso.jobboard.model.Employee;
import tech.spaceoso.jobboard.model.EmployeeWrapper;
import tech.spaceoso.jobboard.repository.EmployeeRepository;
import tech.spaceoso.jobboard.security.JWTBuilder;


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
    public ResponseEntity<Object> create(@RequestBody EmployeeWrapper employeeWrapped) throws ResourceNotFoundException{
        logger.info("creating a new employee with:" + employeeWrapped.toString());

        // get employee reference
        Employee employee = employeeWrapped.getEmployee();

        // TODO make sure that it comes encrypted already from the front end
        // encrypt password
        employee.setPassword(bCryptPasswordEncoder.encode(employee.getPassword()));

        // save employee
        try{
            employeeRepository.saveAndFlush(employee);
//            System.out.println("the status of the employeetest: " + employeetest);
//            if(employeetest == null){
//                throw new ResourceNotFoundException("Sorry we already have a user with that email address");
//            }
        } catch (DataAccessException e1){
            e1.printStackTrace();
            System.out.println("ERROR SAVING NEW USER");
            throw new ResourceNotFoundException("Sorry yo, please use a new email address");
        }

        // send back a fully populated EmployeeWrapper
        EmployeeWrapper savedWrappedEmployee = new EmployeeWrapper(employee);

        String token = JWTBuilder.buildToken(employee.getEmail(), employee);

        savedWrappedEmployee.setToken(token);

        return new ResponseEntity<>(savedWrappedEmployee, HttpStatus.OK);
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

package tech.spaceoso.jobboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import tech.spaceoso.jobboard.model.Employee;
import tech.spaceoso.jobboard.repository.EmployeeRepository;
import tech.spaceoso.jobboard.repository.EmployerRepository;

import java.util.UUID;

@RestController
@RequestMapping("/employee/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public EmployeeController(EmployeeRepository employeeRepository, BCryptPasswordEncoder bCryptPasswordEncoder){
        this.employeeRepository = employeeRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @RequestMapping(value = "create", method = RequestMethod.POST)
    public Employee create(@RequestBody Employee employee) {
        employee.setPassword(bCryptPasswordEncoder.encode(employee.getPassword()));

        return employeeRepository.saveAndFlush(employee);
    }

    @PostMapping("/backend")
    public String backEnd(){
        return "You've made it to the backend";
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Employee getById(@PathVariable UUID id) {
        return employeeRepository.getOne(id);
    }
}

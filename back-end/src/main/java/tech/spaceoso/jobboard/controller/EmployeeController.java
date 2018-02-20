package tech.spaceoso.jobboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tech.spaceoso.jobboard.model.Employee;
import tech.spaceoso.jobboard.repository.EmployeeRepository;

@RestController
@RequestMapping("/employee/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @RequestMapping(value = "create", method = RequestMethod.POST)
    public Employee create(@RequestBody Employee employee) {

        return employeeRepository.saveAndFlush(employee);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Employee getById(@PathVariable Long id) {
        return EmployeeStub.getEmployeeById(id);
    }
}

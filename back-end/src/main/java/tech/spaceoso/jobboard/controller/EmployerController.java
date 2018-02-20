package tech.spaceoso.jobboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tech.spaceoso.jobboard.model.Employer;
import tech.spaceoso.jobboard.repository.EmployerRepository;

import java.util.UUID;

@RestController
@RequestMapping(value = "/secured/employer/")
public class EmployerController {
    @Autowired
    EmployerRepository employerRepository;

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public Employer create(@RequestBody Employer employer){
        return employerRepository.saveAndFlush(employer);
    }

    public Employer getEmployerById(UUID id){
        return employerRepository.findOne(id);
    }
}

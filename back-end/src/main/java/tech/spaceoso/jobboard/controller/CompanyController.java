package tech.spaceoso.jobboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tech.spaceoso.jobboard.model.Company;
import tech.spaceoso.jobboard.repository.CompanyRepository;

import java.util.UUID;

@RestController
@RequestMapping(value = "/secured/company/")
public class CompanyController {
    @Autowired
    CompanyRepository companyRepository;

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public Company create(@RequestBody Company company){
        return companyRepository.saveAndFlush(company);
    }

    @RequestMapping(value = "/private", method = RequestMethod.GET)
    public String getBackEnd(){
        return "you've made it to back end";
    }

    public Company getCompanyById(UUID id){
        return companyRepository.getOne(id);
    }
}

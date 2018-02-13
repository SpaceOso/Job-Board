package tech.spaceoso.jobboard.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tech.spaceoso.jobboard.model.Job;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class JobController {
    @CrossOrigin
    @RequestMapping(value = "jobposts", method = RequestMethod.GET)
    public List<Job> list() {
        return JobsStub.list();
    }
}

package tech.spaceoso.jobboard.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;
import tech.spaceoso.jobboard.model.Job;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/")
public class JobController {
    @RequestMapping(value = "jobposts", method = RequestMethod.GET)
    public List<Job> list() {
        return JobsStub.list();
    }

    @RequestMapping(value = "jobposts/{id}", method = RequestMethod.GET)
    public Job getJobById(@PathVariable Long id){

        return JobsStub.getJobById(id);
    }
}

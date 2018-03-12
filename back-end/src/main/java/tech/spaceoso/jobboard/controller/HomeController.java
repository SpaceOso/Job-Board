package tech.spaceoso.jobboard.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {


    /**
     * adding this request mapping overrides the default load of index.html
     * leaving it off loads the react application automatically
     */
    @RequestMapping("/")
    public String loadHome(){
        return "Welcome to the job board api!";
    }

//    @RequestMapping(value = "/login", method = RequestMethod.POST)
//    public String login(){
//        return "you're no logged in";
//    }
}

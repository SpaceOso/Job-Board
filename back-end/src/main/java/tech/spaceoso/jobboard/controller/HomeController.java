package tech.spaceoso.jobboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.spaceoso.jobboard.repository.UserRepository;

@RestController
public class HomeController {

    @Autowired
    private UserRepository userRepository;

    /**
     * adding this request mapping overrides the default load of index.html
     * leaving it off loads the react application automatically
     */
    @RequestMapping("/")
    public String loadHome(){
        return "yo you fsd";
    }
}

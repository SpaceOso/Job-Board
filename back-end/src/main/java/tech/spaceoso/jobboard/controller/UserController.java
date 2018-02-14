package tech.spaceoso.jobboard.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tech.spaceoso.jobboard.model.User;

@RestController
@RequestMapping("/users/")
public class UserController {

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public User getById(@PathVariable Long id){
        return UserStub.getUserById(id);
    }
}

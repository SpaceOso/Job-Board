package tech.spaceoso.jobboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tech.spaceoso.jobboard.model.User;
import tech.spaceoso.jobboard.repository.UserRepository;

@RestController
@RequestMapping("/users/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "create", method = RequestMethod.POST)
    public User create(@RequestBody User user) {

        return userRepository.saveAndFlush(user);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public User getById(@PathVariable Long id){
        return UserStub.getUserById(id);
    }
}

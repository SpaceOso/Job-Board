package tech.spaceoso.jobboard.controller;

import tech.spaceoso.jobboard.model.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class UserStub {
    private static Map<Long, User> Users = new HashMap<Long, User>();

    static{
        User usera = new User(1L, "Miguel", "Rico", "miguelrico3d@gmail.com", "abc123");
        Users.put(1L, usera);
        User userb = new User(2L, "Ashley", "Rico", "ashleyrico@gmail.com", "123abc");
        Users.put(2L, userb);
        User userc = new User(3L, "Ronnie", "Rico", "jerkface@gmail.com", "666abc");
        Users.put(3L, userc);
    }

    public static User getUserById(Long id){
        return Users.get(id);
    }

}

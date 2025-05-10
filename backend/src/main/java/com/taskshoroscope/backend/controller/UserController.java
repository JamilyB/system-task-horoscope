package com.taskshoroscope.backend.controller;

import com.taskshoroscope.backend.entity.User;
import com.taskshoroscope.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    public User cadastrarUser(@RequestBody User user){
        return userService.create(user);
    }

}

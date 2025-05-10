package com.taskshoroscope.backend.service;

import com.taskshoroscope.backend.entity.User;
import com.taskshoroscope.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User create(User user) {
        return userRepository.save(user);
    }

}

package com.taskshoroscope.backend.repository;

import com.taskshoroscope.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}

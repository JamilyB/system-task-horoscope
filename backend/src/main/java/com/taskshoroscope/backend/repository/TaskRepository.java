package com.taskshoroscope.backend.repository;

import com.taskshoroscope.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

}

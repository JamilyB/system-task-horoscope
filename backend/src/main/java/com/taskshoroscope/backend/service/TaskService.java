package com.taskshoroscope.backend.service;

import com.taskshoroscope.backend.entity.Task;
import com.taskshoroscope.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task create(Task task) {
        return taskRepository.save(task);
    }
}

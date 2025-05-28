package com.taskshoroscope.backend.controller;

import com.taskshoroscope.backend.entity.Task;
import com.taskshoroscope.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public Task adicionarTask(@RequestBody Task task){
        return taskService.create(task);
    }
}
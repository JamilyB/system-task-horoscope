package com.taskshoroscope.backend.controller;
import com.taskshoroscope.backend.entity.Task;
import com.taskshoroscope.backend.entity.User;
import com.taskshoroscope.backend.repository.TaskRepository;
import com.taskshoroscope.backend.repository.UserRepository;
import com.taskshoroscope.backend.service.TaskService;


import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/task")
public class TaskController {

    private final TaskService taskService;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    public TaskController(TaskService taskService, UserRepository userRepository, TaskRepository taskrepository) {
        this.taskService = taskService;
        this.userRepository = userRepository;
        this.taskRepository = taskrepository;
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        try {
            Task existingTask = taskRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));

            String descricao = (String) payload.get("descricao");
            String dataTaskStr = (String) payload.get("data_task");
            String timeTaskStr = (String) payload.get("time_task");
            Number userIdNumber = (Number) payload.get("user_id");

            if (userIdNumber == null) {
                return ResponseEntity.badRequest().body("user_id é obrigatório");
            }

            Long userId = userIdNumber.longValue();

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            existingTask.setDescricao(descricao);
            existingTask.setData_task(LocalDate.parse(dataTaskStr));
            existingTask.setTime_task(LocalTime.parse(timeTaskStr));
            existingTask.setUser(user);

            Task updatedTask = taskService.update(existingTask);

            Map<String, Object> response = new HashMap<>();
            response.put("id", updatedTask.getId());
            response.put("descricao", updatedTask.getDescricao());
            response.put("data_task", updatedTask.getData_task().toString());
            response.put("time_task", updatedTask.getTime_task().toString());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao atualizar tarefa: " + e.getMessage());
        }
    }

    @GetMapping
    public List<Map<String, Object>> getTasksByUserId(@RequestParam Long userId) {
        System.out.println("Buscando tasks do userId: " + userId);
        List<Task> tasks = taskRepository.findByUserId(userId);

        return tasks.stream().map(task -> {
            Map<String, Object> t = new HashMap<>();
            t.put("id", task.getId());
            t.put("descricao", task.getDescricao());
            t.put("data_task", task.getData_task().toString());
            t.put("time_task", task.getTime_task().toString());
            return t;
        }).collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<?> saveTask(@RequestBody Map<String, Object> payload) {
        try {
            String descricao = (String) payload.get("descricao");
            String dataTaskStr = (String) payload.get("data_task");
            String timeTaskStr = (String) payload.get("time_task");
            Number userIdNumber = (Number) payload.get("user_id");

            if (userIdNumber == null) {
                return ResponseEntity.badRequest().body("user_id é obrigatório");
            }

            Long userId = userIdNumber.longValue();

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            Task task = new Task();
            task.setDescricao(descricao);
            task.setData_task(LocalDate.parse(dataTaskStr));
            task.setTime_task(LocalTime.parse(timeTaskStr));
            task.setUser(user);

            Task savedTask = taskService.create(task);

            // Cria um Map com os dados que você quer retornar
            Map<String, Object> response = new HashMap<>();
            response.put("id", savedTask.getId());
            response.put("descricao", savedTask.getDescricao());
            response.put("data_task", savedTask.getData_task().toString());
            response.put("time_task", savedTask.getTime_task().toString());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao salvar tarefa: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        try {
            taskService.delete(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Task não encontrada");
        }
    }
}

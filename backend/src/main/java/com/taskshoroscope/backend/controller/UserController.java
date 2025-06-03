package com.taskshoroscope.backend.controller;

import com.taskshoroscope.backend.dto.LoginDTO;
import com.taskshoroscope.backend.dto.RegisterDTO;
import com.taskshoroscope.backend.dto.UserProfileDTO;
import com.taskshoroscope.backend.entity.User;
import com.taskshoroscope.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterDTO dto) {
        System.out.println("➡️ [Controller] Recebida requisição de registro: " + dto);
        User user = userService.register(dto);
        System.out.println("✅ [Controller] Usuário registrado: " + user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto) {
        User user = userService.authenticate(dto);
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Credenciais inválidas"));
        }
        Map<String, Object> response = new HashMap<>();
        response.put("userId", user.getId());
        response.put("message", "Login realizado com sucesso! Bem-vindo, " + user.getNome());
        return ResponseEntity.ok(response);
    }


    @GetMapping("/profile")
    public ResponseEntity<UserProfileDTO> getProfile(@RequestParam Long userId) {
        UserProfileDTO profile = userService.getUserProfile(userId);
        return ResponseEntity.ok(profile);
    }
}

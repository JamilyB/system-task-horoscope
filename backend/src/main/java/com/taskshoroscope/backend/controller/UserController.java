package com.taskshoroscope.backend.controller;

import com.taskshoroscope.backend.dto.LoginDTO;
import com.taskshoroscope.backend.dto.RegisterDTO;
import com.taskshoroscope.backend.entity.User;
import com.taskshoroscope.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<String> login(@RequestBody LoginDTO dto) {
        System.out.println("➡️ [Controller] Recebida requisição de login: " + dto);
        User user = userService.authenticate(dto);
        System.out.println("✅ [Controller] Usuário autenticado: " + user.getNome());
        return ResponseEntity.ok("Login realizado com sucesso! Bem-vindo, " + user.getNome());
    }
}

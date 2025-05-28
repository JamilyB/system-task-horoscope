package com.taskshoroscope.backend.service;

import com.taskshoroscope.backend.dto.LoginDTO;
import com.taskshoroscope.backend.dto.RegisterDTO;
import com.taskshoroscope.backend.entity.User;
import com.taskshoroscope.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User create(User user) {
        return userRepository.save(user);
    }

    public User register(RegisterDTO dto) {

        if (!dto.getSenha().equals(dto.getConfirmarSenha())) {
            throw new IllegalArgumentException("Senhas não coincidem!");
        }

        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado!");
        }

        User user = new User();
        user.setNome(dto.getNome());
        user.setEmail(dto.getEmail());
        user.setSenha(passwordEncoder.encode(dto.getSenha()));
        user.setDt_nasc(dto.getBirthdate());

        return userRepository.save(user);
    }

    public User authenticate(LoginDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado!"));

        if (!passwordEncoder.matches(dto.getSenha(), user.getSenha())) {
            throw new IllegalArgumentException("Senha incorreta!");
        }

        return user;
    }

}

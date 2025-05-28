package com.taskshoroscope.backend.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Desativa CSRF
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/**").permitAll()  // Libera todas as rotas e métodos
                )
                .securityMatcher("/**") // opcional, mas bom deixar claro o escopo
                .httpBasic(httpBasic -> {}) // Pode deixar vazio pra permitir basic auth, ou remover se não precisar
                .formLogin(form -> form.disable()) // Desativa o formulário de login sem deprecated
                .logout(logout -> logout.disable()); // Desativa logout

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

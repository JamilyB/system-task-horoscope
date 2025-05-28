package com.taskshoroscope.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private LocalDate dt_nasc;

    @ManyToOne
    @JoinColumn(name = "horoscope_id")
    private Horoscope horoscope;

    @OneToMany(mappedBy = "user")
    private List<Task> tasks;
    private String email;

    @JsonIgnore
    private String senha;

    // Construtor vazio
    public User() {}

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public LocalDate getDt_nasc() { return dt_nasc; }
    public void setDt_nasc(LocalDate bd_nasc) { this.dt_nasc = bd_nasc; }

    public Horoscope getHoroscope() { return horoscope; }
    public void setHoroscope(Horoscope horoscope) { this.horoscope = horoscope; }

    public List<Task> getTasks() { return tasks; }
    public void setTasks(List<Task> tasks) { this.tasks = tasks; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}

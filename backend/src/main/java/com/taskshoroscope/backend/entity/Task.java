package com.taskshoroscope.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;


@Entity
@Table(name= "task")
@AllArgsConstructor //Construtor AllArgs
@NoArgsConstructor //Construtor NoArgs
@Data //getters e setters
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dataTask;

    private LocalTime timeTask;

    private String descricao;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}

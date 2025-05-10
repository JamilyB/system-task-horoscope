package com.taskshoroscope.backend.entity;

import jakarta.persistence.Entity;

import java.util.List;


@Entity
public class User {

    private Long id;

    private String nome;

    //private LocalDate dataNascimento;

    private Horoscope horoscope;

    private List<Task> tasks;

}

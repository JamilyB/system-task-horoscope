package com.taskshoroscope.backend.entity;

import jakarta.persistence.Entity;

@Entity
public class Horoscope {

    private Long id;

    private String signo;

    private String icone;

    private String imagem;

}

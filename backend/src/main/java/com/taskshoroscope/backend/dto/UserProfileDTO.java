package com.taskshoroscope.backend.dto;

public class UserProfileDTO {
    private String nome;
    private String email;
    private String signo;

    public UserProfileDTO(String nome, String email, String signo) {
        this.nome = nome;
        this.email = email;
        this.signo = signo;
    }

    public UserProfileDTO(){
    }
    // getters e setters
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSigno() { return signo; }
    public void setSigno(String signo) { this.signo = signo; }
}


package com.example.server_java_form_mvc.dto;

public class UsuarioDTO {
    private String name;
    private String email;
    private String password;

    // Construtores, getters e setters
    public UsuarioDTO() {
    }

    public UsuarioDTO(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

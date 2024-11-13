Passo 1: Criar o Modelo Usuario

Crie o arquivo Usuario.java em src/main/java/com/exemplo/model/:

package com.example.server_java_form_mvc.model;

public class Usuario {
private String nome;
private String email;
private String senha;

    public Usuario() {
    }

    public Usuario(String nome, String email, String senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

}

Passo 4: Criar o Controlador UsuarioController

Crie o arquivo UsuarioController.java em src/main/java/com/exemplo/controller/:

package com.example.server_java_form_mvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.server_java_form_mvc.model.Usuario;

@Controller
@RequestMapping("/usuario")
public class UsuarioController {

    @GetMapping
    public String mostrarFormulario(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "usuario";
    }

    @PostMapping
    public String criarUsuario(@RequestParam String nome,
            @RequestParam String email,
            @RequestParam String senha,
            Model model) {
        Usuario usuario = new Usuario(nome, email, senha);
        model.addAttribute("usuario", usuario);
        return "usuario";
    }

}

Passo 5: Criar a Visão usuario.html

Crie o arquivo usuario.html em src/main/resources/templates/:

<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Usuário</title>
</head>
<body>
    <h1>Formulário de Usuário</h1>
    <form action="#" th:action="@{/usuario}" method="post">
        <label>Nome:</label>
        <input type="text" name="nome" required /><br/>
        <label>Email:</label>
        <input type="email" name="email" required /><br/>
        <label>Senha:</label>
        <input type="password" name="senha" required /><br/>
        <button type="submit">Criar Usuário</button>
    </form>

    <div th:if="${usuario != null}">
        <h2>Usuário Criado</h2>
        <p><strong>Nome:</strong> <span th:text="${usuario.nome}"></span></p>
        <p><strong>Email:</strong> <span th:text="${usuario.email}"></span></p>
        <p><strong>Senha:</strong> <span th:text="${usuario.senha}"></span></p>
    </div>

</body>
</html>

Passo 6: Executar o Projeto

Compile o projeto:
mvn clean install

Execute o aplicativo:
mvn spring-boot:run

Acesse a aplicação no navegador em http://localhost:8080/usuario.

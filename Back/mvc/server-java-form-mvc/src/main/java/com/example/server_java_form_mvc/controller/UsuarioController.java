package com.example.server_java_form_mvc.controller;

import com.example.server_java_form_mvc.dto.UsuarioDTO;
import com.example.server_java_form_mvc.model.Usuario;
import com.example.server_java_form_mvc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin(origins = "http://127.0.0.1:5500") // Permite CORS para o
// frontend específico
// @CrossOrigin(origins = "http://localhost:3000") // Permite CORS para o
// frontend específico
// @CrossOrigin(origins = "*") // Permite CORS para qualquer origem
@RequestMapping("/api") // Adiciona um prefixo a todas as rotas
public class UsuarioController {

    @Autowired
    private UserService userService; // Injetando UserService

    @GetMapping("/usuario") // Agora a rota é /api/usuario
    public String mostrarFormulario(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "usuario"; // Nome do arquivo de template .html em src/main/resources/templates
    }

    @PostMapping("/criarUsuario")
    public ResponseEntity<?> criarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        System.out.println("Recebido DTO: " + usuarioDTO);
        // Chamando o serviço para criar o usuário e armazenando o resultado em 'output'
        Usuario output = userService.criarUsuario(usuarioDTO);
        System.out.println("Usuário criado: " + output);
        return ResponseEntity.ok(output); // Retorna o usuário criado como resposta JSON
    }
}

package com.example.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500") // Permitir requisições dessa origem específica
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello World!";
    }

    @PostMapping("/criar-usuario")
    public ResponseEntity<?> criarUsuario(@RequestBody User user) {
        try {
            // Validação básica (opcional)
            if (user.getName() == null || user.getEmail() == null || user.getPassword() == null) {
                return ResponseEntity.badRequest().body("Todos os campos são obrigatórios.");
            }

            // Salvando o usuário no banco de dados
            userRepository.save(user);

            // Retornar sucesso com o objeto JSON do usuário criado
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            // Retornar erro em caso de exceção
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar usuário.");
        }
    }
    // public String criarUsuario(@RequestParam String name, @RequestParam String
    // email, @RequestParam String password) {

    // User user = new User(name, email, password);
    // System.out.println(user);
    // userRepository.save(user);
    // return "Usuário criado com sucesso!";
    // }
}

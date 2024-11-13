package com.example.server_java_form_mvc.service;

import com.example.server_java_form_mvc.database.Db;
import com.example.server_java_form_mvc.dto.UsuarioDTO;
import com.example.server_java_form_mvc.model.Usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private Db db;

    // Alterado para retornar o usuário criado
    // Método ajustado para simular persistência e exibir logs
    public Usuario criarUsuario(UsuarioDTO usuarioDTO) {
        // Exibe os dados do usuário no console
        System.out.println("UserService: Criando novo usuário");
        System.out.println(usuarioDTO);

        // Cria uma nova instância de Usuario com os dados do DTO
        Usuario usuario = new Usuario(usuarioDTO.getName(), usuarioDTO.getEmail(), usuarioDTO.getPassword());
        System.out.println(usuario.toString());
        // Simula a persistência de usuários e obtém o novo tamanho da lista
        int totalUsuarios = db.adicionarUsuario(usuario);
        System.out.println("Número de usuários após adição: " + totalUsuarios);

        // Exibe o estado atual do banco de dados
        System.out.println("Usuário salvo com sucesso!");
        System.out.println("Estado atual do banco de dados: " + db.getUsuarios());

        return usuario; // Retorna o usuário adicionado
    }

    public List<Usuario> listarUsuarios() {
        return db.getUsuarios(); // Retorna a lista de usuários
    }
}

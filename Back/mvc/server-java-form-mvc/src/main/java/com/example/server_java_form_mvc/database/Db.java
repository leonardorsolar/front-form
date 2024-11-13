package com.example.server_java_form_mvc.database;

import com.example.server_java_form_mvc.model.Usuario;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class Db {
    private List<Usuario> usuarios = new ArrayList<>();

    public int adicionarUsuario(Usuario usuario) {
        usuarios.add(usuario); // Adiciona o usuário na lista
        return usuarios.size(); // Retorna o tamanho da lista após a adição
    }

    public List<Usuario> getUsuarios() {
        return usuarios;
    }
}

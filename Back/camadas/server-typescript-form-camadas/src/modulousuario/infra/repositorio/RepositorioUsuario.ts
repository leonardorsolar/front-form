import { db } from '../../../compartilhamento/bancodados/db';
import { Usuario } from '../../domain/modelos/Usuario';

export class RepositorioUsuario {
  public salvar(usuario: Usuario): Usuario {
    db.usuarios.push(usuario); // Persistência simulada
    return usuario;
  }

  public buscarPorEmail(email: string): Usuario | undefined {
    return db.usuarios.find((usuario) => usuario.getEmail() === email);
  }

  public listarTodos(): Usuario[] {
    return db.usuarios;
  }
}

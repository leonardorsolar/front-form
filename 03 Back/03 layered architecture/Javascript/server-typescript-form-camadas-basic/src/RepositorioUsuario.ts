import { db } from './database';
import { Usuario } from './Usuario';

export class RepositorioUsuario {
  // Método para salvar um usuário no banco de dados
  public async salvar(usuario: Usuario): Promise<number> {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [usuario.getNome(), usuario.getEmail(), usuario.getSenha()], function (err: any) {
        if (err) {
          reject(err);
        } else {
          // Aqui o `this` é o contexto do callback de db.run, que contém a propriedade `lastID`
          console.log('RepositorioUsuario');
          console.log(this.lastID);
          resolve(this.lastID); // `this` se refere ao Statement do SQLite
        }
      });
    });
  }

  // Método para buscar um usuário pelo ID
  public async buscarPorId(id: number): Promise<Usuario | null> {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id = ?', [id], (err: any, row: any) => {
        if (err) {
          reject(err);
        } else if (row) {
          const usuario = new Usuario(row.name, row.email, row.password);
          resolve(usuario);
        } else {
          resolve(null);
        }
      });
    });
  }
}

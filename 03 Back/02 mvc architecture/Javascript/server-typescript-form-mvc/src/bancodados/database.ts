import sqlite3 from 'sqlite3';

// Abre uma conexão com o banco de dados SQLite (cria um novo banco de dados se não existir)
const db = new sqlite3.Database('database.db');

// Cria a tabela de usuários se ela não existir
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
)`);

// Função para salvar um usuário no banco de dados
export function saveUserToDatabase(name: string, email: string, password: string): Promise<number> {
  return new Promise((resolve, reject) => {
    console.log('saveUserToDatabase');
    console.log(name, email, password);

    db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID); // Acessa o ID do último registro inserido
      }
    });
  });
}

// Função para encontrar um usuário pelo ID
export function findUserById(id: string): Promise<any | null> {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row || null); // Retorna o usuário encontrado ou null se não houver correspondência
      }
    });
  });
}

// Função para atualizar um usuário no banco de dados
export function updateUserInDatabase(id: string, dadosAtualizados: any): Promise<any | null> {
  return new Promise((resolve, reject) => {
    const { name, email, password } = dadosAtualizados;

    db.run('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id], function (err) {
      if (err) {
        reject(err);
      } else if (this.changes === 0) {
        resolve(null); // Se nenhuma linha foi alterada, o usuário não existe
      } else {
        resolve({ id, name, email, password }); // Retorna os dados atualizados
      }
    });
  });
}

// Função para remover um usuário do banco de dados
export function deleteUserFromDatabase(id: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes > 0); // Retorna true se um usuário foi removido, ou false se não
      }
    });
  });
}

// Criação da tabela de logins (caso não exista)
db.run(`CREATE TABLE IF NOT EXISTS logins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    token TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(usuario_id) REFERENCES users(id)
)`);

// Função para salvar um token de login no banco de dados
export function saveLoginToken(usuarioId: number, token: string): Promise<number> {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO logins (usuario_id, token) VALUES (?, ?)', [usuarioId, token], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID); // Retorna o ID do token de login inserido
      }
    });
  });
}

// Função para buscar um login pelo token
export function findLoginByToken(token: string): Promise<any | null> {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM logins WHERE token = ?', [token], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row || null); // Retorna o login correspondente ao token, ou null se não houver correspondência
      }
    });
  });
}

// Função para deletar um token de login (logout)
export function deleteLoginToken(token: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM logins WHERE token = ?', [token], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes > 0); // Retorna true se o token foi removido, ou false se não
      }
    });
  });
}

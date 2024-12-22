// import { db } from './database';

// export class LoginService {
//   // Autentica o usuário e retorna um token se as credenciais forem válidas
//   public async autenticar(email: string, password: string): Promise<string | null> {
//     return new Promise((resolve, reject) => {
//       db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
//         if (err) {
//           reject(new Error('Erro ao acessar o banco de dados'));
//         } else if (row) {
//           // Gera um token simples (para produção, use JWT ou outra solução segura)
//           const token = `token-${row.id}-${Date.now()}`;

//           // Insere o token de login no banco de dados
//           db.run('INSERT INTO logins (usuario_id, token) VALUES (?, ?)', [row.id, token], (insertErr) => {
//             if (insertErr) {
//               reject(new Error('Erro ao salvar o token de login'));
//             } else {
//               resolve(token); // Retorna o token gerado
//             }
//           });
//         } else {
//           resolve(null); // Retorna null se o usuário não for encontrado
//         }
//       });
//     });
//   }

//   // Valida se um token existe e é válido
//   public async validarToken(token: string): Promise<boolean> {
//     return new Promise((resolve, reject) => {
//       db.get('SELECT * FROM logins WHERE token = ?', [token], (err, row) => {
//         if (err) {
//           reject(new Error('Erro ao acessar o banco de dados para validação do token'));
//         } else {
//           resolve(!!row); // Retorna true se o token for encontrado, false caso contrário
//         }
//       });
//     });
//   }

//   // Remove o token de login, efetivamente fazendo logout do usuário
//   public async logout(token: string): Promise<boolean> {
//     return new Promise((resolve, reject) => {
//       db.run('DELETE FROM logins WHERE token = ?', [token], function (err) {
//         if (err) {
//           reject(new Error('Erro ao remover o token de login'));
//         } else {
//           resolve(this.changes > 0); // Retorna true se o token foi removido
//         }
//       });
//     });
//   }
// }

import { Usuario } from '../modelos/Usuario';
import { db } from '../bancodados/db';
import { saveUserToDatabase } from '../bancodados/database';

export class ServicoUsuario {
  private usuarios: Usuario[] = [];

  constructor() {}

  async criarUsuario(dado: any): Promise<any> {
    console.log('ServicoUsuario');
    console.log(dado);
    const usuario = new Usuario(dado.name, dado.email, dado.password);
    //this.usuarios.push(usuario); // Simula a persistência de usuários
    //const dadosBanco = db.usuarios.push(usuario); // Simula a persistência de usuários
    //console.log(dadosBanco);
    // Salva o usuário no banco de dados
    try {
      const userId = await saveUserToDatabase(dado.name, dado.email, dado.password);
      console.log(`Usuário criado com ID: ${userId}`);
      return { ...usuario, id: userId };
    } catch (error) {
      console.error('Erro ao salvar usuário no banco de dados', error);
      throw new Error('Erro ao criar usuário');
    }
    //return usuario;
  }

  //    listarUsuarios(): Usuario[] {
  //     return db.usuarios;
  //   }
}

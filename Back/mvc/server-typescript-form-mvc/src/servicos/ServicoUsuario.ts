import { Usuario } from '../modelos/Usuario';
import { db } from '../bancodados/db';
import { saveUserToDatabase, findUserById, updateUserInDatabase, deleteUserFromDatabase } from '../bancodados/database';

export class ServicoUsuario {
  private usuarios: Usuario[] = [];

  constructor() {}

  // Função para criar um novo usuário
  async criarUsuario(dado: any): Promise<any> {
    console.log('ServicoUsuario');
    console.log(dado);
    const usuario = new Usuario(dado.name, dado.email, dado.password);

    try {
      const userId = await saveUserToDatabase(dado.name, dado.email, dado.password);
      console.log(`Usuário criado com ID: ${userId}`);
      return { ...usuario, id: userId };
    } catch (error) {
      console.error('Erro ao salvar usuário no banco de dados', error);
      throw new Error('Erro ao criar usuário');
    }
  }

  // Função para obter um usuário pelo ID
  async obterUsuario(id: string): Promise<Usuario | null> {
    try {
      const usuario = await findUserById(id);
      if (!usuario) {
        console.log(`Usuário com ID ${id} não encontrado`);
        return null;
      }
      return usuario;
    } catch (error) {
      console.error('Erro ao obter usuário do banco de dados', error);
      throw new Error('Erro ao obter usuário');
    }
  }

  // Função para atualizar um usuário pelo ID
  async atualizarUsuario(id: string, dadosAtualizados: any): Promise<Usuario | null> {
    try {
      const usuarioAtualizado = await updateUserInDatabase(id, dadosAtualizados);
      if (!usuarioAtualizado) {
        console.log(`Usuário com ID ${id} não encontrado para atualização`);
        return null;
      }
      return usuarioAtualizado;
    } catch (error) {
      console.error('Erro ao atualizar usuário no banco de dados', error);
      throw new Error('Erro ao atualizar usuário');
    }
  }

  // Função para remover um usuário pelo ID
  async removerUsuario(id: string): Promise<boolean> {
    try {
      const usuarioRemovido = await deleteUserFromDatabase(id);
      if (!usuarioRemovido) {
        console.log(`Usuário com ID ${id} não encontrado para remoção`);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Erro ao remover usuário do banco de dados', error);
      throw new Error('Erro ao remover usuário');
    }
  }
}

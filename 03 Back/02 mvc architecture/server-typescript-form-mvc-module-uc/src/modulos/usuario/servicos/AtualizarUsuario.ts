import { saveUserToDatabase, findUserById, updateUserInDatabase, deleteUserFromDatabase } from '../../../compartilhamento/bancodados/database';
import { Usuario } from '../modelos/Usuario';

export class AtualizarUsuario {
  // Método para atualizar um usuário pelo ID
  async execute(id: string, dadosAtualizados: any): Promise<Usuario | null> {
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
}

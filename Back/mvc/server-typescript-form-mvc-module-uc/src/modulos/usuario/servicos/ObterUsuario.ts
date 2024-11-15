import { saveUserToDatabase, findUserById, updateUserInDatabase, deleteUserFromDatabase } from '../../../compartilhamento/bancodados/database';
import { Usuario } from '../modelos/Usuario';

export class ObterUsuario {
  // Método para obter um usuário pelo ID
  async execute(id: string): Promise<Usuario | null> {
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
}

import { saveUserToDatabase, findUserById, updateUserInDatabase, deleteUserFromDatabase } from '../../../compartilhamento/bancodados/database';
import { Usuario } from '../modelos/Usuario';

export class RemoverUsuario {
  // Método para remover um usuário pelo ID
  async execute(id: string): Promise<boolean> {
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

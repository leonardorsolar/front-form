import { saveUserToDatabase, findUserById, updateUserInDatabase, deleteUserFromDatabase } from '../../../compartilhamento/bancodados/database';
import { Usuario } from '../modelos/Usuario';

export class CriarUsuario {
  // Método para criar um novo usuário
  async execute(dado: any): Promise<any> {
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
}

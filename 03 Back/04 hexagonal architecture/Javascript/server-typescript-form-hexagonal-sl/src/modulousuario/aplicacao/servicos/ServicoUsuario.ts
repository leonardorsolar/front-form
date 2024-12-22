import { Usuario } from '../../domain/entity/Usuario';
import { RepositorioUsuario } from '../../infra/repositorio/RepositorioUsuario';
import { IServicoUsuario } from '../porta/entrada/IServicoUsuario';
import { IRepositorioUsuario } from '../porta/saida/IRepositorioUsuario';

export class ServicoUsuario implements IServicoUsuario {
  private repositorioUsuario: IRepositorioUsuario;

  constructor(repositorioUsuario: IRepositorioUsuario) {
    this.repositorioUsuario = repositorioUsuario;
  }

  // Método para criar um usuário
  public async criarUsuario(dado: any): Promise<any> {
    console.log('ServicoUsuario');
    console.log(dado);
    const usuario = new Usuario(dado.name, dado.email, dado.password);
    try {
      const userId = await this.repositorioUsuario.salvar(usuario);
      return { ...usuario, id: userId };
    } catch (error) {
      console.error('Erro ao salvar usuário no banco de dados', error);
      throw new Error('Erro ao criar usuário');
    }
  }

  // Método para buscar um usuário pelo ID
  public async obterUsuario(id: number): Promise<Usuario | null> {
    try {
      return await this.repositorioUsuario.buscarPorId(id);
    } catch (error) {
      console.error('Erro ao buscar usuário no banco de dados', error);
      throw new Error('Erro ao obter usuário');
    }
  }
}

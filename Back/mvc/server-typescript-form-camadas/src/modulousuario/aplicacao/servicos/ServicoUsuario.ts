import { Usuario } from '../../domain/modelos/Usuario';
import { RepositorioUsuario } from '../../infra/repositorio/RepositorioUsuario';

export class ServicoUsuario {
  private repositorioUsuario: RepositorioUsuario;

  constructor(repositorioUsuario: RepositorioUsuario) {
    this.repositorioUsuario = repositorioUsuario;
  }

  public criarUsuario(dado: any): Usuario {
    //console.log(dado);
    const usuario = new Usuario(dado.name, dado.email, dado.password);
    //console.log(usuario);
    const dadosUsuario = this.repositorioUsuario.salvar(usuario); // Delegando persistência ao repositório
    //console.log(dadosUsuario);
    return dadosUsuario;
  }

  public listarUsuarios(): Usuario[] {
    return this.repositorioUsuario.listarTodos();
  }

  public buscarUsuarioPorEmail(email: string): Usuario | undefined {
    return this.repositorioUsuario.buscarPorEmail(email);
  }
}

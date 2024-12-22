import { Usuario } from './Usuario';

export interface IServicoUsuarioPort {
  criarUsuario(dado: any): Promise<number>;
  obterUsuario(id: number): Promise<Usuario | null>;
}

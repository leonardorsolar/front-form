import { Usuario } from '../../../domain/entity/Usuario';

export interface IServicoUsuario {
  criarUsuario(dado: any): Promise<number>;
  obterUsuario(id: number): Promise<Usuario | null>;
}

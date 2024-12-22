import { Usuario } from '../../../domain/entity/Usuario';

// Interface do Repositório (Porta)
export interface IRepositorioUsuario {
  salvar(usuario: Usuario): Promise<number>;
  buscarPorId(id: number): Promise<Usuario | null>;
}

import { Usuario } from './Usuario';

// Interface do Repositório (Porta)
export interface IRepositorioUsuarioPort {
  salvar(usuario: Usuario): Promise<number>;
  buscarPorId(id: number): Promise<Usuario | null>;
}

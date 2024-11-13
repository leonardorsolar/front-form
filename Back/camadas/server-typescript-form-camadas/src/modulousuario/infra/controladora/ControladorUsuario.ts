import { Request, Response } from 'express';
import { ServicoUsuario } from '../../aplicacao/servicos/ServicoUsuario';

export class ControladorUsuario {
  private servicoUsuario: ServicoUsuario;

  constructor(servicoUsuario: ServicoUsuario) {
    this.servicoUsuario = servicoUsuario;
  }
  // Chamar a camada de serviço
  public async criarUsuario(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);
      const usuario = await this.servicoUsuario.criarUsuario(req.body);
      res.status(201).json(usuario);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public listarUsuarios(req: Request, res: Response): void {
    const usuarios = this.servicoUsuario.listarUsuarios();
    res.status(200).json(usuarios);
  }
}

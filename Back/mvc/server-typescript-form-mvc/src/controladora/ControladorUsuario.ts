import { Request, Response } from 'express';
import { ServicoUsuario } from '../servicos/ServicoUsuario';

export class ControladorUsuario {
  private servicoUsuario: ServicoUsuario;

  constructor(servicoUsuario: ServicoUsuario) {
    this.servicoUsuario = servicoUsuario;
  }

  public async criarUsuario(req: Request, res: Response): Promise<void> {
    console.log('ControladorUsuario');
    console.log(req.body);
    try {
      const usuario = await this.servicoUsuario.criarUsuario(req.body);
      res.status(201).json(usuario);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

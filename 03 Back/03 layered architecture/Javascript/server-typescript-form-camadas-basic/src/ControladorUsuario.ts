import { Request, Response } from 'express';
import { ServicoUsuario } from '../../../ServicoUsuario';

export class ControladorUsuario {
  private servicoUsuario: ServicoUsuario;

  constructor(servicoUsuario: ServicoUsuario) {
    this.servicoUsuario = servicoUsuario;
  }
  // Função para criar um novo usuário
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

  // Função para obter um usuário específico pelo ID
  public async obterUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params; // Captura o ID dos parâmetros da URL
      const usuario = await this.servicoUsuario.obterUsuario(parseInt(id));

      if (!usuario) {
        res.status(404).json({ error: 'Usuário não encontrado' });
      } else {
        res.status(200).json(usuario);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // // Função para atualizar os dados de um usuário específico pelo ID
  // public async atualizarUsuario(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { id } = req.params; // Captura o ID dos parâmetros da URL
  //     const dadosAtualizados = req.body; // Captura os dados de atualização do corpo da requisição

  //     const usuarioAtualizado = await this.servicoUsuario.atualizarUsuario(id, dadosAtualizados);

  //     if (!usuarioAtualizado) {
  //       res.status(404).json({ error: 'Usuário não encontrado' });
  //     } else {
  //       res.status(200).json(usuarioAtualizado);
  //     }
  //   } catch (error: any) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }

  // // Função para remover um usuário específico pelo ID
  // public async removerUsuario(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { id } = req.params; // Captura o ID dos parâmetros da URL

  //     const usuarioRemovido = await this.servicoUsuario.removerUsuario(id);

  //     if (!usuarioRemovido) {
  //       res.status(404).json({ error: 'Usuário não encontrado' });
  //     } else {
  //       res.status(200).json({ message: 'Usuário removido com sucesso' });
  //     }
  //   } catch (error: any) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }
}

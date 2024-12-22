import { Request, Response } from 'express';
import { CriarUsuario } from '../servicos/CriarUsuario';
import { ObterUsuario } from '../servicos/ObterUsuario';
import { AtualizarUsuario } from '../servicos/AtualizarUsuario';
import { RemoverUsuario } from '../servicos/RemoverUsuario';

export class ControladorUsuario {
  // private criarUsuarioUseCase: CriarUsuario;
  //   private obterUsuarioUseCase: ObterUsuario;
  //   private atualizarUsuarioUseCase: AtualizarUsuario;
  //   private removerUsuarioUseCase: RemoverUsuario;

  constructor(readonly criarUsuarioUseCase: CriarUsuario, readonly obterUsuarioUseCase: ObterUsuario, readonly atualizarUsuarioUseCase: AtualizarUsuario, readonly removerUsuarioUseCase: RemoverUsuario) {
    // Instancia os casos de uso
    // this.criarUsuarioUseCase = criarUsuarioUseCase;
    // this.obterUsuarioUseCase = obterUsuarioUseCase;
    // this.atualizarUsuarioUseCase = atualizarUsuarioUseCase;
    // this.removerUsuarioUseCase = removerUsuarioUseCase;
  }

  // Função para criar um novo usuário
  public async criarUsuario(req: Request, res: Response): Promise<void> {
    console.log('ControladorUsuario - Criar');
    console.log(req.body);

    try {
      const usuario = await this.criarUsuarioUseCase.execute(req.body);
      res.status(201).json(usuario);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Função para obter um usuário específico pelo ID
  public async obterUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params; // Captura o ID dos parâmetros da URL
      const usuario = await this.obterUsuarioUseCase.execute(id);

      if (!usuario) {
        res.status(404).json({ error: 'Usuário não encontrado' });
      } else {
        res.status(200).json(usuario);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Função para atualizar os dados de um usuário específico pelo ID
  public async atualizarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params; // Captura o ID dos parâmetros da URL
      const dadosAtualizados = req.body; // Captura os dados de atualização do corpo da requisição

      const usuarioAtualizado = await this.atualizarUsuarioUseCase.execute(id, dadosAtualizados);

      if (!usuarioAtualizado) {
        res.status(404).json({ error: 'Usuário não encontrado' });
      } else {
        res.status(200).json(usuarioAtualizado);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Função para remover um usuário específico pelo ID
  public async removerUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params; // Captura o ID dos parâmetros da URL

      const usuarioRemovido = await this.removerUsuarioUseCase.execute(id);

      if (!usuarioRemovido) {
        res.status(404).json({ error: 'Usuário não encontrado' });
      } else {
        res.status(200).json({ message: 'Usuário removido com sucesso' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

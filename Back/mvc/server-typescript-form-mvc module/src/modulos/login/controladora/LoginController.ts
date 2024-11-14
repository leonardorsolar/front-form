// Implementar
import { Request, Response } from 'express';
import { LoginService } from '../servicos/LoginService';

export class LoginController {
  private loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  // Controlador para autenticação de usuário
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const token = await this.loginService.autenticar(email, password);

      if (!token) {
        res.status(401).json({ error: 'Credenciais inválidas' });
      } else {
        res.status(200).json({ token });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao autenticar usuário' });
    }
  }

  // Controlador para validar um token
  public async validar(req: Request, res: Response): Promise<void> {
    const { token } = req.body;

    try {
      const isValid = await this.loginService.validarToken(token);

      if (!isValid) {
        res.status(401).json({ error: 'Token inválido' });
      } else {
        res.status(200).json({ message: 'Token válido' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao validar token' });
    }
  }
}

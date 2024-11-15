import { Router } from 'express';
import { ControladorUsuario } from '../modulos/usuario/controladora/ControladorUsuario';
import { CriarUsuario } from '../modulos/usuario/servicos/CriarUsuario';
import { ObterUsuario } from '../modulos/usuario/servicos/ObterUsuario';
import { AtualizarUsuario } from '../modulos/usuario/servicos/AtualizarUsuario';
import { RemoverUsuario } from '../modulos/usuario/servicos/RemoverUsuario';

// Cria uma instância do roteador para definir as rotas
const usuarioRotas = Router();

// Instancia os casos de uso
const criarUsuarioUseCase = new CriarUsuario();
const obterUsuarioUseCase = new ObterUsuario();
const atualizarUsuarioUseCase = new AtualizarUsuario();
const removerUsuarioUseCase = new RemoverUsuario();

// Instancia o controlador de usuário, passando os casos de uso como dependências
const controladorUsuario = new ControladorUsuario(criarUsuarioUseCase, obterUsuarioUseCase, atualizarUsuarioUseCase, removerUsuarioUseCase);

// Rota POST para criar um novo usuário
usuarioRotas.post('/criarUsuario', (req, res) => {
  controladorUsuario.criarUsuario(req, res);
});

// Rota GET para obter um usuário pelo ID
usuarioRotas.get('/obterUsuario/:id', (req, res) => {
  controladorUsuario.obterUsuario(req, res);
});

// Rota PUT para atualizar um usuário pelo ID
usuarioRotas.put('/atualizarUsuario/:id', (req, res) => {
  controladorUsuario.atualizarUsuario(req, res);
});

// Rota DELETE para remover um usuário pelo ID
usuarioRotas.delete('/removerUsuario/:id', (req, res) => {
  controladorUsuario.removerUsuario(req, res);
});

// Exporta o roteador para ser usado em outras partes da aplicação
export default usuarioRotas;

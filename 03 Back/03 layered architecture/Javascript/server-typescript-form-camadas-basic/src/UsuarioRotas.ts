import { Router } from 'express';
import { ServicoUsuario } from './ServicoUsuario';
import { RepositorioUsuario } from './RepositorioUsuario';
import { ControladorUsuario } from './ControladorUsuario';

// Cria uma instância do roteador para definir as rotas
const usuarioRotas = Router();

// Instancia o serviço de usuário e o controlador de usuário, injetando o serviço no controlador
const repositorioUsuario = new RepositorioUsuario();
const servicoUsuario = new ServicoUsuario(repositorioUsuario);
const controladorUsuario = new ControladorUsuario(servicoUsuario);

// Rota POST para criar um novo usuário
// Chama o método 'criarUsuario' do controlador, que cria um novo usuário com base nos dados da requisição
usuarioRotas.post('/criarUsuario', (req, res) => {
  console.log('rota usuário:criarUsuario');
  console.log(req.body);
  controladorUsuario.criarUsuario(req, res);
});

// Rota GET para obter um usuário pelo ID
// Chama o método 'obterUsuario' do controlador, que recupera os dados de um usuário com base no ID fornecido na URL
usuarioRotas.get('/obterUsuario/:id', (req, res) => {
  controladorUsuario.obterUsuario(req, res);
});

// // Rota PUT para atualizar um usuário pelo ID
// // Chama o método 'atualizarUsuario' do controlador, que atualiza os dados de um usuário com base no ID e nos dados fornecidos
// usuarioRotas.put('/atualizarUsuario/:id', (req, res) => {
//   controladorUsuario.atualizarUsuario(req, res);
// });

// // Rota DELETE para remover um usuário pelo ID
// // Chama o método 'removerUsuario' do controlador, que exclui um usuário com base no ID fornecido na URL
// usuarioRotas.delete('/removerUsuario/:id', (req, res) => {
//   controladorUsuario.removerUsuario(req, res);
// });

// Exporta o roteador para ser usado em outras partes da aplicação
export default usuarioRotas;

import { Router } from 'express';
import { ControladorUsuario } from '../controladora/ControladorUsuario';
import { ServicoUsuario } from '../../aplicacao/servicos/ServicoUsuario';
import { RepositorioUsuario } from '../repositorio/RepositorioUsuario';

const rotas = Router();

const repositorioUsuario = new RepositorioUsuario();
const servicoUsuario = new ServicoUsuario(repositorioUsuario);
const controladorUsuario = new ControladorUsuario(servicoUsuario);

rotas.post('/criarUsuario', (req, res) => {
  controladorUsuario.criarUsuario(req, res);
});

export default rotas;

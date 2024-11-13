import { Router } from 'express';
import { ServicoUsuario } from '../servicos/ServicoUsuario';
import { ControladorUsuario } from '../controladora/ControladorUsuario';

const rotas = Router();
const servicoUsuario = new ServicoUsuario();
const controladorUsuario = new ControladorUsuario(servicoUsuario);

rotas.post('/criarUsuario', (req, res) => {
  controladorUsuario.criarUsuario(req, res);
});

export default rotas;

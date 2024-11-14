// tests/controladora/ControladorUsuario.test.ts
import request from 'supertest';
import express from 'express';
import { ServicoUsuario } from '../src/servicos/ServicoUsuario';
import { ControladorUsuario } from '../src/controladora/ControladorUsuario';

describe('ControladorUsuario', () => {
  let app: express.Express;
  let servicoUsuario: ServicoUsuario;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    servicoUsuario = new ServicoUsuario();
    const controlador = new ControladorUsuario(servicoUsuario);
    app.post('/usuarios', (req, res) => controlador.criarUsuario(req, res));
  });

  it('deve criar um usuário e retornar os dados do usuário', async () => {
    const response = await request(app).post('/usuarios').send({ nome: 'João', email: 'joao@example.com', senha: 'senha123' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      nome: 'João',
      email: 'joao@example.com',
      senha: 'senha123',
    });
  });

  // it('deve retornar erro 500 se ocorrer um erro', async () => {
  //   // Força um erro no serviço
  //   servicoUsuario.criarUsuario = () => {
  //     throw new Error('Erro ao criar usuário');
  //   };

  //   const response = await request(app).post('/usuarios').send({ nome: 'João', email: 'joao@example.com', senha: 'senha123' });

  //   expect(response.status).toBe(500);
  //   expect(response.body).toEqual({ error: 'Erro ao criar usuário' });
  // });
});

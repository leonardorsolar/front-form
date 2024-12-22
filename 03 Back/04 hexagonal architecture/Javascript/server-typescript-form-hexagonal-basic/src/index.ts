import express, { Request, Response } from 'express';
import usuarioRotas from './UsuarioRotas';
import cors from 'cors'; // Importa o CORS
//inicializar o servidor e configurar as rotas.

const app = express();
app.use(express.json());

// Configura o CORS
app.use(cors()); // Aplica o CORS para permitir requisições de outros domínios

// Rota GET para visualização
app.get('/', (req: Request, res: Response) => {
  res.send('Olá, Mundo! Bem-vindo ao Express com TypeScript.');
});

app.use('/api/usuarios/', usuarioRotas);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
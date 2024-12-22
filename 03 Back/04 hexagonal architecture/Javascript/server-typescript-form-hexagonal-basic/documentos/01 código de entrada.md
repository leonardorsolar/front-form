Na arquitetura hexagonal, a porta de entrada (Primary Adapter) é responsável por receber as solicitações externas e traduzi-las para o formato esperado pelo núcleo da aplicação. No caso de um aplicativo Node.js com Express, essa porta seria um controlador HTTP que traduz as requisições HTTP para chamadas aos casos de uso (ou serviços) do domínio.

Abaixo está um exemplo de como poderia ser implementada a porta de entrada para a funcionalidade relacionada ao `Usuario`.

---

### 1. Porta de Entrada (Controlador HTTP)

```typescript
import { Request, Response } from 'express';
import { ServicoUsuario } from '../../application/service/ServicoUsuario';

export class ControladorUsuario {
  private servicoUsuario: ServicoUsuario;

  constructor(servicoUsuario: ServicoUsuario) {
    this.servicoUsuario = servicoUsuario;
  }

  // Handler para criar um usuário
  public async criarUsuario(req: Request, res: Response): Promise<void> {
    const { nome, email, senha } = req.body;

    try {
      const id = await this.servicoUsuario.criarUsuario(nome, email, senha);
      res.status(201).json({ id });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ mensagem: 'Erro ao criar usuário' });
    }
  }

  // Handler para obter um usuário por ID
  public async obterUsuarioPorId(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const usuario = await this.servicoUsuario.obterUsuarioPorId(Number(id));
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
    }
  }
}
```

---

### 2. Configuração da Rota (Adaptador para Express)

Você conecta o controlador com o framework Express para que ele possa receber requisições HTTP.

```typescript
import express from 'express';
import { ControladorUsuario } from './ControladorUsuario';
import { ServicoUsuario } from '../../application/service/ServicoUsuario';
import { RepositorioUsuario } from '../../infrastructure/repository/RepositorioUsuario';

const router = express.Router();

// Configurar injeção de dependências
const repositorioUsuario = new RepositorioUsuario();
const servicoUsuario = new ServicoUsuario(repositorioUsuario);
const controladorUsuario = new ControladorUsuario(servicoUsuario);

// Rotas
router.post('/usuarios', (req, res) => controladorUsuario.criarUsuario(req, res));
router.get('/usuarios/:id', (req, res) => controladorUsuario.obterUsuarioPorId(req, res));

export default router;
```

---

### 3. Inicialização no Servidor Principal

Adicione as rotas configuradas no servidor principal do Express.

```typescript
import express from 'express';
import usuarioRoutes from './path/to/routes/UsuarioRoutes';

const app = express();
app.use(express.json());

// Rotas
app.use('/api', usuarioRoutes);

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

---

### Fluxo Completo

1. **Porta de Entrada**: O controlador (`ControladorUsuario`) recebe as requisições HTTP e valida os dados.
2. **Caso de Uso**: O controlador chama os métodos do serviço (`ServicoUsuario`), que implementa a lógica de negócios.
3. **Porta de Saída**: O serviço utiliza o repositório (`RepositorioUsuario`) para acessar ou persistir dados.
4. **Banco de Dados**: O repositório interage diretamente com o banco de dados para executar as operações.

Isso garante uma separação clara entre as responsabilidades, permitindo que cada camada seja testada e mantida de forma independente.

Você está absolutamente correto! Na arquitetura hexagonal, a camada de aplicação também deve expor uma **porta de entrada** na forma de uma interface. Essa interface define os métodos que os adaptadores primários (como controladores HTTP) podem usar para interagir com os casos de uso ou serviços. Isso garante o desacoplamento entre a camada de aplicação e os adaptadores.

Vamos ajustar o design para incluir essa interface de porta de entrada.

---

### 1. Porta de Entrada (Interface para a Aplicação)

A interface define as operações que o serviço expõe para os adaptadores primários.

```typescript
import { Usuario } from '../../domain/entity/Usuario';

export interface IAplicacaoUsuario {
  criarUsuario(nome: string, email: string, senha: string): Promise<number>;
  obterUsuarioPorId(id: number): Promise<Usuario | null>;
}
```

---

### 2. Implementação da Porta de Entrada na Camada de Aplicação

O serviço (`ServicoUsuario`) implementa a interface `IAplicacaoUsuario`.

```typescript
import { IAplicacaoUsuario } from './IAplicacaoUsuario';
import { Usuario } from '../../domain/entity/Usuario';
import { IRepositorioUsuario } from '../../domain/ports/IRepositorioUsuario';

export class ServicoUsuario implements IAplicacaoUsuario {
  private repositorioUsuario: IRepositorioUsuario;

  constructor(repositorioUsuario: IRepositorioUsuario) {
    this.repositorioUsuario = repositorioUsuario;
  }

  public async criarUsuario(nome: string, email: string, senha: string): Promise<number> {
    const usuario = new Usuario(nome, email, senha);
    return await this.repositorioUsuario.salvar(usuario);
  }

  public async obterUsuarioPorId(id: number): Promise<Usuario | null> {
    return await this.repositorioUsuario.buscarPorId(id);
  }
}
```

---

### 3. Porta de Entrada HTTP (Adaptador Primário)

O controlador usa a interface `IAplicacaoUsuario` em vez de se acoplar diretamente à implementação.

```typescript
import { Request, Response } from 'express';
import { IAplicacaoUsuario } from '../../application/service/IAplicacaoUsuario';

export class ControladorUsuario {
  private aplicacaoUsuario: IAplicacaoUsuario;

  constructor(aplicacaoUsuario: IAplicacaoUsuario) {
    this.aplicacaoUsuario = aplicacaoUsuario;
  }

  public async criarUsuario(req: Request, res: Response): Promise<void> {
    const { nome, email, senha } = req.body;

    try {
      const id = await this.aplicacaoUsuario.criarUsuario(nome, email, senha);
      res.status(201).json({ id });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ mensagem: 'Erro ao criar usuário' });
    }
  }

  public async obterUsuarioPorId(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const usuario = await this.aplicacaoUsuario.obterUsuarioPorId(Number(id));
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

### 4. Configuração de Dependências

O controlador recebe a implementação da interface `IAplicacaoUsuario` injetada durante a configuração.

```typescript
import express from 'express';
import { ControladorUsuario } from './ControladorUsuario';
import { ServicoUsuario } from '../../application/service/ServicoUsuario';
import { RepositorioUsuario } from '../../infrastructure/repository/RepositorioUsuario';
import { IAplicacaoUsuario } from '../../application/service/IAplicacaoUsuario';

const router = express.Router();

// Injeção de dependências
const repositorioUsuario = new RepositorioUsuario();
const aplicacaoUsuario: IAplicacaoUsuario = new ServicoUsuario(repositorioUsuario);
const controladorUsuario = new ControladorUsuario(aplicacaoUsuario);

// Rotas
router.post('/usuarios', (req, res) => controladorUsuario.criarUsuario(req, res));
router.get('/usuarios/:id', (req, res) => controladorUsuario.obterUsuarioPorId(req, res));

export default router;
```

---

### Vantagens do Design

1. **Flexibilidade**: A interface `IAplicacaoUsuario` permite que o núcleo da aplicação seja substituído ou testado de forma independente.
2. **Desacoplamento**: O controlador HTTP depende de uma abstração, não de uma implementação específica.
3. **Testabilidade**: Podemos criar um mock de `IAplicacaoUsuario` para testar o controlador HTTP sem envolver a lógica do serviço ou o banco de dados.
4. **Extensibilidade**: Qualquer adaptador primário (como um CLI, gRPC, ou WebSocket) pode usar a interface `IAplicacaoUsuario`.

Esse design segue os princípios da arquitetura hexagonal, promovendo um núcleo de aplicação independente e fácil de evoluir.

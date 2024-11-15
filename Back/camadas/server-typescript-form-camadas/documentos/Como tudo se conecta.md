Como tudo se conecta

    Camada de Serviço (ServicoUsuario):
        Define regras de negócio.
        Usa a camada de repositório para persistir os dados.

    Camada de Repositório (RepositorioUsuario):
        Abstrai a interação direta com o banco de dados.
        Gerencia as consultas e comandos SQL.

    Banco de Dados (database.ts):
        Inicializa a conexão e cria tabelas.
        Serve de base para o repositório.

### Como tudo se conecta no sistema

#### **1. Camada de Roteamento (`UsuarioRotas.ts`)**

**Localização:**  
`Back/camadas/server-typescript-form-camadas/src/modulousuario/infra/rotas/UsuarioRotas.ts`

- **Função:** Define as rotas HTTP para as operações relacionadas a usuários, como criar, buscar, atualizar e excluir.
- **Conexão:** As rotas chamam métodos da **Controladora** para executar as operações.
- **Exemplo:**

  ```typescript
  import { Router } from 'express';
  import { ControladorUsuario } from '../controladora/ControladorUsuario';

  const controladorUsuario = new ControladorUsuario();
  const router = Router();

  router.post('/usuarios', (req, res) => controladorUsuario.criar(req, res));

  export default router;
  ```

---

#### **2. Camada de Controladora (`ControladorUsuario.ts`)**

**Localização:**  
`Back/camadas/server-typescript-form-camadas/src/modulousuario/infra/controladora/ControladorUsuario.ts`

- **Função:** Faz a ponte entre as rotas e os serviços. Recebe as requisições HTTP e delega o processamento à camada de serviço.
- **Conexão:** A Controladora usa a camada de **Serviço (`ServicoUsuario`)** para realizar a lógica de negócio.
- **Exemplo:**

  ```typescript
  import { Request, Response } from 'express';
  import { ServicoUsuario } from '../../aplicacao/servicos/ServicoUsuario';
  import { RepositorioUsuario } from '../repositorio/RepositorioUsuario';

  export class ControladorUsuario {
    private servicoUsuario: ServicoUsuario;

    constructor() {
      const repositorioUsuario = new RepositorioUsuario();
      this.servicoUsuario = new ServicoUsuario(repositorioUsuario);
    }

    async criar(req: Request, res: Response): Promise<void> {
      try {
        const usuario = await this.servicoUsuario.criarUsuario(req.body);
        res.status(201).json(usuario);
      } catch (error) {
        res.status(500).json({ erro: error.message });
      }
    }
  }
  ```

---

#### **3. Camada de Serviço (`ServicoUsuario.ts`)**

**Localização:**  
`Back/camadas/server-typescript-form-camadas/src/modulousuario/aplicacao/servicos/ServicoUsuario.ts`

- **Função:** Contém a lógica de negócio para operações com usuários (ex.: validações, regras específicas).
- **Conexão:** A camada de serviço interage com o **Repositório (`RepositorioUsuario`)** para persistir dados no banco.
- **Exemplo:**

  ```typescript
  public async criarUsuario(dado: any): Promise<any> {
    const usuario = new Usuario(dado.name, dado.email, dado.password);

    try {
      const userId = await this.repositorioUsuario.salvar(usuario);
      return { ...usuario, id: userId };
    } catch (error) {
      throw new Error('Erro ao criar usuário');
    }
  }
  ```

---

#### **4. Camada de Repositório (`RepositorioUsuario.ts`)**

**Localização:**  
`Back/camadas/server-typescript-form-camadas/src/modulousuario/infra/repositorio/RepositorioUsuario.ts`

- **Função:** Gerencia as operações de persistência e acesso ao banco de dados.
- **Conexão:** O repositório se conecta diretamente ao banco de dados por meio do arquivo `database.ts`.
- **Exemplo:**
  ```typescript
  public async salvar(usuario: Usuario): Promise<number> {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [usuario.getNome(), usuario.getEmail(), usuario.getSenha()],
        function (err) {
          if (err) {
            reject(new Error('Erro ao inserir usuário no banco de dados'));
          } else {
            resolve(this.lastID);
          }
        }
      );
    });
  }
  ```

---

#### **5. Banco de Dados (`database.ts`)**

**Localização:**  
`Back/camadas/server-typescript-form-camadas/src/compartilhamento/bancodados/database.ts`

- **Função:** Configura a conexão com o SQLite e cria tabelas necessárias.
- **Conexão:** O arquivo é usado exclusivamente pela camada de **Repositório**.
- **Exemplo:**

  ```typescript
  export const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
    } else {
      console.log('Conectado ao banco de dados SQLite');
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      password TEXT
    )
  `);
  ```

---

#### **6. Arquivo Principal (`index.ts`)**

**Localização:**  
`Back/camadas/server-typescript-form-camadas/src/index.ts`

- **Função:** Configura e inicia o servidor Express, além de registrar as rotas do sistema.
- **Conexão:** Importa as rotas e associa à aplicação Express.
- **Exemplo:**

  ```typescript
  import express from 'express';
  import usuarioRotas from './modulousuario/infra/rotas/UsuarioRotas';

  const app = express();
  app.use(express.json());
  app.use('/api', usuarioRotas);

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
  ```

---

### Fluxo de Conexão no Sistema

1. O cliente faz uma requisição HTTP para uma rota definida em **`UsuarioRotas.ts`**.
2. A **Controladora (`ControladorUsuario.ts`)** processa a requisição e chama o serviço apropriado.
3. A **Camada de Serviço (`ServicoUsuario.ts`)** aplica a lógica de negócio e delega a persistência ao **Repositório (`RepositorioUsuario.ts`)**.
4. O **Repositório** executa comandos SQL no banco de dados usando a conexão definida em **`database.ts`**.
5. A resposta é construída e retornada ao cliente.

# Hexagonal

Para seguir os princípios da arquitetura hexagonal (ou Ports and Adapters), você pode criar uma interface para definir os métodos de persistência de dados do repositório e, em seguida, implementar essa interface no seu `RepositorioUsuario`. Isso ajuda a desacoplar a lógica de negócios da lógica de persistência, facilitando a substituição ou simulação da camada de persistência no futuro.

### 1. Interface do Repositório (Porta)

```typescript
export interface IRepositorioUsuario {
  salvar(usuario: Usuario): Promise<number>;
  buscarPorId(id: number): Promise<Usuario | null>;
}
```

Essa interface define os métodos que qualquer implementação do repositório deve possuir.

---

### 2. Implementação da Interface (Adaptador)

Sua classe `RepositorioUsuario` precisa implementar essa interface. O código é atualizado para refletir essa relação.

```typescript
import { IRepositorioUsuario } from './IRepositorioUsuario';
import { db } from '../../../compartilhamento/bancodados/database';
import { Usuario } from '../../domain/entity/Usuario';

export class RepositorioUsuario implements IRepositorioUsuario {
  // Método para salvar um usuário no banco de dados
  public async salvar(usuario: Usuario): Promise<number> {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [usuario.getNome(), usuario.getEmail(), usuario.getSenha()], function (err: any) {
        if (err) {
          reject(err);
        } else {
          console.log('RepositorioUsuario');
          console.log(this.lastID);
          resolve(this.lastID); // `this` se refere ao Statement do SQLite
        }
      });
    });
  }

  // Método para buscar um usuário pelo ID
  public async buscarPorId(id: number): Promise<Usuario | null> {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id = ?', [id], (err: any, row: any) => {
        if (err) {
          reject(err);
        } else if (row) {
          const usuario = new Usuario(row.name, row.email, row.password);
          resolve(usuario);
        } else {
          resolve(null);
        }
      });
    });
  }
}
```

---

### 3. Uso no Contexto Hexagonal

A interface `IRepositorioUsuario` é usada pelo caso de uso ou serviço (na camada de aplicação), e não diretamente pela implementação. Isso promove o desacoplamento.

#### Exemplo de Caso de Uso:

```typescript
import { IRepositorioUsuario } from '../domain/ports/IRepositorioUsuario';
import { Usuario } from '../domain/entity/Usuario';

export class ServicoUsuario {
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

Nesse exemplo, a `ServicoUsuario` depende da interface `IRepositorioUsuario`, permitindo que a implementação concreta seja substituída facilmente, por exemplo, para testes unitários.

# configuração da api

Para criar uma API em JavaScript utilizando o Node.js com o framework Express, que receba dados via uma requisição HTTP, siga os passos abaixo. O exemplo será uma API simples que recebe dados como nome, email e senha, e os insere em um banco de dados SQLite.

### 1. Instalar Dependências

Antes de começar, você precisa instalar o Node.js no seu sistema. Em seguida, crie um projeto Node.js e instale as dependências necessárias.

1. Inicie um projeto Node.js:
    ```bash
    npm init -y
    ```
2. Crie o arquivo .gitignore e cole dentro dele
    ```bash
     # Ignora a pasta node_modules (dependências instaladas)
     node_modules/
    ```

````
3. Instale as bibliotecas necessárias:
  ```bash
  npm install express sqlite3 cors
````

-   `express`: Um framework web rápido e minimalista para Node.js.
-   `sqlite3`: Um banco de dados leve embutido.
-   `cors`: Middleware para habilitar CORS (Cross-Origin Resource Sharing), permitindo que a API seja acessada de outros domínios.

### 2. Criar Estrutura de Arquivos

Estrutura de pastas e arquivos:

```
/api-project
  |-- index.js       # O arquivo principal da aplicação
  |-- database.db    # O banco de dados SQLite será criado aqui
  |-- .gitignore     # O banco de dados SQLite será criado aqui
```

### 3. Código da API (`index.js`)

Crie o arquivo index.js e cole o código a seguir:
Aqui está o código completo para criar uma API que receba dados de um usuário e os insira em um banco de dados SQLite.

```js
const express = require("express") // Importa o framework Express
const cors = require("cors") // Importa o CORS
const sqlite3 = require("sqlite3").verbose() // Importa o SQLite3

const app = express() // Cria uma nova instância do Express
app.use(express.json()) // Middleware que permite o uso de JSON nas requisições

// Configura o CORS
app.use(cors()) // Aplica o CORS para permitir requisições de outros domínios

// Conecta ao banco de dados SQLite
const db = new sqlite3.Database("./database.db")

// Cria a tabela 'usuarios' se ela ainda não existir
// email TEXT UNIQUE NOT NULL,
db.run(
    `CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
  )`,
    (err) => {
        if (err) {
            console.error(err.message) // Exibe uma mensagem de erro se ocorrer ao criar a tabela
        } else {
            console.log("Table usuarios created successfully!") // Exibe mensagem se a tabela for criada com sucesso
        }
    }
)

// Rota GET para visualização
app.get("/", (req, res) => {
    // Define uma rota GET no caminho raiz ('/')
    res.send("Olá, Mundo! Bem-vindo ao Express com JavaScript.") // Responde com uma mensagem de boas-vindas
})

// Rota POST para adicionar um usuário ao banco de dados
app.post("/criar-usuario", (req, res) => {
    const data = req.body // Captura os dados do corpo da requisição
    console.log(data) // Exibe os dados no console para depuração

    // Insere um novo usuário na tabela 'usuarios'
    db.run(
        `INSERT INTO usuarios (name, email, password) VALUES (?, ?, ?)`,
        [data.name, data.email, data.password], // Substitui os "?" pelos valores de 'name', 'email' e 'password'
        function (err) {
            if (err) {
                console.error("Erro ao inserir usuário:", err.message)
                // Verifica se o erro é uma violação de unicidade
                //if (err.code === 'SQLITE_CONSTRAINT') {
                //    return res.status(409).json({ error: "E-mail já cadastrado" }); // 409 Conflict
                //}
                return res
                    .status(500)
                    .json({ error: "Error creating user - back" }) // Retorna erro ao cliente
            }
            console.log("Usuário criado com sucesso!") // Exibe mensagem de sucesso
            res.status(201).json({ name: data.name }) // Retorna sucesso ao cliente
        }
    )
})

const PORT = 3000 // Define a porta em que o servidor vai rodar
app.listen(PORT, () => {
    // Inicia o servidor e o faz escutar na porta definida
    console.log(`Servidor rodando na porta ${PORT}`) // Exibe uma mensagem no console quando o servidor está ativo
})
```

### 4. Explicação do Código

1. **`express`**: Framework que facilita a criação de APIs e rotas.

    ```js
    const express = require("express")
    ```

2. **`cors`**: Middleware que habilita o CORS, permitindo que a API seja acessada por outros domínios.

    ```js
    const cors = require("cors")
    ```

3. **`sqlite3`**: Biblioteca para utilizar o banco de dados SQLite.

    ```js
    const sqlite3 = require("sqlite3").verbose()
    ```

4. **`app.use(express.json())`**: Middleware para processar requisições com dados JSON.

    ```js
    app.use(express.json())
    ```

5. **Conexão com o banco de dados**:

    - O banco de dados SQLite será criado automaticamente no arquivo `database.db` se ele não existir.

    ```js
    const db = new sqlite3.Database("./database.db")
    ```

6. **Criação da tabela**: A tabela `usuarios` será criada se ela ainda não existir.

    ```js
    db.run(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `)
    ```

7. **Rota POST**: Recebe os dados do usuário e os insere na tabela `usuarios`.

    ```js
    app.post("/criar-usuario", (req, res) => {
        const data = req.body
        db.run(
            `INSERT INTO usuarios (name, email, password) VALUES (?, ?, ?)`,
            [data.name, data.email, data.password],
            function (err) {
                if (err) {
                    console.error(err.message)
                    res.status(500).send("Erro ao criar usuário")
                } else {
                    console.log("Usuário criado com sucesso!")
                    res.status(201).send("Usuário criado com sucesso!")
                }
            }
        )
    })
    ```

8. **Escuta na porta**: O servidor escuta na porta 3000 e responde às requisições.
    ```js
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000")
    })
    ```

### 5. Executar o Servidor

Agora que o código está pronto, execute o servidor:

```bash
node index.js
```

O servidor estará disponível em `http://localhost:3000`.

### 6. Testar a API

Você pode testar a API usando o Postman ou qualquer cliente HTTP. Faça uma requisição **POST** para `http://localhost:3000/criar-usuario` com os seguintes dados no corpo (em formato JSON):

```json
{
    "name": "Leonardo",
    "email": "leo@gmail.com",
    "password": "123456"
}
```

Se os dados forem inseridos corretamente no banco de dados, você receberá a resposta:

```
Usuário criado com sucesso!
```

### Resumo:

Este código cria uma API em JavaScript utilizando o Express e o SQLite. A API recebe dados de um usuário via uma requisição POST, insere esses dados em um banco de dados SQLite, e retorna uma resposta de sucesso ou erro.

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

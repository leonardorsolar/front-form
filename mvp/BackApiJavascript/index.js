//index.js é responsável apenas pelas rotas e lógica do servidor.
//ES Module (ECMAScript Module) é o formato nativo de módulos em JavaScript, introduzido no ECMAScript 2015 (ES6)
// Ele permite organizar e reutilizar código em diferentes arquivos de forma mais clara, usando as palavras-chave import e export
import express, { json } from "express" // Importa o framework Express
import cors from "cors" // Importa o CORS
import { initializeDatabase, saveUserToDatabase } from "./database.js"

const app = express() // Cria uma nova instância do Express
app.use(json()) // Middleware que permite o uso de JSON nas requisições

// Configura o CORS
app.use(cors()) // Aplica o CORS para permitir requisições de outros domínios

// Inicializa o banco de dados
initializeDatabase()
    .then(() => {
        console.log("Banco de dados inicializado com sucesso.")
    })
    .catch((error) => {
        console.error("Erro ao inicializar o banco de dados:", error.message)
    })

// Rota GET para visualização na URL: http://localhost:3000
app.get("/", (req, res) => {
    // Define uma rota GET no caminho raiz ('/')
    res.send(
        "Olá, Mundo! Bem-vindo ao Express com JavaScript na rota http://localhost:3000."
    ) // Responde com uma mensagem de boas-vindas
})

// Rota POST para adicionar um usuário ao banco de dados
// Essa url do browser irá capturar o body da requisição do front
app.post("/api/usuarios/criarUsuario", async (req, res) => {
    const data = req.body // Captura os dados do corpo da requisição
    console.log(data) // Exibe os dados no console para depuração
    //maneira 1: direta
    const output = await saveUserToDatabase(data.name) // função que  salvará os dados no banco
    res.status(201).json({ name: output })
    // maneira 2: com validações e tratamento de erros
    // if (!data.name) {
    //     return res.status(400).json({ error: "O campo 'name' é obrigatório." })
    // }

    // try {
    //     const output = await saveUserToDatabase(data.name) // Salva o usuário no banco de dados
    //     res.status(201).json({
    //         name: output,
    //         message: "Usuário criado com sucesso.",
    //     })
    // } catch (error) {
    //     res.status(500).json({
    //         error: "Erro ao salvar usuário no banco de dados.",
    //     })
    // }
})

const PORT = 3000 // Define a porta em que o servidor vai rodar
app.listen(PORT, () => {
    // Inicia o servidor e o faz escutar na porta definida
    console.log(`Servidor rodando na porta ${PORT}`) // Exibe uma mensagem no console quando o servidor está ativo
})

// 1-Para funcionar o node instale o node na sua máquina
// 2-Para inciar o código é necessário instalar no terminal as bibliotecas node: npm install
// 3-para rodar o servidor express: node index.js
// 4-para visualizar o banco instale o SQLite Viewer

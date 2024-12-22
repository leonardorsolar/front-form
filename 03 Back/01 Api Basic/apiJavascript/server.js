// Arquivo com o exemplo somente de um servidor express
const express = require("express") // Importa o framework Express

const app = express() // Cria uma nova instância do Express
app.use(express.json()) // Middleware que permite o uso de JSON nas requisições

// Rota GET para visualização
app.get("/", (req, res) => {
    // Define uma rota GET no caminho raiz ('/')
    res.send("Olá, Mundo! Bem-vindo ao Express com JavaScript.") // Responde com uma mensagem de boas-vindas
})

const PORT = 3000 // Define a porta em que o servidor vai rodar
app.listen(PORT, () => {
    // Inicia o servidor e o faz escutar na porta definida
    console.log(`Servidor rodando na porta ${PORT}`) // Exibe uma mensagem no console quando o servidor está ativo
})

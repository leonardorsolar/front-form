// controller.js
// Importa o módulo service, que contém a função execute para lidar com a lógica de negócio
const service = require("./service")

// Função que serve como intermediário entre o app e o service
function handle(data) {
    console.log("Controller->>") // Exibe a execução da função no controller
    const response = service.execute(data) // Chama o service para executar a lógica e retorna a resposta
    return `${response}` // Retorna a resposta final para o app
}

// Exporta a função handle para ser usada em outros arquivos
module.exports = { handle }

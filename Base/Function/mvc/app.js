// app.js
// Importa o módulo controller, que contém a função handle para processar dados
const controller = require("./controller")

// Função principal que simula a execução do aplicativo
function main() {
    console.log("\nApp: Iniciado a função\n\nmain ->>")
    const data = { name: "leonardo" } // Dados de entrada para o fluxo de execução
    const response = controller.handle(data) // Chama o controller para processar os dados
    console.log("\nResposta (retorno da função) para o front\n")
    console.log(`Resposta: ${response}`) // Exibe a resposta final no console
}

// Executa a função principal
main()

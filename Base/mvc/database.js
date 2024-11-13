// database.js
// Função que simula a consulta ao banco de dados
function getData(data) {
    // Se o nome fornecido for "leonardo", retorna dados simulados do banco de dados
    if (data.name == "leonardo") {
        return { id: 1, name: "leonardo", email: "leonardo@gmail.com" }
    }
    // Caso contrário, retorna uma mensagem padrão
    return "<--Dados do banco de dados"
}

// Exporta a função getData para ser usada em outros arquivos
module.exports = { getData }

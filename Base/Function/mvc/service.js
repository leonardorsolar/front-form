// service.js
// Importa o módulo database, que contém a função getData para buscar dados do "banco de dados"
const database = require("./database")

// Função que contém a lógica principal de negócio e manipulação dos dados
function execute(data) {
    console.log("Service ->> ")
    const response = database.getData(data) // Obtém dados do banco de dados com base na entrada
    return (
        "id:" +
        response.id +
        " name:" +
        response.name +
        " email:" +
        response.email
    ) // Formata a resposta para ser exibida
}

// Exporta a função execute para ser usada em outros arquivos
module.exports = { execute }

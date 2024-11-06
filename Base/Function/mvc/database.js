// database.js
function getData(data) {
    if (data.name == "leonardo") {
        return { id: 1, name: "leonardo", email: "leonardo@gmail.com" }
    }
    return "<--Dados do banco de dados"
}

module.exports = { getData }

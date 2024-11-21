//database.js deve lidar apenas com a conexão ao banco e funções relacionadas ao banco de dados
import sqlite3 from "sqlite3"

// Abre uma conexão com o banco de dados SQLite (cria um novo banco de dados se não existir)
// Cria ou conecta ao banco de dados SQLite
const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message)
    } else {
        console.log("Conectado ao banco de dados SQLite.")
    }
})

// Função para criar a tabela de usuários
export function initializeDatabase() {
    return new Promise((resolve, reject) => {
        db.run(
            `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT,
                password TEXT
            )`,
            (err) => {
                if (err) {
                    console.error("Erro ao criar a tabela:", err.message)
                    reject(err)
                } else {
                    console.log("Tabela 'users' pronta.")
                    resolve()
                }
            }
        )
    })
}

// Função para salvar usuário no banco de dados
export function saveUserToDatabase(name) {
    return new Promise((resolve, reject) => {
        console.log("saveUserToDatabase")
        console.log(name)
        db.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name],
            function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(name) // Acessa o ID do último registro inserido
                }
            }
        )
    })
}

export default db

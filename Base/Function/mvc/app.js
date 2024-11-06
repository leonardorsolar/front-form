// app.js
const controller = require("./controller")

function main() {
    console.log("\n App: inciado a função\n\nmain ->>")
    const data = { name: "leonardo" }
    const response = controller.handle(data)
    console.log("\n Resposta (retorno da função) para o front \n")
    console.log(`Resposta: ${response}`)
}

main()

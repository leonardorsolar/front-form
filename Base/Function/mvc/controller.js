// controller.js
const service = require("./service")

function handle(data) {
    console.log("Controller->>")
    const response = service.usecase(data)
    return `${response}`
}

module.exports = { handle }

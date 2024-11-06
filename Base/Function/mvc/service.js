// service.js
const database = require("./database")

function usecase(data) {
    console.log("Service ->> ")
    const response = database.getData(data)
    return (
        "id:" +
        response.id +
        " name:" +
        response.name +
        " email:" +
        response.email
    )
}

module.exports = { usecase }

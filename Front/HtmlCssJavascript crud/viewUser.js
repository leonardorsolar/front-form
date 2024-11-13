document
    .getElementById("viewUserForm")
    .addEventListener("submit", function (event) {
        event.preventDefault()

        const userId = document.getElementById("userId").value

        fetch(`http://localhost:3000/api/usuarios/obterUsuario/${userId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Usuário não encontrado")
                }
                return response.json()
            })
            .then((data) => {
                document.getElementById(
                    "userInfo"
                ).innerText = `Usuário: ${data.name}, Email: ${data.email}`
            })
            .catch((error) => {
                document.getElementById("userInfo").innerText = error.message
            })
    })

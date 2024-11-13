document
    .getElementById("updateUserForm")
    .addEventListener("submit", function (event) {
        event.preventDefault()

        const userId = document.getElementById("userId").value
        const userData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        }

        fetch(`http://localhost:3000/api/usuarios/atualizarUsuario/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao atualizar usuário")
                }
                return response.json()
            })
            .then((data) => {
                document.getElementById(
                    "updateMessage"
                ).innerText = `Usuário atualizado com sucesso! Nome: ${data.name}`
            })
            .catch((error) => {
                document.getElementById("updateMessage").innerText =
                    error.message
            })
    })

document
    .getElementById("deleteUserForm")
    .addEventListener("submit", function (event) {
        event.preventDefault()

        const userId = document.getElementById("userId").value

        fetch(`http://localhost:3000/api/usuarios/removerUsuario/${userId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao remover usuário")
                }
                return response.json()
            })
            .then((data) => {
                document.getElementById(
                    "deleteMessage"
                ).innerText = `Usuário removido com sucesso!`
            })
            .catch((error) => {
                document.getElementById("deleteMessage").innerText =
                    error.message
            })
    })

// script.js

document
    .getElementById("registrationForm")
    .addEventListener("submit", function (event) {
        event.preventDefault() // Previne o comportamento padrão de envio do formulário

        // Obtém os valores dos campos do formulário
        const name = document.getElementById("name").value

        // Cria um objeto com os dados do formulário
        const userData = {
            name: name,
        }

        console.log(userData)

        // Envia os dados para a API
        fetch("http://localhost:3000/api/usuarios/criarUsuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log(response)
                    const result = response.text()
                    console.log(result)
                    return response.json().then((errorData) => {
                        throw new Error(
                            errorData.error || "Erro ao registrar usuário"
                        )
                    })
                }
                return response.json()
            })
            .then((data) => {
                console.log("sucesso")
                console.log(data)
                const userName = data.name
                document.getElementById(
                    "responseMessage"
                ).innerText = `Usuário registrado com sucesso! Bem-vindo, ${userName}.`
            })
            .catch((error) => {
                console.log("Erro:", error)
                document.getElementById("responseMessage").innerText =
                    "Erro ao registrar usuário - front."
            })
    })
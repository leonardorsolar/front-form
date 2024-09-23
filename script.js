// script.js

document
    .getElementById("registrationForm")
    .addEventListener("submit", function (event) {
        event.preventDefault() // Previne o comportamento padrão de envio do formulário

        // Obtém os valores dos campos do formulário
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        // Cria um objeto com os dados do formulário
        const userData = {
            name: name,
            email: email,
            password: password,
        }

        console.log(userData)

        // Envia os dados para a API
        fetch("http://localhost:3000/api/criarUsuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((data) => {
                const userName = data.nome || data.name // Tenta pegar "nome" primeiro, se não existir, pega "name"
                document.getElementById(
                    "responseMessage"
                ).innerText = `Usuário registrado com sucesso! Bem-vindo, ${userName}.`
            })
            .catch((error) => {
                document.getElementById("responseMessage").innerText =
                    "Erro ao registrar usuário."
                console.error("Erro:", error)
            })
    })

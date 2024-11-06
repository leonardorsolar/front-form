// Declara uma função chamada 'usuario' que recebe um parâmetro 'nome'
function usuario(nome) {
    // Retorna o valor do parâmetro 'nome' para quem chamou a função
    return nome
}

// Declara uma variável 'primeiroNome' e atribui a ela o valor "leonardo"
let primeiroNome = "leonardo"

// Chama a função 'usuario', passando 'primeiroNome' como argumento
// O resultado da função (o valor de 'nome' retornado) é armazenado na constante 'output'
const output = usuario(primeiroNome)

// Imprime o valor de 'output' no console (que será "leonardo")
console.log(output)

// Para executar um arquivo JavaScript no terminal do Visual Studio Code (VS Code):

// Modo 1: Quando o VS Code está aberto na mesma pasta do arquivo
// 1. Abra o terminal em VS Code: Vá em "Terminal" > "New Terminal" (ou use o atalho Ctrl + `).
// 2. No terminal, digite o comando abaixo, substituindo "nomeDoArquivo.js" pelo nome do seu arquivo:
//    node nomeDoArquivo.js
//    Exemplo: node 01funcaosimples.js
// Esse comando executará o código JavaScript no Node.js, exibindo o resultado no terminal.

// Modo 2: Quando o VS Code está aberto em uma pasta diferente da pasta do arquivo
// 1. Abra o terminal em VS Code: Vá em "Terminal" > "New Terminal" (ou use o atalho Ctrl + `).
// 2. No terminal, digite o comando abaixo, especificando o caminho completo até o arquivo:
//    node "caminho/completo/do/arquivo/nomeDoArquivo.js"
//    Exemplo: node "C:/Users/SeuUsuario/Projetos/01funcaosimples.js"
// Esse comando executará o código, independente de onde o VS Code foi aberto.

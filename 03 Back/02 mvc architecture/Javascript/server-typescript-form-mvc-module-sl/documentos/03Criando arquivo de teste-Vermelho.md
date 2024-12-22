# cgatGpt: crie um teste vazio, só com comentários, para o typescript com a os comentarios Give(dado que) when(quando acontecer algo) then(então) para inicar um test

```js
describe("Usuario Class", () => {
    test("should demonstrate the Given-When-Then structure", () => {
        // Given: O contexto inicial ou configuração necessária para o teste
        // Aqui você deve criar qualquer configuração necessária para o teste.
        // Exemplo:
        // const usuario = new Usuario('João', 'joao@example.com', 'senha123');
        // When: A ação ou evento que ocorre no teste
        // Aqui você deve realizar a ação ou evento que está sendo testado.
        // Exemplo:
        // const nome = usuario.getNome();
        // Then: O resultado esperado ou efeito da ação
        // Aqui você deve verificar se o resultado é o esperado.
        // Exemplo:
        // expect(nome).toBe('João');
    })
})
```

# Qual classe desejo implementar? Ex.: Usuário

crie o arquivo de teste: Usuario.test.ts

# cgatGpt: crie um teste em typescript para implementar uma classe Usuario utilizando o TDD

```js
describe("Classe usuario", () => {
    test("Deve criar uma usuario com nome, email e senha", () => {
        // Given: O contexto inicial ou configuração necessária para o teste
        // Aqui você deve criar qualquer configuração necessária para o teste.
        const usuario = new Usuario("João", "joao@example.com", "senha123")

        // When: A ação ou evento que ocorre no teste
        // Aqui você deve realizar a ação ou evento que está sendo testado.
        const nome = usuario.getNome()

        // Then: O resultado esperado ou efeito da ação
        // Aqui você deve verificar se o resultado é o esperado.
        expect(nome).toBe("João")
    })
})
```

execute o test do arquivo Usuario.test.ts

npm test tests/Usuario.test.ts

Veja o erro:

tests/Usuario.test.ts:5:29 - error TS2552: Cannot find name 'Usuario'. Did you mean 'usuario'?

# cgatGpt: o que seria ese erro e o que eu devo fazer? tests/Usuario.test.ts:5:29 - error TS2552: Cannot find name 'Usuario'. Did you mean 'usuario'?

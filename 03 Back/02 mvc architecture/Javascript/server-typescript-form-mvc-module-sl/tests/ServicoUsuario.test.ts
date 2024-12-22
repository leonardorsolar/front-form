import { Usuario } from "../src/modelos/Usuario"
import { ServicoUsuario } from "../src/servicos/ServicoUsuario"

describe("Servico para os usuarios", () => {
    test("Deve criar um usuário e retornar os dados do usuário", () => {
        // Given: O contexto inicial ou configuração necessária para o teste
        // Aqui você deve criar qualquer configuração necessária para o teste.
        const servicoUsuario = new ServicoUsuario()
        const usuario = new Usuario("João", "joao@example.com", "senha123")
        // When: A ação ou evento que ocorre no teste
        // Aqui você deve realizar a ação ou evento que está sendo testado.
        const output = servicoUsuario.criarUsuario(usuario)
        // Then: O resultado esperado ou efeito da ação
        // Aqui você deve verificar se o resultado é o esperado.
        expect(output.getNome()).toBe("João")
    })
})

export class Usuario {
    private nome: string
    private email: string
    private senha: string

    constructor(nome: string, email: string, senha: string) {
        this.nome = nome
        this.email = email
        this.senha = senha
    }

    getNome(): string {
        return this.nome
    }

    setNome(nome: string): void {
        this.nome = nome
    }

    getEmail(): string {
        return this.email
    }

    setEmail(email: string): void {
        this.email = email
    }

    getSenha(): string {
        return this.senha
    }

    setSenha(senha: string): void {
        this.senha = senha
    }
}

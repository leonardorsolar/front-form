# Padrão Transaction Script

Essa disposição segue o padrão **Transaction Script** porque as operações de lógica de negócio são tratadas diretamente dentro de métodos do serviço, sem nenhuma estrutura ou modelo de domínio avançado. Cada método realiza uma tarefa isolada (autenticar, validar token e logout), seguindo uma sequência de operações para cada "transação" ou ação específica.

### Características do Transaction Script:

1. **Simples e Direto**: Cada função resolve uma tarefa específica e completa. O foco é executar operações específicas diretamente, sem complexidade adicional.
2. **Organização em Procedimentos**: As operações estão em métodos separados que manipulam diretamente os dados necessários, como consultas e atualizações no banco.
3. **Foco em Fluxo de Transações**: Cada método do serviço representa um "script" para uma transação, facilitando a manutenção e leitura, mas sem abstrair ou encapsular muita lógica de negócios.

# Alternativas ao Transaction Script:

1. **Domain Model (Modelo de Domínio)**:

   - Em vez de métodos que manipulam o banco diretamente, este padrão sugere criar **objetos de domínio** que encapsulam a lógica de negócios.
   - Exemplo: Você teria uma classe `Usuario` que gerencia sua própria autenticação e validação de token. O serviço então chamaria métodos desses objetos para realizar tarefas de negócios, mantendo a lógica dentro do próprio modelo.
   - É útil quando o negócio é mais complexo, com validações e interações entre entidades.

2. **Table Module (Módulo de Tabela)**:

   - Este padrão agrupa a lógica de negócios em torno de uma tabela de banco de dados, com métodos que manipulam diretamente os dados de uma tabela específica.
   - Isso seria como criar um módulo `UsuarioTable` que encapsula todas as operações relacionadas a usuários, e um `LoginTable` para logins, isolando operações específicas por tabela e mantendo o código modular.

Cada padrão oferece vantagens dependendo da complexidade da aplicação e dos requisitos de manutenibilidade e escalabilidade.

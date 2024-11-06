# Configuração da máquina linux:

Para configurar e instalar o C# no Linux e começar a desenvolver uma API básica, vamos seguir alguns passos principais:

### 1. Instale o .NET SDK

No Linux, o C# é geralmente usado dentro do .NET SDK. Para instalar o .NET SDK no seu sistema Linux, siga estes passos:

Você precisa adicionar o repositório da Microsoft e depois instalar o .NET SDK. Vou detalhar o processo para Ubuntu; caso esteja usando outra distribuição, o processo será semelhante, mas com alguns ajustes.

### 1. Adicionar o Repositório da Microsoft

Primeiro, vamos adicionar o repositório da Microsoft ao seu sistema.

1. **Instale pacotes necessários para adicionar o repositório**:

    ```bash
    sudo apt update
    sudo apt install -y wget apt-transport-https
    ```

2. **Baixe e adicione a chave pública da Microsoft**:

    ```bash
    wget https://packages.microsoft.com/config/ubuntu/$(lsb_release -rs)/packages-microsoft-prod.deb
    sudo dpkg -i packages-microsoft-prod.deb
    ```

3. **Atualize os repositórios**:
    ```bash
    sudo apt update
    ```

### 2. Instalar o .NET SDK

Com o repositório da Microsoft adicionado, agora você deve conseguir instalar o .NET SDK:

```bash
sudo apt install dotnet-sdk-7.0
```

### 3. Verifique a Instalação

Para confirmar que o .NET SDK foi instalado corretamente, use o comando:

```bash
dotnet --version
```

Isso deve exibir a versão instalada do .NET SDK.

# Api

### 4. Crie um Projeto de API

Com o SDK do .NET instalado, você pode criar seu primeiro projeto de API em C#.

1. **Crie um diretório para o projeto**:

    ```bash
    mkdir MinhaPrimeiraApi
    cd MinhaPrimeiraApi
    ```

2. **Inicie um novo projeto de API**:
   Use o comando abaixo para criar uma nova API:

    ```bash
    dotnet new webapi -o MinhaPrimeiraApi
    cd MinhaPrimeiraApi
    ```

3. **Execute o projeto**:
   Inicie o servidor para ver se a API está funcionando corretamente:
    ```bash
    dotnet run
    ```
    Por padrão, o .NET inicia a API em `https://localhost:5001` e `http://localhost:5000`. Você pode verificar se está funcionando acessando um desses endereços no navegador ou com `curl`:
    ```bash
    curl https://localhost:5001/weatherforecast
    ```

### 3. Estrutura do Projeto

A estrutura do projeto criado será algo como:

```
MinhaPrimeiraApi/
├── Controllers/
│   └── WeatherForecastController.cs
├── Program.cs
├── Startup.cs (se estiver usando .NET 5 ou versões anteriores)
└── appsettings.json
```

-   **Controllers**: Contém os controladores da API. O arquivo `WeatherForecastController.cs` é um exemplo inicial de endpoint.
-   **Program.cs**: O ponto de entrada do aplicativo.
-   **appsettings.json**: Arquivo de configuração.

### 4. Editando e Adicionando Endpoints

Para criar um endpoint básico, edite o arquivo `WeatherForecastController.cs` no diretório `Controllers` ou adicione um novo controlador. Você pode usar um editor de código como o [VS Code](https://code.visualstudio.com/) para editar seus arquivos C#.

### 5. Compilar e Executar

Após fazer suas alterações, você pode compilar e rodar novamente usando:

```bash
dotnet run
```

Isso deve ser suficiente para você configurar e iniciar o desenvolvimento de uma API básica em C# no Linux!

Para converter esse código em C#, usaremos o .NET Core para criar uma API similar ao código em Express, além de Entity Framework Core para interagir com o banco de dados SQLite. Vamos construir uma estrutura de projeto básica para configurar a API e o banco de dados.

Aqui está um exemplo de como isso poderia ser feito:

1. **Crie um novo projeto ASP.NET Core Web API:**

    ```bash
    dotnet new webapi -n MyApiProject
    ```

2. **Instale o pacote do Entity Framework Core para SQLite:**
   `bash
dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 7.0.10
 `
   obs.:a versão 8.0.10 do pacote Microsoft.EntityFrameworkCore.Sqlite não é compatível com a versão do .NET que você está usando (net7.0)

3. **Estrutura do código no projeto `MyApiProject`:**

    - **Models/User.cs:** Representa o modelo de dados para o usuário.
    - **Data/ApplicationDbContext.cs:** Configura o contexto do banco de dados.
    - **Controllers/UserController.cs:** Configurações das rotas para manipular os usuários.

### Estrutura do Projeto:

#### Models/User.cs

```csharp
using System.ComponentModel.DataAnnotations;

namespace MyApiProject.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
```

#### Data/ApplicationDbContext.cs

```csharp
using Microsoft.EntityFrameworkCore;
using MyApiProject.Models;

namespace MyApiProject.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique(); // Define email como único
        }
    }
}
```

#### Controllers/UserController.cs

```csharp
using Microsoft.AspNetCore.Mvc;
using MyApiProject.Data;
using MyApiProject.Models;
using System.Linq;
using System.Threading.Tasks;

namespace MyApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public IActionResult GetWelcomeMessage()
        {
            return Ok("Olá, Mundo! Bem-vindo ao .NET Core com C#!");
        }

        // POST: api/User
        [HttpPost("criar-usuario")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            if (_context.Users.Any(u => u.Email == user.Email))
            {
                return Conflict(new { error = "E-mail já cadastrado" });
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateUser), new { id = user.Id }, user);
        }
    }
}
```

#### Program.cs (ou ajuste em `Startup.cs` para versões mais antigas do .NET)

Configure o serviço para o Entity Framework e o banco de dados SQLite.

```csharp
using Microsoft.EntityFrameworkCore;
using MyApiProject.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=database.db"));

var app = builder.Build();

app.UseCors();
app.UseSwagger();
app.UseSwaggerUI();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

### Executando a Aplicação

**Crie o banco de dados SQLite executando as migrações:**

Esse erro ocorre porque o `dotnet-ef` (Entity Framework CLI) não está instalado no seu projeto. Para resolver isso, você precisa instalar o pacote `dotnet-ef` como uma ferramenta global ou como uma ferramenta local do projeto.

Aqui estão as instruções para instalar o `dotnet-ef` e rodar o comando novamente:

1. **Instale o `dotnet-ef` como uma ferramenta global:**

    ```bash
    dotnet tool install --global dotnet-ef --version 7.0.10
    ```

    Após instalar o `dotnet-ef` globalmente, você deverá ser capaz de rodar o comando `dotnet ef` diretamente.

    > **Nota**: Após a instalação, você pode precisar reiniciar o terminal para que o comando `dotnet ef` seja reconhecido.

2. **Alternativa: Instale o `dotnet-ef` como uma ferramenta local no projeto:**

    Se preferir instalá-lo localmente, execute o seguinte comando na pasta do projeto:

    ```bash
    dotnet add package Microsoft.EntityFrameworkCore.Tools --version 7.0.10
    ```

    Isso adicionará o `dotnet-ef` como uma dependência de desenvolvimento do projeto, permitindo o uso do comando `dotnet ef` dentro do contexto do projeto.

    Caso dê erros, tente solucionar...

3. **Depois, execute o comando de migração:**

    ```bash
    dotnet ef migrations add InitialCreate
    ```

Se tudo estiver configurado corretamente, isso deve criar a migração inicial do seu banco de dados.

2. **Execute a API:**

    ```bash
    dotnet run
    ```

3. Acesse o endpoint para visualizar o get:
   http://localhost:5199/api/User

4. Acesse o endpoint para criar um usuário: `POST /api/User/criar-usuario`
   http://localhost:5199/api/User/criar-usuario

Sim, existe um arquivo `.gitignore` que você pode usar em seu projeto C# para evitar que certos arquivos e diretórios sejam adicionados ao seu repositório Git. Isso é especialmente útil para manter o repositório limpo e evitar o versionamento de arquivos temporários, de configuração e de dependências que não são necessários.

Aqui está um exemplo de conteúdo que você pode colocar em seu arquivo `.gitignore` para um projeto ASP.NET Core (C#):

```plaintext
# Visual Studio
.vs/
*.sln
*.suo
*.user
*.userprefs
*.sln.docstates

# Build results
[Dd]ebug/
[Rr]elease/
x64/
x86/
[Aa][Rr][Mm]/
[Aa][Rr][Mm]64/
[Aa][Rr][Mm]32/
out/
bin/
obj/
publish/

# NuGet Packages
*.nupkg
*.snupkg
*.nuspec
packages/
*.props
*.targets
**/packages/*

# User-specific files
*.db
*.sublime-workspace
*.sublime-project

# Other files
*.log
*.tlog
*.pdb
*.mdb
*.cache
*.zip
*.tar.gz
*.tgz

# Docker
.dockerignore
Dockerfile
docker-compose*.yml

# JetBrains Rider
.idea/

# Rider
.idea/
*.sln.iml

# Visual Studio Code
.vscode/

# ASP.NET specific
appsettings.Development.json
appsettings.json
```

### Como Adicionar o `.gitignore` ao Seu Repositório

1. **Criar o arquivo**: Na raiz do seu projeto, crie um arquivo chamado `.gitignore`.

2. **Adicionar o conteúdo**: Copie e cole o conteúdo do exemplo acima no seu arquivo `.gitignore`.

3. **Salvar o arquivo**: Salve o arquivo.

4. **Adicionar ao Git**: Agora você pode adicionar e fazer commit do seu arquivo `.gitignore` junto com outros arquivos no seu repositório. Execute os seguintes comandos:

    ```bash
    git add .gitignore
    git add .
    git commit -m "Adiciona arquivo .gitignore"
    ```

### Observações

-   O Git irá ignorar os arquivos e diretórios que estão listados no seu `.gitignore` durante o commit.
-   Se você já adicionou arquivos ao repositório que agora estão listados no `.gitignore`, você precisará removê-los do índice do Git usando `git rm --cached <file>` antes de fazer o commit. O comando `--cached` remove os arquivos do índice, mas os deixa no seu sistema de arquivos.

Com isso, você deverá estar pronto para prosseguir com seus commits sem incluir arquivos desnecessários no repositório. Se precisar de mais ajuda, é só avisar!

Para alterar a porta do servidor em um projeto ASP.NET Core, você precisa modificar o arquivo de configuração do seu projeto. A configuração de porta padrão geralmente é definida no arquivo `launchSettings.json`, que está localizado na pasta `Properties` do seu projeto. Aqui estão os passos para mudar a porta para 3000:

### Passos para Alterar a Porta

1. **Abra o arquivo `launchSettings.json`**: Navegue até a pasta `Properties` no seu projeto e abra o arquivo `launchSettings.json`.

2. **Localize a configuração da URL**: Dentro do arquivo, você verá uma estrutura JSON que contém configurações para diferentes perfis de execução. Procure pela seção que corresponde ao perfil que você está usando (geralmente é o perfil "IIS Express" ou o nome do seu projeto).

    Exemplo de um trecho do arquivo `launchSettings.json`:

    ```json
    {
        "profiles": {
            "MyProjectName": {
                "commandName": "Project",
                "launchBrowser": true,
                "environmentVariables": {
                    "ASPNETCORE_ENVIRONMENT": "Development"
                },
                "applicationUrl": "http://localhost:5000;http://localhost:5001" // <-- Aqui
            }
        }
    }
    ```

3. **Altere a URL da aplicação**: Modifique a `applicationUrl` para incluir a porta 3000. Por exemplo:

    ```json
    "applicationUrl": "http://localhost:3000"
    ```

4. **Salve o arquivo**: Salve suas alterações no `launchSettings.json`.

### Executando o Servidor

Depois de fazer essas alterações, inicie seu servidor ASP.NET Core. Se estiver usando o Visual Studio, você pode simplesmente clicar em "Iniciar" ou pressionar `F5`. Se estiver usando o CLI do .NET, execute:

```bash
dotnet run
```

### Testando a Nova Porta

Agora você deve conseguir acessar seu aplicativo ASP.NET Core em `http://localhost:3000`. Abra um navegador e navegue até essa URL para confirmar que o servidor está respondendo na nova porta.

### Usando a CLI

Se preferir iniciar o aplicativo usando a linha de comando e não quiser alterar o `launchSettings.json`, você também pode especificar a URL ao executar o aplicativo:

```bash
dotnet run --urls "http://localhost:3000"
```

Isso iniciará o servidor na porta 3000, mesmo que a configuração padrão não tenha sido alterada.

### Resumo

-   Modifique o `launchSettings.json` para alterar a porta padrão.
-   Salve e execute seu aplicativo.
-   Acesse `http://localhost:3000` no navegador.

Se precisar de mais ajuda ou esclarecimentos, sinta-se à vontade para perguntar!

Para deletar migrações e refazê-las em um projeto ASP.NET Core que usa Entity Framework Core, você pode seguir os seguintes passos:

### 1. Deletar Migrações

Para deletar as migrações existentes, você pode fazer isso manualmente ou usar a CLI do Entity Framework Core.

#### A. Manualmente

-   Navegue até a pasta onde as migrações estão localizadas. Por padrão, isso é geralmente a pasta `Migrations` no seu projeto.
-   Exclua todos os arquivos de migração (eles têm nomes que começam com a data e hora da migração, seguidos por um nome descritivo).
-   Também é aconselhável excluir a tabela de migrações no seu banco de dados, caso você esteja usando um banco de dados SQLite ou SQL Server. Você pode fazer isso usando uma ferramenta de gerenciamento de banco de dados ou diretamente no console.

#### B. Usando a CLI

1. **Reverter a Migração**: Se você deseja desfazer a última migração aplicada, você pode usar o seguinte comando:

    ```bash
    dotnet ef migrations remove
    ```

    Isso removerá a última migração aplicada.

2. **Repetir o Comando**: Se você tiver várias migrações que deseja remover, você pode executar esse comando várias vezes até que todas as migrações sejam removidas.

### 2. Criar Novas Migrações

Depois de excluir as migrações, você pode criar novas migrações a partir do seu modelo atualizado.

1. **Adicionar Nova Migração**:

    Use o seguinte comando para criar uma nova migração:

    ```bash
    dotnet ef migrations add NomeDaNovaMigracao
    ```

    Substitua `NomeDaNovaMigracao` por um nome descritivo para a migração.

2. **Atualizar o Banco de Dados**:

    Depois de criar a nova migração, você precisa aplicar as alterações no banco de dados. Use o seguinte comando:

    ```bash
    dotnet ef database update
    ```

### 3. Verificar

Após executar esses passos, verifique se as migrações foram aplicadas corretamente e se o banco de dados reflete o estado do seu modelo.

### Exemplo Completo

Aqui está um exemplo completo para referência:

```bash
# 1. Remover a última migração (ou repetir até que todas sejam removidas)
dotnet ef migrations remove

# 2. Criar uma nova migração
dotnet ef migrations add InitialCreate

# 3. Atualizar o banco de dados
dotnet ef database update
```

### Nota

Lembre-se de que, se você estiver em um ambiente de produção, é importante ter cuidado ao remover migrações, pois isso pode causar perda de dados. Em ambientes de desenvolvimento, no entanto, é comum fazer isso para facilitar o desenvolvimento iterativo.

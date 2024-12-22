# Configurações inciais

Para criar o projeto com dados em memória (sem usar um banco de dados físico), podemos usar o banco de dados em memória do Spring Boot, como o **H2**. Abaixo está o passo a passo para configurar esse tipo de projeto.

### 1. Gerar o Projeto no Spring Initializr

Acesse o [Spring Initializr](https://start.spring.io/) e configure o projeto com as seguintes opções:

-   **Project:** Maven Project
-   **Language:** Java
-   **Spring Boot:** 3.0.0 (ou a versão mais recente)
-   **Group:** com.example
-   **Artifact:** demo
-   **Name:** demo
-   **Packaging:** Jar
-   **Java Version:** 17 (ou a mais recente)
-   **Dependencies:**
    -   Spring Web
    -   Spring Data JPA
    -   H2 Database

Clique em **Generate** para baixar o projeto.

### 2. Configurar o Banco de Dados H2

Como estamos usando o H2, ele será um banco de dados em memória. Não há necessidade de criar ou configurar um banco de dados manualmente. No arquivo `src/main/resources/application.properties`, adicione a seguinte configuração:

```properties
spring.application.name=apiJava
server.port=3000
#  H2
# DATASOURCE
spring.datasource.url=jdbc:h2:mem:teste
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.hibernate.ddl-auto=create
spring.jpa.show-sql=true
```

Essa configuração fará com que o banco de dados H2 seja inicializado em memória e será recriado sempre que a aplicação for reiniciada. Além disso, habilitamos o console do H2 para facilitar a visualização dos dados.

Explicando a conexão:

Para melhor entendimento dividi a conexão em 3 categorias, Conexão com o banco, H2 e JPA, todos as configurações são importantes se deseja rodar o seu projeto Java com H2 e Hibernate.
CONEXÃO DO BANCO
Defini a porta de saída do localhost com o server.port = 8081
Driver utilizado para conexão: spring.datasource.driver-class-name=org.h2.Driver
URL de acesso ao banco: spring.datasource.url=jdbc:h2:mem:teste
Usuário de acesso : spring.datasource.username=sa
Senha de acesso: spring.datasource.password=
H2
Habilita o acesso ao console do banco de dados: spring.h2.console.enabled=true
URL na qual o h2 será habilitado: spring.h2.console.path=/h2
JPA
Um recurso do Hibernate que controla o comportamento : spring.jpa.hibernate.ddl-auto=create
Utilizado para imprimir o SQL: spring.jpa.show-sql=true
Definição padrão de conexão JPA com H2: spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

### 3. Criar a Entidade `User`

Agora, crie a entidade `User` que será mapeada no banco de dados em memória. No diretório `src/main/java/com/example/demo/`, crie a classe `User.java`:

```java
package com.example.api;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users") // Use um nome que não seja uma palavra reservada
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}


```

### 4. Criar o Repositório `UserRepository`

Crie o repositório para interagir com o banco de dados em memória. No mesmo diretório, crie a interface `UserRepository.java`:

```java
package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
```

### 5. Criar o Controller

Crie o controlador que vai expor as rotas `GET` e `POST`. No diretório `src/main/java/com/example/demo/`, crie a classe `UserController.java`:

```java
package com.example.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500") // Permitir requisições dessa origem específica
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello World!";
    }

    // @PostMapping("/criar-usuario")
    // public String criarUsuario(@RequestParam String name, @RequestParam String email, @RequestParam String password) {
    //     User user = new User(name, email, password);
    //     userRepository.save(user);
    //     return "Usuário criado com sucesso!";
    // }
    @PostMapping("/criar-usuario")
    public ResponseEntity<?> criarUsuario(@RequestBody User user) {
        try {
            // Validação básica (opcional)
            if (user.getName() == null || user.getEmail() == null || user.getPassword() == null) {
                return ResponseEntity.badRequest().body("Todos os campos são obrigatórios.");
            }

            // Salvando o usuário no banco de dados
            userRepository.save(user);

            // Retornar sucesso com o objeto JSON do usuário criado
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            // Retornar erro em caso de exceção
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar usuário.");
        }
    }
}
```

## Política do cors:

O erro que você está enfrentando é relacionado à política de CORS (Cross-Origin Resource Sharing). Quando você tenta fazer uma requisição de uma origem (`http://127.0.0.1:5500`) para outra (`http://localhost:3000`), o navegador bloqueia essa requisição por questões de segurança, a menos que o servidor autorize explicitamente essa origem.

Aqui está um passo a passo para resolver esse problema configurando o CORS no seu projeto Spring Boot:

### 1. Habilitar CORS no Controlador específico

A maneira mais simples é habilitar o CORS no próprio controlador que está lidando com a requisição. No seu caso, será no `UserController`. Você pode usar a anotação `@CrossOrigin` para permitir requisições de origens específicas.

No seu controlador `UserController.java`, adicione a anotação `@CrossOrigin`:

Essa configuração permite requisições CORS apenas da origem `http://127.0.0.1:5500`, que é de onde você está fazendo a requisição.

### 2. Habilitar CORS globalmente (se aplicável a todas as rotas)

Caso você prefira permitir CORS para todas as rotas e múltiplas origens, você pode configurar o CORS de forma global em uma classe de configuração do Spring Boot.

crie o arquivo WebConfig.java
Crie uma classe de configuração CORS:

```java
package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://127.0.0.1:5500") // Origens permitidas
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Métodos permitidos
                .allowedHeaders("*")  // Cabeçalhos permitidos
                .allowCredentials(true);
    }
}
```

Isso permitirá que todas as requisições feitas a partir de `http://127.0.0.1:5500` sejam aceitas em todo o projeto, para qualquer rota.

### 6. Executar o Projeto

Agora, execute o projeto. Abra o terminal na raiz do projeto e execute o seguinte comando:

```bash
./mvnw spring-boot:run
```

### 7. Testar as Rotas

Para testar a rota `GET /hello`, você pode usar o navegador

Vá ao navegador e cole> http://localhost:3000/hello

Isso retornará:

```bash
Hello World!
```

ou utilize o `curl` no terminal:

```bash
curl http://localhost:3000/hello
```

Para testar a criação de usuário na rota `POST /criar-usuario`, use o seguinte comando `curl` ou o Postman:

```bash
curl -X POST "http://localhost:3000/criar-usuario?name=John&email=john@example.com&password=12345"
```

Isso retornará:

```bash
Usuário criado com sucesso!
```

### Teste

Após reiniciar a aplicação, você poderá acessar as rotas normalmente, mas agora pela URL `http://localhost:3000`:

-   `GET /hello` → `http://localhost:3000/hello`
-   `POST /criar-usuario` → `http://localhost:3000/criar-usuario`

### 8. Acessar o Console do H2

Para acessar o Console do H2 em um projeto Maven que utiliza a dependência do H2, siga as etapas detalhadas abaixo:

Após a aplicação ser iniciada, abra um navegador da web e acesse o seguinte URL:

```
http://localhost:3000/h2-console
```

### 5. Configurar a Conexão no Console

Na página de login do console do H2, você precisará fornecer as seguintes informações:

-   **JDBC URL:** Para um banco de dados H2 em memória, use:

    ```
    jdbc:h2:mem:teste
    ```

-   **Username:** O padrão é `sa`.
-   **Password:** O padrão geralmente é deixado em branco (ou conforme configurado).

### 6. Conectar e Executar Consultas

Depois de preencher as informações de conexão, clique no botão **Connect**. Você estará conectado ao banco de dados H2 e poderá executar consultas SQL, visualizar tabelas e gerenciar os dados.

### Exemplo de Consultas

Uma vez conectado, você pode executar consultas como:

aidicone na caixa de diáologo em branco:
SELECT \* FROM users;
e clique RUN

comandos principais:

```sql
SELECT * FROM users;
```

ou inserir tabelas novas

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

INSERT INTO users (name, email, password) VALUES ('John Doe', 'john@example.com', 'password123');

SELECT * FROM users;
```

### Dicas Finais

-   **Ambiente de Desenvolvimento:** O H2 é excelente para desenvolvimento local, mas não deve ser usado em produção sem as devidas considerações de segurança e persistência.
-   **Persistência:** Para manter os dados após a parada da aplicação, você deve configurar um banco de dados H2 persistente.
-   **Documentação:** Consulte a [documentação do H2](http://www.h2database.com/html/main.html) para mais informações sobre recursos e opções.

Se você tiver mais dúvidas ou precisar de ajuda com algo específico, sinta-se à vontade para perguntar!

### 4. Reiniciar a aplicação Spring Boot

Depois de aplicar essas alterações, reinicie sua aplicação Spring Boot e teste novamente a requisição para ver se o problema foi resolvido.

Agora, ao realizar a requisição de `http://127.0.0.1:5500` para `http://localhost:3000`, o erro de CORS deverá ser resolvido.

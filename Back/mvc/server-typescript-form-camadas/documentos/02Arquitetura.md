# cgatGpt: Em um projeto typescript, quais seriam as pastas e os arquivos de um projeto na arquitura mvc da funcionalidade criar usuários?

```lua
meu-projeto
│
├── src
│   ├── controllers
│   │   └── userController.ts
│   │
│   ├── models
│   │   └── userModel.ts
│   │
│   ├── views
│   │   └── userView.ts
│   │
│   ├── routes
│   │   └── userRoutes.ts
│   │
│   ├── services
│   │   └── userService.ts
│   │
│   ├── database
│   │   └── db.ts
│   │
│   ├── utils
│   │   └── helpers.ts
│   │
│   └── index.ts
│
├── tests
│   ├── controllers
│   │   └── userController.test.ts
│   │
│   ├── services
│   │   └── userService.test.ts
│   │
│   ├── models
│   │   └── userModel.test.ts
│   │
│   └── routes
│       └── userRoutes.test.ts
│
├── .eslintrc.json
├── .prettierrc
├── jest.config.js
├── tsconfig.json
├── package.json
└── README.md
```

Aprofundando:

# pesquisar no google: arquitetura mvc router

# pesquisar no google: arquitetura mvc model

# cgatGpt:: qual a responsabilidade de cada classe no mvc

# cgatGpt: crie o código em typescript a seguir de forma mais simples possível e indique as dependências que devem ser instaladas.

```lua
meu-projeto
│
├── src
│ ├── controladora
│ │ └── ControladorUsuario.ts
│ │
│ ├── modelos
│ │ └── Usuario.ts
│ │
│ ├── visualizacao
│ │ └── VisualizacaoUsuario.ts
│ │
│ ├── rotas
│ │ └── UsuarioRotas.ts
│ │
│ ├── servicos
│ │ └── ServicoUsuario.ts
│ │
│ ├── bancodados
│ │ └── db.ts
│ │
│ ├── utilitarios
│ │ └── helpers.ts
│ │
│ └── index.ts
│
├── tests
│ ├── controladora
│ │ └── ControladorUsuario.test.ts
│ │
│ ├── servicos
│ │ └── ServicoUsuario.test.ts
│ │
│ ├── modelos
│ │ └── UserModel.test.ts
│ │
│ └── rotas
│ └── UserRoutes.test.ts
│
├── .eslintrc.json
├── .prettierrc
├── jest.config.js
├── tsconfig.json
├── package.json
└── README.md
```

Outra forma:

# cgatGpt: crie o arquivo index.ts com typescript e a biblioteca express, crie uma tora get para visualização e instale as dependencias

# Criando o servidor web

npm install express npm install --save-dev @types/express

Código: src/index.ts

typescript

import express from 'express'; import userRoutes from './rotas/UserRoutes';

const app = express(); app.use(express.json());

app.use('/api', userRoutes);

const PORT = 3000; app.listen(PORT, () => { console.log(`Servidor rodando na porta ${PORT}`); });

# cgatGpt: instale ts-node-dev com TypeScript e configure-o para reiniciar automaticamente quando os arquivos forem alterados.

npm install --save-dev nodemon

nodemon.json

{ "watch": ["src"], "ext": "ts", "ignore": ["src/**/*.test.ts"], "exec": "ts-node src/index.ts" }

Atualizar Scripts no package.json

"scripts": { "start": "nodemon", "build": "tsc", "start:prod": "node dist/index.js" }

# Criando a rota web

```js
import { Router } from 'express';
import { ServicoUsuario } from '../servicos/ServicoUsuario';
import { ControladorUsuario } from '../controladora/ControladorUsuario';

const rotas = Router();
const servicoUsuario = new ServicoUsuario();
const controladorUsuario = new ControladorUsuario(servicoUsuario);

rotas.post('/usuarios', controladorUsuario.criarUsuario.bind(controladorUsuario));

export default rotas;
```

Instalação do supertest para a ControladorUsuario.test com typescript

npm install --save-dev supertest @types/supertest

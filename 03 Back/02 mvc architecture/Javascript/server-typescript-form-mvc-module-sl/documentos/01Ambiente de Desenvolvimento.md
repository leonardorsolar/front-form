# cgatGpt: crie um projeto typescript node no vscode onde teremos o testes com o jest e a ferramenta ts-node

# Instalação do Node.js

Vamos começar inicializando o nosso projeto no Node.js com o comando npm init -y.

Caso você não tenha o Node.js instalado, basta entrar em https://nodejs.org, baixar e instalar a versão LTS. Pode ser interessante utilizar algum gerenciador de versões como o nvm, para mais informações acesse https://github.com/nvm-sh/nvm.

Eu sempre recomendo que você utilize a última versão estável, estou utilizando a versão 16. Fique atento caso esteja utilizando uma versão muito antiga.

# Inicialização do Projeto

Após inicializar o projeto, o arquivo package.json será criado.

npm init -y

Lá vão ficar as dependências e também os scripts de execução tanto do TypeScript quanto dos testes.

# Instalação e Inicialização do TypeScript

Instale o TypeScript utilizando o comando abaixo, aproveitando para instalar outras dependências:

npm install typescript jest @types/jest ts-node ts-jest

Depois disso, crie o arquivo tsconfig.json:

npx tsc --init

Com isso, o arquivo tsconfig.js deve ter sido criado e estamos prontos para começar.

# Configuração do Jest

Configure o Jest utilizando o comando abaixo:

npx ts-jest config:init

# Configuração do TypeScript

O TypeScript tem um compilador que faz a conversão do código para JavaScript. Por conta disso, precisamos definir alguns poucos parâmetros:

tsconfig.json

{
"compilerOptions": {
"incremental": true,
"target": "es2016",
"module": "commonjs",
"outDir": "./dist",
"strict": true,
"esModuleInterop": true
},
"include": [
"src",
"test"
]
}

# Adicionar Scripts de Teste e de execução od tsnode no package.json

"scripts": {
"test": "jest",
"start": "ts-node src/index.ts",
"build": "tsc"
}

Fique totalmente à vontade para configurar de forma diferente, conforme as preferências que você já esteja acostumado.

# Testando se tudo deu certo

# Escrever um Teste de Exemplo

Crie um diretório src e um arquivo src/sum.ts com o seguinte conteúdo:

export function sum(a: number, b: number): number {
return a + b;
}

Crie um diretório tests e um arquivo tests/sum.test.ts com o seguinte conteúdo:
import { sum } from '../src/sum';

test('soma de 1 e 2 deve ser 3', () => {
expect(sum(1, 2)).toBe(3);
});

8. Executar os Testes
   Execute o comando de teste que você configurou:
   npm test

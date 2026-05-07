# ECMAScript 6 — Apostila de Estudo

**Disciplina:** Desenvolvimento Frontend
**Curso:** Análise e Desenvolvimento de Sistemas
**Nível:** Intermediário

---

# 0. Introdução ao JavaScript

Antes de ver as novidades do ECMAScript 6, é essencial entender o que é o JavaScript, como ele funciona e por que se tornou a linguagem mais utilizada no desenvolvimento web moderno.

## 0.1. O que é JavaScript?

JavaScript é uma linguagem de programação interpretada, de alto nível e dinamicamente tipada, criada originalmente para rodar no navegador e dar interatividade às páginas web. Hoje, com o Node.js, ela também é amplamente usada no lado do servidor.

| **Característica** | **Descrição** |
| --- | --- |
| **Criada em** | 1995, por Brendan Eich, na Netscape — em apenas 10 dias |
| **Paradigma** | Multi-paradigma: imperativa, orientada a objetos, funcional |
| **Tipagem** | Dinâmica e fraca — o tipo da variável pode mudar em tempo de execução |
| **Execução** | Interpretada — o browser ou o Node.js executa o código diretamente |
| **Ambiente** | Browser (front-end) e servidor via Node.js (back-end) |
| **Padronização** | ECMAScript (ECMA-262) — define as regras que o JS deve seguir |

> 💡 **Dica:** Não confunda JavaScript com Java. São linguagens completamente diferentes — o nome foi uma jogada de marketing da Netscape para aproveitar a popularidade do Java em 1995. A semelhança é apenas no nome.

## 0.2. Para que serve o JavaScript?

O JavaScript é a única linguagem de programação executada nativamente pelo navegador. Isso o torna indispensável para o desenvolvimento front-end — e, com o Node.js, também competitivo no back-end.
- Interatividade no browser — responder a cliques, teclas, toques; mostrar e esconder elementos; validar formulários em tempo real.
- Manipulação do DOM — modificar a estrutura HTML e os estilos CSS da página sem recarregá-la (ex: atualizar um carrinho de compras dinamicamente).
- Comunicação com servidores — buscar dados de APIs via fetch/XMLHttpRequest sem sair da página (AJAX/SPA).
- Aplicações completas no browser — frameworks como React, Vue e Angular permitem construir interfaces complexas inteiramente em JavaScript.
- Servidor e linha de comando — com Node.js, o mesmo JavaScript roda fora do browser: APIs REST, scripts de automação, ferramentas de build.
- Aplicativos mobile e desktop — React Native (mobile) e Electron (desktop) levam o JavaScript para além da web.

## 0.3. Como o JavaScript funciona no browser?

Quando o browser carrega uma página HTML com um arquivo .js, ele entrega o código ao motor JavaScript (engine) para execução. O motor mais famoso é o V8, usado no Google Chrome e no Node.js.

```html
<!-- 1. HTML referencia o arquivo JS -->
<script src="js/main.js"></script>
```

```javascript
// 2. O browser carrega e executa main.js
// 3. O JS pode então manipular o DOM
document.getElementById("btnTema")
  .addEventListener("click", function() {
    document.body.classList.toggle("dark");
  });
```

O JavaScript é single-threaded — executa uma operação por vez — mas usa um mecanismo chamado Event Loop para lidar com operações assíncronas (como buscar dados de uma API) sem bloquear a interface do usuário.

> 💡 **Dica:** O projeto que você está desenvolvendo usa JavaScript exatamente assim: o main.js escuta o clique no botão de tema e altera o atributo data-bs-theme do HTML — uma manipulação de DOM clássica, sem recarregar a página.

## 0.4. Tipos de dados básicos

JavaScript possui tipos primitivos e tipos por referência. Entender essa distinção é fundamental para evitar bugs sutis.

```javascript
// ── Tipos primitivos ─────────────────────────────────────────────
let nome    = "Ana";           // string
let idade   = 25;              // number (inteiros e decimais)
let ativo   = true;            // boolean
let vazio   = null;            // null — ausência intencional de valor
let indefinido;                // undefined — variável não inicializada
let id      = Symbol('id');    // symbol — valor único e imutável (ES6)

// ── Tipos por referência ──────────────────────────────────────────
let pessoa  = { nome: 'Ana', idade: 25 };  // object
let frutas  = ['maçã', 'banana', 'uva'];   // array (tipo especial de object)
let somar   = function(a, b) { return a + b; }; // function

// Verificar o tipo com typeof
console.log(typeof nome);    // "string"
console.log(typeof idade);   // "number"
console.log(typeof ativo);   // "boolean"
console.log(typeof pessoa);  // "object"
console.log(typeof frutas);  // "object" (arrays são objects!)

0.5. Funções — o coração do JavaScript
Funções são blocos de código reutilizáveis. No JavaScript, funções podem ser atribuídas a variáveis, passadas como parâmetros e retornadas de outras funções.
```

## 0.5. Funções — o coração do JavaScript

Funções são blocos de código reutilizáveis. No JavaScript, funções podem ser atribuídas a variáveis, passadas como parâmetros e retornadas de outras funções.

```javascript
// Declaração de função (function declaration)
function saudacao(nome) {
  return "Olá, " + nome + "!";
}

// Expressão de função (function expression)
const despedida = function(nome) {
  return "Tchau, " + nome + "!";
};

// Arrow function — sintaxe ES6 (veremos em detalhes no capítulo 5)
const bemVindo = (nome) => `Bem-vindo, ${nome}!`;

// Funções como parâmetros (callback)
const nomes = ['Ana', 'Carlos', 'Maria'];
nomes.forEach(function(nome) {
  console.log(saudacao(nome));
});

0.6. Escopo — onde as variáveis vivem
Escopo define onde uma variável é acessível no código. No JavaScript existem três níveis: global, de função e de bloco. Entender o escopo é essencial para compreender um dos principais problemas que o ES6 veio resolver.
```

## 0.6. Escopo — onde as variáveis vivem

Escopo define onde uma variável é acessível no código. No JavaScript existem três níveis: global, de função e de bloco. Entender o escopo é essencial para compreender um dos principais problemas que o ES6 veio resolver.

```javascript
// Escopo global — acessível em qualquer lugar
let mensagemGlobal = "Olá, mundo!";

// Escopo de função — só acessível dentro da função
function calcular() {
  let resultado = 42;          // só existe dentro de calcular()
  console.log(resultado);      // OK
}
// console.log(resultado);     // ERRO — resultado não existe aqui

// Escopo de bloco (let e const — ES6)
if (true) {
  let bloqueado = "só aqui";
  console.log(bloqueado);      // OK
}
// console.log(bloqueado);     // ERRO com let/const
// console.log(bloqueado);     // FUNCIONA com var — o problema do var!
```

> ⚠️ **Atenção:** O comportamento do var com escopo é justamente um dos principais problemas que o ES6 veio corrigir com let e const. Veremos isso em detalhes no Capítulo 4. Por enquanto, prefira sempre let ou const no lugar de var.

## 0.7. JavaScript no contexto do projeto Tech Store

O projeto Tech Store que você está desenvolvendo já utiliza JavaScript em vários pontos. Antes de avançar para o ES6, vale identificar esses usos para reconhecê-los nos exemplos que virão:

| **Característica** | **Descrição** |
| --- | --- |
| **localStorage** | Salva o tema escolhido (dark/light) no browser para persistir entre visitas |
| **addEventListener** | Escuta o clique no botão de tema e aciona a troca |
| **setAttribute** | Altera o atributo data-bs-theme no HTML para mudar o tema |
| **fetch + .then()** | Busca os dados de endereço na API do ViaCEP ao informar o CEP |
| **getElementById** | Seleciona elementos do formulário para preencher automaticamente |
| **document.querySelector** | Seleciona elementos da página para manipulação |

> 💡 **Dica:** Todo esse código já está escrito em JavaScript ES5/ES6 no seu main.js. Ao longo desta apostila, você entenderá exatamente por que cada linha foi escrita dessa forma — e como o ES6 tornou esse código mais limpo e legível do que seria em JavaScript pré-2015.

# 1. O que é ECMAScript?

ECMAScript é uma especificação de linguagem de script padronizada pela Ecma International por meio do documento ECMA-262. Em termos simples, é o padrão que define como o JavaScript deve funcionar. O JavaScript é a implementação mais popular do ECMAScript, mas não é a única — ActionScript e JScript também foram implementações históricas.

| **Recurso** | **Descrição** |
| --- | --- |
| **ECMAScript** | A especificação formal, o 'contrato' que define a linguagem |
| **JavaScript** | A implementação da especificação nos navegadores e no Node.js |
| **V8 / SpiderMonkey** | Engines (motores) que executam o JavaScript nos navegadores |
| **ECMA-262** | O documento oficial que descreve o padrão ECMAScript |
| **TC39** | Comitê técnico da Ecma responsável por evoluir a especificação |

> 💡 **Dica:** Pense no ECMAScript como a 'constituição' e no JavaScript como a 'lei em prática'. O TC39 é o 'congresso' que aprova novas emendas (features).

# 2. Histórico e Evolução do JavaScript

O JavaScript foi criado por Brendan Eich em apenas 10 dias no ano de 1995, enquanto trabalhava na Netscape. Originalmente chamado de Mocha, depois LiveScript e finalmente JavaScript, foi submetido à Ecma para padronização em 1996.

| **Versão** | **Ano** | **Principais Novidades** |
| --- | --- | --- |

```javascript
// Problema clássico com var
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Imprime 3, 3, 3 — não 0, 1, 2!
  }, 100);
}

// var ignora o escopo de bloco
if (true) {
  var nome = 'João';
}
console.log(nome); // 'João' — acessível fora do bloco!
 
4.2. Usando let
```

```javascript
// let tem escopo de bloco
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Imprime 0, 1, 2 corretamente!
  }, 100);
}

// let respeita o escopo de bloco
if (true) {
  let cidade = 'São Paulo';
}
console.log(cidade); // ReferenceError: cidade is not defined
 
4.3. Usando const
```

```javascript
// const para valores que não devem ser reatribuídos
const PI = 3.14159;
PI = 3; // TypeError: Assignment to constant variable.

// Objetos com const: a referência é constante, não o conteúdo
const pessoa = { nome: 'Ana', idade: 25 };
pessoa.idade = 26;    // Isso funciona!
pessoa = {};          // TypeError: não pode reatribuir

// Arrays com const funcionam da mesma forma
const frutas = ['maçã', 'banana'];
frutas.push('laranja'); // Funciona!
frutas = [];            // TypeError!
```

```javascript
// Função tradicional
function somar(a, b) {
  return a + b;
}

// Arrow function equivalente
const somar = (a, b) => a + b;

// Com um único parâmetro: parênteses opcionais
const dobrar = n => n * 2;

// Sem parâmetros: parênteses obrigatórios
const saudar = () => 'Olá, mundo!';

// Com corpo de bloco (return explícito necessário)
const calcularArea = (base, altura) => {
  const area = base * altura / 2;
  return area;
};

// Retornando objeto literal: envolva com parênteses
const criarPessoa = (nome, idade) => ({ nome, idade });
 
5.2. Diferença do this
```

```javascript
// Problema com função tradicional
function Relogio() {
  this.segundos = 0;
  setInterval(function() {
    this.segundos++; // this aqui é window/undefined!
    console.log(this.segundos); // NaN
  }, 1000);
}

// Solução com arrow function
function Relogio() {
  this.segundos = 0;
  setInterval(() => {
    this.segundos++; // this herda do Relogio corretamente
    console.log(this.segundos); // 1, 2, 3...
  }, 1000);
}
```

```javascript
const numeros = [1, 2, 3, 4, 5];

// map — transforma cada elemento
const dobrados = numeros.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter — filtra elementos
const pares = numeros.filter(n => n % 2 === 0);
// [2, 4]

// reduce — reduz a um único valor
const soma = numeros.reduce((acc, n) => acc + n, 0);
// 15

// Encadeamento funcional
const resultado = numeros
  .filter(n => n > 2)
  .map(n => n * 3)
  .reduce((acc, n) => acc + n, 0);
// (3+4+5) * 3 = 36

6. Template Literals
Template Literals (ou Template Strings) são strings delimitadas por crases (`) que permitem interpolação de expressões, strings multilinha e até tags personalizadas. Eles substituem a concatenação com +.
```

```javascript
const nome = 'Maria';
const idade = 28;

// Antes do ES6 — concatenação
const msg1 = 'Olá, ' + nome + '! Você tem ' + idade + ' anos.';

// Com template literal — interpolação
const msg2 = `Olá, ${nome}! Você tem ${idade} anos.`;

// Expressões dentro de ${}
const msg3 = `Em 10 anos, você terá ${idade + 10} anos.`;

// String multilinha (sem \n)
const html = `
  <div class='card'>
    <h2>${nome}</h2>
    <p>Idade: ${idade}</p>
  </div>
`;

// Chamada de função dentro da interpolação
const saudar = nome => nome.toUpperCase();
console.log(`Bem-vindo, ${saudar(nome)}!`);
```

```javascript
const usuario = {
  nome: 'Carlos',
  idade: 32,
  email: 'carlos@email.com',
  endereco: {
    cidade: 'Curitiba',
    estado: 'PR'
  }
};

// Forma antiga
const nome = usuario.nome;
const idade = usuario.idade;

// Desestruturação
const { nome, idade, email } = usuario;

// Com renomeação
const { nome: nomeUsuario, email: contato } = usuario;

// Com valor padrão
const { nome, telefone = 'não informado' } = usuario;

// Desestruturação aninhada
const { nome, endereco: { cidade, estado } } = usuario;
console.log(cidade); // 'Curitiba'

// Em parâmetros de função
function exibirUsuario({ nome, idade, email = 'sem email' }) {
  console.log(`${nome}, ${idade} anos — ${email}`);
}
exibirUsuario(usuario);
 
7.2. Desestruturação de Arrays
```

- ES2017 | 2017 | async/await, Object.entries/values, String.padStart

```javascript
const coordenadas = [40.7128, -74.0060, 10];

// Desestruturação por posição
const [latitude, longitude, altitude] = coordenadas;

// Ignorando elementos
const [lat, , alt] = coordenadas;

// Com valor padrão
const [x = 0, y = 0, z = 0] = [5, 10];
// z = 0

// Troca de variáveis sem variável temporária!
let a = 1, b = 2;
[a, b] = [b, a];
// a = 2, b = 1

// Pegando somente os primeiros elementos e usando rest para os demais
const [primeiro, segundo, ...restantes] = [1, 2, 3, 4, 5];
// primeiro = 1, segundo = 2, restantes = [3, 4, 5]

// Retorno múltiplo de função
function minMax(arr) {
  return [Math.min(...arr), Math.max(...arr)];
}
const [min, max] = minMax([3, 1, 7, 2, 9]);

8. Parâmetros Padrão (Default Parameters)
No ES5, para definir valores padrão era necessário usar verificações manuais dentro da função. O ES6 permite definir valores padrão diretamente na assinatura da função.
```

```javascript
// ES5 — forma manual
function criarUsuario(nome, role, ativo) {
  role = role || 'visitante';

  ativo = ativo !== undefined ? ativo : true;
  // Problema: role = '' ou role = 0 também usaria o padrão!
}

// ES6 — parâmetros padrão
function criarUsuario(nome, role = 'visitante', ativo = true) {
  return { nome, role, ativo };
}

criarUsuario('Ana');
// { nome: 'Ana', role: 'visitante', ativo: true }

criarUsuario('Bob', 'admin', false);
// { nome: 'Bob', role: 'admin', ativo: false }

// Expressões como valor padrão
const agora = () => new Date().toISOString();
function registrar(evento, data = agora()) {
  console.log(`${evento} em ${data}`);
}

// Referência a parâmetros anteriores
function retangulo(largura, altura = largura) {
  return largura * altura;
}
retangulo(5);    // 25 (quadrado)
retangulo(4, 6); // 24
9. Operador Rest e Spread
Os operadores Rest (...) e Spread (...) usam a mesma sintaxe mas têm propósitos opostos. O Rest coleta múltiplos elementos em um array; o Spread expande um array (ou objeto) em elementos individuais.
9.1. Rest Parameters
```

> ⚠️ **Atenção:** A partir do ES6 (2015), a Ecma adotou um ciclo de lançamentos anuais. Por isso, as versões passaram a se chamar ES2015, ES2016, ES2017 etc. O nome 'ES6' e 'ES2015' referem-se ao mesmo padrão.

# 3. Por que o ES6 foi um marco?

O ES6 (ECMAScript 2015) foi a maior atualização da linguagem desde sua criação. Foram quase 6 anos de desenvolvimento (2009–2015) para resolver problemas históricos do JavaScript e adicionar recursos que tornaram a linguagem competitiva com Java, Python e C#.
- Resolvia limitações graves do var (escopo de função, hoisting [içamento de variáveis para o top do arquivo] inesperado)
- Introduziu programação orientada a objetos com sintaxe de classes
- Habilitou programação modular nativa (import/export)
- Trouxe programação assíncrona moderna com Promises
- Adicionou recursos funcionais: arrow functions, destructuring, spread
- Fundamentou todos os frameworks modernos: React, Angular, Vue

> **Compatibilidade com Navegadores**

> O ES6 não era suportado por todos os navegadores em 2015. A solução foi o Babel: um transpilador que converte ES6+ em ES5. Hoje (2024), mais de 98% dos navegadores modernos suportam ES6 nativamente. O Node.js suporta ES6+ completamente a partir da versão 6.x.

# 4. Let e Const — Declaração de Variáveis

Antes do ES6 existia apenas o var para declarar variáveis. O var tem escopo de função (ou global), o que frequentemente causava bugs difíceis de encontrar. O ES6 introduziu let e const com escopo de bloco.

## 4.1. O Problema do var

```javascript
// Coleta argumentos extras em um array real
function somar(primeiro, segundo, ...restantes) {
  const subtotal = primeiro + segundo;
  return subtotal + restantes.reduce((acc, n) => acc + n, 0);
}
somar(1, 2, 3, 4, 5); // 15

9.2. Spread Operator
```

## 4.2. Usando let

```javascript
// Expandindo arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const unidos = [...arr1, ...arr2]; // [1,2,3,4,5,6]

// Cópia rasa de array
const copia = [...arr1];

// Passando array como argumentos
const numeros = [3, 1, 7, 2, 9];
const maximo = Math.max(...numeros); // 9

// Expandindo objetos (ES2018, mas comumente ensinado junto)
const base = { x: 1, y: 2 };
const extendido = { ...base, z: 3, x: 10 }; // x sobrescrito
// { x: 10, y: 2, z: 3 }

// Merge e atualização de objetos
const config = { tema: 'dark', idioma: 'pt-BR' };
const novaConfig = { ...config, tema: 'light' };
// { tema: 'light', idioma: 'pt-BR' }

// Convertendo string em array de caracteres
const letras = [... 'hello']; // ['h','e','l','l','o']
```

## 4.3. Usando const

```javascript
// arquivo: matematica.js

// Named exports (exportações nomeadas)
export const PI = 3.14159;

export function somar(a, b) {
  return a + b;
}

export const subtrair = (a, b) => a - b;

// Export em bloco
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => a / b;
export { multiplicar, dividir };

// Export com renomeação
export { multiplicar as mult, dividir as div };

// Default export (apenas um por arquivo)
export default function calcular(op, a, b) {
  const ops = { '+': somar, '-': subtrair };
  return ops[op](a, b);
}
10.2. Importando
```

| **Característica** | **var** | **let / const** |
| --- | --- | --- |

```javascript
// Importando named exports
import { PI, somar, subtrair } from './matematica.js';

// Importando com renomeação
import { somar as add, PI as pi } from './matematica.js';

// Importando tudo em um namespace
import * as Matematica from './matematica.js';
Matematica.somar(2, 3); // 5
Matematica.PI;          // 3.14159

// Importando o default export
import calcular from './matematica.js';

// Misturando default e named
import calcular, { PI, somar } from './matematica.js';

// Import dinâmico (carregamento lazy)
const modulo = await import('./matematica.js');
modulo.somar(1, 2);
```

```javascript
// Definição de classe
class Animal {
  // Propriedade de classe (ES2022, mas comum em projetos modernos)
  #nome; // Propriedade privada

  constructor(nome, especie) {
    this.#nome = nome;
    this.especie = especie;
    this.vivo = true;
  }

  // Getter
  get nome() {
    return this.#nome;
  }

  // Setter
  set nome(valor) {
    if (typeof valor !== 'string') throw new Error('Nome inválido');
    this.#nome = valor;
  }

  // Método de instância
  falar() {
    return `${this.#nome} faz um som.`;
  }

  // Método estático
  static criarSelvagem(nome) {
    return new Animal(nome, 'selvagem');
  }

  toString() {
    return `[Animal: ${this.#nome} (${this.especie})]`;
  }
}

// Herança com extends
class Cachorro extends Animal {
  constructor(nome, raca) {
    super(nome, 'canino'); // Chama o construtor pai
    this.raca = raca;
  }

  // Sobrescrita de método (override)
  falar() {
    return `${this.nome} late: Au au!`;
  }

  // Usando método do pai
  falarDuplo() {
    return super.falar() + ' ' + this.falar();
  }
}

const rex = new Cachorro('Rex', 'Labrador');
console.log(rex.falar());    // Rex late: Au au!
console.log(rex instanceof Cachorro); // true
console.log(rex instanceof Animal);   // true

const leao = Animal.criarSelvagem('Simba');

12. Promises
Antes das Promises, o código assíncrono era gerenciado com callbacks, resultando no temido 'Callback Hell'. As Promises são objetos que representam a eventual conclusão (ou falha) de uma operação assíncrona.
12.1. Estados de uma Promise
```

```javascript
// Criando uma Promise
function buscarUsuario(id) {
  return new Promise((resolve, reject) => {
    // Simulando requisição HTTP
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, nome: 'Ana', email: 'ana@email.com' });
      } else {
        reject(new Error('ID inválido'));
      }
    }, 1000);
  });
}

// Consumindo com .then().catch()
buscarUsuario(1)
  .then(usuario => {
    console.log('Usuário:', usuario.nome);
    return buscarPosts(usuario.id); // Encadeamento
  })
  .then(posts => console.log('Posts:', posts))
  .catch(erro => console.error('Erro:', erro.message))
  .finally(() => console.log('Requisição finalizada'));

// Promise.all — espera todas resolverem
Promise.all([
  buscarUsuario(1),
  buscarUsuario(2),
  buscarUsuario(3)
])
.then(([user1, user2, user3]) => console.log(user1, user2, user3))
.catch(err => console.error('Uma falhou:', err));

// Promise.allSettled — aguarda todas, sem rejeição
Promise.allSettled([p1, p2, p3])
  .then(resultados => resultados.forEach(r =>
    r.status === 'fulfilled'
      ? console.log('OK:', r.value)
      : console.log('Falhou:', r.reason)
  ));

// Promise.race — retorna a primeira que resolver/rejeitar
Promise.race([p1, p2]).then(resultado => console.log(resultado));
 
12.3. Async / Await (ES2017 — baseado em Promises)
```

```javascript
// async/await torna código assíncrono parecido com síncrono
async function carregarDados(id) {
  try {
    const usuario = await buscarUsuario(id);
    const posts = await buscarPosts(usuario.id);
    const comentarios = await buscarComentarios(posts[0].id);
    return { usuario, posts, comentarios };
  } catch (erro) {
    console.error('Falha ao carregar:', erro.message);
    throw erro; // Re-lança para quem chamou tratar
  } finally {
    console.log('Carregamento concluído');
  }
}

// Paralelo com async/await
async function carregarParalelo(ids) {
  const promises = ids.map(id => buscarUsuario(id));
  const usuarios = await Promise.all(promises);
  return usuarios;
}

13. Iteradores e Generators
O ES6 introduziu o protocolo de iteração, que padroniza como objetos são percorridos. Qualquer objeto que implemente o método Symbol.iterator é iterável e pode ser usado com for...of, spread e desestruturação.
13.1. for...of
```

> 💡 **Dica:** Regra de ouro: use const por padrão. Só use let quando souber que o valor vai mudar. Nunca use var em código novo.

# 5. Arrow Functions

As Arrow Functions (funções seta) são uma sintaxe mais curta para escrever funções. Além da sintaxe enxuta, elas têm uma diferença fundamental: não criam seu próprio this, herdando o this do contexto onde foram definidas.

## 5.1. Sintaxe

```javascript
// Funciona com qualquer iterável
const frutas = ['maçã', 'banana', 'laranja'];
for (const fruta of frutas) {
  console.log(fruta);
}

// Strings também são iteráveis
for (const char of 'ES6') {
  console.log(char); // E, S, 6
}

// Map e Set também
const mapa = new Map([['a', 1], ['b', 2]]);
for (const [chave, valor] of mapa) {
  console.log(`${chave}: ${valor}`);
}

// Diferença de for...in (que itera chaves/índices)
for (const indice in frutas) {   // 0, 1, 2
  console.log(indice);
}
for (const fruta of frutas) {    // maçã, banana, laranja
  console.log(fruta);
}
13.2. Generator Functions
```

## 5.2. Diferença do this

```javascript
// Generators são funções que podem pausar e retomar
function* contador(inicio = 0) {
  let i = inicio;
  while (true) {
    yield i++;  // Pausa e retorna o valor
  }
}

const gen = contador(5);
console.log(gen.next()); // { value: 5, done: false }
console.log(gen.next()); // { value: 6, done: false }
console.log(gen.next()); // { value: 7, done: false }

// Generator finito
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
const primeiros10 = Array.from({ length: 10 }, () => fib.next().value);
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

14. Map e Set
O ES6 introduziu novas estruturas de dados: Map (mapa de chave-valor) e Set (conjunto de valores únicos). Elas complementam os objetos e arrays nativos com funcionalidades específicas.
14.1. Map
```

> ⚠️ **Atenção:** Arrow functions não são adequadas para métodos de objetos ou construtores (new). Use funções tradicionais nesses casos.

## 5.3. Arrow Functions com Arrays

```javascript
// Map aceita qualquer tipo como chave
const mapa = new Map();

// set(chave, valor)
mapa.set('nome', 'Beatriz');
mapa.set(42, 'resposta');
mapa.set(true, 'verdadeiro');

const objChave = { id: 1 };
mapa.set(objChave, 'dados do objeto');

// Acessando
console.log(mapa.get('nome'));     // 'Beatriz'
console.log(mapa.has(42));         // true
console.log(mapa.size);            // 4

// Iterando
for (const [chave, valor] of mapa) {
  console.log(`${chave} => ${valor}`);
}

// Criando com array de pares
const config = new Map([
  ['host', 'localhost'],
  ['porta', 3000],
  ['debug', true]
]);

// Diferença do objeto: Map mantém a ordem de inserção
// e aceita chaves de qualquer tipo
14.2. Set
```

# 6. Template Literals

Template Literals (ou Template Strings) são strings delimitadas por crases (`) que permitem interpolação de expressões, strings multilinha e até tags personalizadas. Eles substituem a concatenação com +.

```javascript
// Set armazena valores únicos
const set = new Set([1, 2, 3, 2, 1, 4]);
console.log(set); // Set { 1, 2, 3, 4 }
console.log(set.size); // 4

set.add(5);
set.add(3); // Ignorado — já existe
set.delete(1);
console.log(set.has(2)); // true

// Remover duplicatas de um array (uso clássico!)
const numeros = [1, 2, 2, 3, 3, 3, 4];
const unicos = [...new Set(numeros)]; // [1, 2, 3, 4]

// Iterando
for (const valor of set) {
  console.log(valor);
}

// WeakMap e WeakSet
// Versões 'fracas' que permitem GC das chaves
// Úteis para metadados privados e caches
const cache = new WeakMap();
let objeto = {};
cache.set(objeto, { dado: 'valor' });
objeto = null; // O cache libera automaticamente

15. Symbol
Symbol é um novo tipo primitivo do ES6 que cria identificadores únicos e imutáveis. Cada Symbol é garantidamente único, mesmo que tenham a mesma descrição. São úteis como chaves de propriedades para evitar colisões.
```

> 💡 **Dica:** Template literals são amplamente usados em React (JSX), consultas SQL em strings, geração de HTML dinâmico e mensagens de erro descritivas.

# 7. Desestruturação (Destructuring)

A desestruturação permite extrair valores de arrays e propriedades de objetos em variáveis distintas com uma sintaxe concisa. É um dos recursos mais utilizados no desenvolvimento moderno.

## 7.1. Desestruturação de Objetos

```javascript
// Criando Symbols
const id = Symbol('id');
const idCopia = Symbol('id');
console.log(id === idCopia); // false — sempre únicos!

// Como chave de propriedade
const usuario = {
  nome: 'Lucas',
  [id]: 12345  // Propriedade com Symbol como chave
};

console.log(usuario[id]);  // 12345
// Symbols não aparecem no for...in nem Object.keys()
console.log(Object.keys(usuario)); // ['nome']

// Well-known Symbols
class MinhaLista {
  constructor(...items) { this.items = items; }

  // Torna a classe iterável com for...of
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => ({
        value: this.items[index],
        done: index++ >= this.items.length
      })
    };
  }

  // Personaliza o toString
  get [Symbol.toStringTag]() { return 'MinhaLista'; }
}

const lista = new MinhaLista(10, 20, 30);
for (const item of lista) console.log(item); // 10, 20, 30
16. Proxy e Reflect
Proxy permite interceptar e personalizar operações em objetos (leitura, escrita, chamada de função). Reflect fornece métodos para as operações padrão do JavaScript, tornando o código mais previsível.
```

## 7.2. Desestruturação de Arrays

```javascript
// Proxy com validação
const handler = {
  set(target, prop, value) {
    if (prop === 'idade' && typeof value !== 'number') {
      throw new TypeError('Idade deve ser um número');
    }
    if (prop === 'idade' && value < 0) {
      throw new RangeError('Idade não pode ser negativa');
    }
    return Reflect.set(target, prop, value); // Delega ao padrão
  },
  get(target, prop) {
    console.log(`Acessando: ${prop}`);
    return Reflect.get(target, prop);
  }
};

const pessoa = new Proxy({}, handler);
pessoa.nome = 'Sofia';     // OK
pessoa.idade = 25;          // OK
pessoa.idade = -1;          // RangeError!
pessoa.idade = 'vinte';     // TypeError!
console.log(pessoa.nome);  // Log + retorna 'Sofia'
```

# 8. Parâmetros Padrão (Default Parameters)

No ES5, para definir valores padrão era necessário usar verificações manuais dentro da função. O ES6 permite definir valores padrão diretamente na assinatura da função.

```javascript
// ES5 — forma manual function criarUsuario(nome, role, ativo) {   role = role || 'visitante';   ativo = ativo !== undefined ? ativo : true;  

// Problema: role = '' ou role = 0 também usaria o padrão! }
// ES6 — parâmetros padrão function criarUsuario(nome, role = 'visitante', ativo = true) {   return {
  nome, role, ativo }; }
criarUsuario('Ana');
// {
  nome: 'Ana', role: 'visitante', ativo: true }
criarUsuario('Bob', 'admin', false);
// {
  nome: 'Bob', role: 'admin', ativo: false }
// Expressões como valor padrão const agora = () => new Date().toISOString();
function registrar(evento, data = agora()) {   console.log(`${evento}
em ${data}`); }
// Referência a parâmetros anteriores function retangulo(largura, altura = largura) {   return largura * altura; }
retangulo(5);   
// 25 (quadrado) retangulo(4, 6);
// 24
```

# 9. Operador Rest e Spread

Os operadores Rest (...) e Spread (...) usam a mesma sintaxe mas têm propósitos opostos. O Rest coleta múltiplos elementos em um array; o Spread expande um array (ou objeto) em elementos individuais.

## 9.1. Rest Parameters

```javascript
// Coleta argumentos extras em um array real function somar(primeiro,
  segundo, ...restantes) {   const subtotal = primeiro + segundo;   return subtotal + restantes.reduce((acc,
  n) => acc + n, 0); }
somar(1, 2, 3, 4, 5);
// 15
```

## 9.2. Spread Operator

```javascript
// Expandindo arrays const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const unidos = [...arr1, ...arr2];
// [1,2,3,4,5,6]
// Cópia rasa de array const copia = [...arr1];
// Passando array como argumentos const numeros = [3, 1, 7, 2, 9];
const maximo = Math.max(...numeros);
// 9 // Expandindo objetos (ES2018, mas comumente ensinado junto) const base = {
  x: 1, y: 2 };
const extendido = { ...base, z: 3, x: 10 };
// x sobrescrito // {
  x: 10, y: 2, z: 3 }
// Merge e atualização de objetos const config = {
  tema: 'dark', idioma: 'pt-BR' };
const novaConfig = { ...config, tema: 'light' };
// {
  tema: 'light', idioma: 'pt-BR' }
// Convertendo string em array de caracteres const letras = [... 'hello'];
// ['h','e','l','l','o']
```

> 💡 **Dica:** O Spread é muito usado em React para atualizar o state sem mutação: setState(prev => ({ ...prev, campo: novoValor }))

# 10. Módulos (import / export)

Antes do ES6, o JavaScript não tinha sistema de módulos nativo. Usavam-se padrões como CommonJS (require/module.exports no Node.js) ou AMD. O ES6 introduziu os módulos nativos com import e export.

## 10.1. Exportando

```javascript
// arquivo: matematica.js
// Named exports (exportações nomeadas) export const PI = 3.14159;
export function somar(a, b) {   return a + b; }
export const subtrair = (a, b) => a - b;
// Export em bloco const multiplicar = (a, b) => a * b;
const dividir = (a, b) => a / b;
export {
  multiplicar, dividir };
// Export com renomeação export {
  multiplicar as mult, dividir as div };
// Default export (apenas um por arquivo) export default function calcular(op, a, b) {   const ops = {
  '+': somar, '-': subtrair };   return ops[op](a, b); }
```

## 10.2. Importando

```javascript
// Importando named exports import {
  PI, somar, subtrair }
from './matematica.js';
// Importando com renomeação import {
  somar as add, PI as pi }
from './matematica.js';
// Importando tudo em um namespace import * as Matematica from './matematica.js';
Matematica.somar(2, 3);
// 5 Matematica.PI;         
// 3.14159
// Importando o default export import calcular from './matematica.js';
// Misturando default e named import calcular, {
  PI, somar }
from './matematica.js';
// Import dinâmico (carregamento lazy) const modulo = await import('./matematica.js');
modulo.somar(1, 2);
```

| **Aspecto** | **CommonJS (Node)** | **ES Modules** |
| --- | --- | --- |

```javascript
Sintaxe | require() / module.exports | import / export

```

```javascript
Carregamento | Síncrono (runtime) | Assíncrono (estático)

```

```javascript
Escopo | Módulo tem escopo próprio | Módulo tem escopo próprio

```

```javascript
Browser | Precisa de bundler | Suporte nativo moderno

```

# 11. Classes

O ES6 introduziu uma sintaxe de classes que é um 'açúcar sintático' sobre o sistema de protótipos do JavaScript. As classes não mudam o funcionamento interno do JavaScript — elas tornam o código mais legível e familiar para quem vem de linguagens como Java ou C#.

```javascript
// Definição de classe class Animal {  
// Propriedade de classe (ES2022, mas comum em projetos modernos)   #nome;
// Propriedade privada   constructor(nome, especie) {     this.#nome = nome;     this.especie = especie;     this.vivo = true;   }   // Getter   get nome() {     return this.#nome;   }   // Setter   set nome(valor) {     if (typeof valor !== 'string') throw new Error('Nome inválido');     this.#nome = valor;   }   // Método de instância   falar() {     return `${this.#nome}
faz um som.`;   }  
// Método estático   static criarSelvagem(nome) {     return new Animal(nome, 'selvagem');   }   toString() {     return `[Animal: ${this.#nome}
(${this.especie})]`;   } }
// Herança com extends class Cachorro extends Animal {   constructor(nome, raca) {     super(nome, 'canino');
// Chama o construtor pai     this.raca = raca;   }   // Sobrescrita de método (override)   falar() {     return `${this.nome}
late: Au au!`;   }   // Usando método do pai   falarDuplo() {     return super.falar() + ' ' + this.falar();   } }
const rex = new Cachorro('Rex', 'Labrador');
console.log(rex.falar());   
// Rex late: Au au! console.log(rex instanceof Cachorro);
// true console.log(rex instanceof Animal);  
// true const leao = Animal.criarSelvagem('Simba');
```

# 12. Promises

Antes das Promises, o código assíncrono era gerenciado com callbacks, resultando no temido 'Callback Hell'. As Promises são objetos que representam a eventual conclusão (ou falha) de uma operação assíncrona.

## 12.1. Estados de uma Promise

| **Recurso** | **Descrição** |
| --- | --- |
| **pending** | Estado inicial — a operação ainda está em andamento |
| **fulfilled** | A operação foi concluída com sucesso — then() é chamado |
| **rejected** | A operação falhou — catch() é chamado |
| **settled** | A promise foi resolvida ou rejeitada — finally() é chamado |

## 12.2. Criando e Consumindo Promises

```javascript
// Criando uma Promise function buscarUsuario(id) {   return new Promise((resolve, reject) => {     // Simulando requisição HTTP     setTimeout(() => {       if (id > 0) {         resolve({
  id, nome: 'Ana', email: 'ana@email.com' });       }
else {         reject(new Error('ID inválido'));       }     }, 1000);   }); }
// Consumindo com .then().catch() buscarUsuario(1)   .then(usuario => {     console.log('Usuário:', usuario.nome);     return buscarPosts(usuario.id);
// Encadeamento   })   .then(posts => console.log('Posts:', posts))   .catch(erro => console.error('Erro:', erro.message))   .finally(() => console.log('Requisição finalizada'));
// Promise.all — espera todas resolverem Promise.all([   buscarUsuario(1),   buscarUsuario(2),   buscarUsuario(3) ])
  .then(([user1, user2, user3]) => console.log(user1, user2, user3))
  .catch(err => console.error('Uma falhou:', err));
// Promise.allSettled — aguarda todas, sem rejeição Promise.allSettled([p1, p2, p3])   .then(resultados => resultados.forEach(r =>     r.status === 'fulfilled'       ? console.log('OK:', r.value)       : console.log('Falhou:', r.reason)   ));
// Promise.race — retorna a primeira que resolver/rejeitar Promise.race([p1, p2]).then(resultado => console.log(resultado));
```

## 12.3. Async / Await (ES2017 — baseado em Promises)

- // async/await torna código assíncrono parecido com síncrono async function carregarDados(id) {
- try {
- const usuario = await buscarUsuario(id);
- const posts = await buscarPosts(usuario.id);
- const comentarios = await buscarComentarios(posts[0].id);
- return { usuario, posts, comentarios };
- } catch (erro) {
- console.error('Falha ao carregar:', erro.message);
- throw erro; // Re-lança para quem chamou tratar
- } finally {
- console.log('Carregamento concluído');
- } } // Paralelo com async/await async function carregarParalelo(ids) {
- const promises = ids.map(id => buscarUsuario(id));
- const usuarios = await Promise.all(promises);
- return usuarios; }

# 13. Iteradores e Generators

O ES6 introduziu o protocolo de iteração, que padroniza como objetos são percorridos. Qualquer objeto que implemente o método Symbol.iterator é iterável e pode ser usado com for...of, spread e desestruturação.

## 13.1. for...of

```javascript
// Funciona com qualquer iterável const frutas = ['maçã', 'banana', 'laranja'];
for (const fruta of frutas) {   console.log(fruta); }
// Strings também são iteráveis for (const char of 'ES6') {   console.log(char);
// E, S, 6 }
// Map e Set também const mapa = new Map([['a', 1], ['b', 2]]);
for (const [chave, valor] of mapa) {   console.log(`${chave}: ${valor}`); }
// Diferença de for...in (que itera chaves/índices) for (const indice in frutas) {  
// 0, 1, 2   console.log(indice); }
for (const fruta of frutas) {   
// maçã, banana, laranja   console.log(fruta); }
```

## 13.2. Generator Functions

```javascript
// Generators são funções que podem pausar e retomar function* contador(inicio = 0) {   let i = inicio;   while (true) {     yield i++; 
// Pausa e retorna o valor   } }
const gen = contador(5);
console.log(gen.next());
// {
  value: 5, done: false }
console.log(gen.next());
// {
  value: 6, done: false }
console.log(gen.next());
// {
  value: 7, done: false }
// Generator finito function* fibonacci() {   let [a, b] = [0, 1];   while (true) {     yield a;     [a, b] = [b, a + b];   } }
const fib = fibonacci();
const primeiros10 = Array.from({
  length: 10 }, () => fib.next().value);
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

# 14. Map e Set

O ES6 introduziu novas estruturas de dados: Map (mapa de chave-valor) e Set (conjunto de valores únicos). Elas complementam os objetos e arrays nativos com funcionalidades específicas.

## 14.1. Map

```javascript
// Map aceita qualquer tipo como chave const mapa = new Map();
// set(chave, valor) mapa.set('nome', 'Beatriz');
mapa.set(42, 'resposta');
mapa.set(true, 'verdadeiro');
const objChave = {
  id: 1 };
mapa.set(objChave, 'dados do objeto');
// Acessando console.log(mapa.get('nome'));     // 'Beatriz' console.log(mapa.has(42));         // true console.log(mapa.size);            // 4 // Iterando for (const [chave, valor] of mapa) {   console.log(`${chave} => ${valor}`); }
// Criando com array de pares const config = new Map([   ['host', 'localhost'],   ['porta', 3000],   ['debug', true] ]);
// Diferença do objeto: Map mantém a ordem de inserção
// e aceita chaves de qualquer tipo
```

## 14.2. Set

```javascript
// Set armazena valores únicos const set = new Set([1, 2, 3, 2, 1, 4]);
console.log(set);
// Set { 1, 2, 3, 4 }
console.log(set.size);
// 4 set.add(5);
set.add(3);
// Ignorado — já existe set.delete(1);
console.log(set.has(2));
// true
// Remover duplicatas de um array (uso clássico!) const numeros = [1, 2, 2, 3, 3, 3, 4];
const unicos = [...new Set(numeros)];
// [1, 2, 3, 4] // Iterando for (const valor of set) {   console.log(valor); }
// WeakMap e WeakSet
// Versões 'fracas' que permitem GC das chaves
// Úteis para metadados privados e caches const cache = new WeakMap();
let objeto = {};
cache.set(objeto, {
  dado: 'valor' });
objeto = null;
// O cache libera automaticamente
```

# 15. Symbol

Symbol é um novo tipo primitivo do ES6 que cria identificadores únicos e imutáveis. Cada Symbol é garantidamente único, mesmo que tenham a mesma descrição. São úteis como chaves de propriedades para evitar colisões.

```javascript
// Criando Symbols const id = Symbol('id');
const idCopia = Symbol('id');
console.log(id === idCopia);
// false — sempre únicos! // Como chave de propriedade const usuario = {   nome: 'Lucas',   [id]: 12345 
// Propriedade com Symbol como chave };
console.log(usuario[id]); 
// 12345
// Symbols não aparecem no for...in nem Object.keys() console.log(Object.keys(usuario));
// ['nome'] // Well-known Symbols class MinhaLista {   constructor(...items) {
  this.items = items; }  
// Torna a classe iterável com for...of   [Symbol.iterator]() {     let index = 0;     return {       next: () => ({         value: this.items[index],         done: index++ >= this.items.length       })     };   }   // Personaliza o toString   get [Symbol.toStringTag]() {
  return 'MinhaLista'; } }
const lista = new MinhaLista(10, 20, 30);
for (const item of lista) console.log(item);
// 10, 20, 30
```

# 16. Proxy e Reflect

Proxy permite interceptar e personalizar operações em objetos (leitura, escrita, chamada de função). Reflect fornece métodos para as operações padrão do JavaScript, tornando o código mais previsível.

```javascript
// Proxy com validação const handler = {   set(target, prop, value) {     if (prop === 'idade' && typeof value !== 'number') {       throw new TypeError('Idade deve ser um número');     }     if (prop === 'idade' && value < 0) {       throw new RangeError('Idade não pode ser negativa');     }     return Reflect.set(target, prop, value);
// Delega ao padrão   },   get(target, prop) {     console.log(`Acessando: ${prop}`);     return Reflect.get(target, prop);   } };
const pessoa = new Proxy({}, handler);
pessoa.nome = 'Sofia';    
// OK pessoa.idade = 25;         
// OK pessoa.idade = -1;         
// RangeError! pessoa.idade = 'vinte';    
// TypeError! console.log(pessoa.nome); 
// Log + retorna 'Sofia'
```

> 💡 **Dica:** Proxy é a base do sistema de reatividade do Vue.js 3 — quando você muda um dado no Vue, o Proxy detecta a mudança e atualiza a interface automaticamente.

# 17. Referências e Leituras Complementares

## Documentação Oficial

- MDN Web Docs — JavaScript: developer.mozilla.org/pt-BR/docs/Web/JavaScript
- ECMAScript 2015 Specification: ecma-international.org/ecma-262/6.0
- TC39 Proposals: tc39.es/ecma262

## Livros Recomendados

- 'You Don't Know JS Yet' — Kyle Simpson (gratuito no GitHub: github.com/getify/You-Dont-Know-JS)
- 'JavaScript: The Good Parts' — Douglas Crockford
- 'Eloquent JavaScript' — Marijn Haverbeke (gratuito: eloquentjavascript.net)
- 'JavaScript ES6 e além' — Cody Lindley

## Ferramentas e Ambientes de Prática

- CodePen — codepen.io (experimentos rápidos no navegador)
- StackBlitz — stackblitz.com (ambiente Node.js completo)
- Babel REPL — babeljs.io/repl (ver como ES6 é transpilado para ES5)
- Node.js — nodejs.org (para executar JS fora do navegador)
- VSCode — code.visualstudio.com (editor recomendado)

## Cursos e Tutoriais Online

- freeCodeCamp — freecodecamp.org (JavaScript completo, gratuito)
- JavaScript.info — javascript.info (tutorial mais completo do ES6+)
- Rocketseat — app.rocketseat.com.br (conteúdo em português)

> **Próximos Passos — O que estudar depois do ES6**

> ES2017: async/await aprofundado, Object.entries/values ES2018: Spread para objetos, Promise.finally, iteração assíncrona ES2020: Optional chaining (?.), Nullish coalescing (??), BigInt ES2021: String.replaceAll, Promise.any, WeakRef ES2022: Top-level await, class fields privados (#), at() TypeScript: Superset do JavaScript com tipagem estática React / Vue / Angular: Frameworks que exploram todo o ES6+

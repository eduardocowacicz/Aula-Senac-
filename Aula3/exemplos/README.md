# Exemplos praticos - Aula 3 (ate Custom Properties)

Esta pasta contem exemplos pequenos e didaticos para os assuntos da Aula 3, de variáveis SCSS até custom properties CSS.

## Estrutura

- 01-variaveis-sass
- 02-nesting
- 03-parciais-use
- 04-mixins
- 05-custom-properties
- 06-custom-properties-scss

Cada pasta possui:

- index.html
- styles.scss (fonte)
- styles.css (arquivo legado opcional; no fluxo com Vite o SCSS e compilado em tempo de execucao/build)
- package.json (projeto Node.js independente)

No exemplo 03 tambem existem arquivos parciais para demonstrar @use:

- _colors.scss
- _buttons.scss

## Executar com Node.js, npm e Vite

Cada exemplo e um projeto Node.js separado. Entre na pasta desejada:

- npm install
- npm run dev

Exemplos:

- 01-variaveis-sass - Variáveis Sass básicas
- 02-nesting - Aninhamento de seletores
- 03-parciais-use - Importação de arquivos parciais com @use
- 04-mixins - Mixins Sass para reutilização de código
- 05-custom-properties - CSS Custom Properties (variáveis CSS nativas)
- 06-custom-properties-scss - Combinação de SCSS com Custom Properties

### Exemplo 05: Custom Properties

Demonstra o uso de Custom Properties (variáveis CSS) nativas do navegador:
- Definição de estilos reutilizáveis com `--propriedade`
- Acesso via `var(--propriedade)`
- Temas múltiplos sem duplication de código
- Cascata e herança de custom properties

### Exemplo 06: Custom Properties + SCSS

Combina o poder do SCSS com Custom Properties CSS:
- Variáveis SCSS para valores compilados (não acessíveis em JS)
- Custom Properties CSS para valores dinâmicos (acessíveis em JS)
- Mixins para gerar custom properties em massa
- Sistema de temas responsivos e escaláveis
- Grid responsivo com custom properties para espaçamento

Depois abra o endereco mostrado no terminal (Vite) para ver o index.html daquele exemplo.

# Exemplo 06: Custom Properties + SCSS

## Conceito: Combinando SCSS e Custom Properties

Este exemplo demonstra como combinar o poder das **variáveis SCSS** (compiladas) com as **Custom Properties CSS** (dinâmicas) para construir um sistema de estilos robusto, flexível e mantenível.

### Arquitetura

```
Variáveis SCSS (compile-time)
        ↓
    Mixins SCSS (geram Custom Properties)
        ↓
Custom Properties CSS (runtime)
        ↓
    Elementos HTML
```

## Componentes da Solução

### 1. Variáveis SCSS (Estrutura)

```scss
$paleta: (
  'destaque': #6366f1,
  'padrao': #8b5cf6,
  'branco': #ffffff,
);

$espacos: (
  'xs': 4px,
  'md': 16px,
  'lg': 24px,
);
```

**Por que SCSS aqui?**
- Organização estruturada com mapas
- Cálculos e lógica durante a compilação
- Não são acessíveis via JavaScript

### 2. Mixins SCSS (Geram Custom Properties)

```scss
@mixin aplicar-variaveis($nome-prefixo, $paleta-cores) {
  @each $nome, $cor in $paleta-cores {
    --#{$nome-prefixo}-#{$nome}: #{$cor};
  }
}

/* Uso */
:root {
  @include aplicar-variaveis('cor', $paleta);
}
```

**Resultado CSS compilado:**
```css
:root {
  --cor-destaque: #6366f1;
  --cor-padrao: #8b5cf6;
  --cor-branco: #ffffff;
}
```

### 3. Custom Properties CSS (Consumo)

```css
button {
  background: var(--cor-destaque);
  padding: var(--espaco-md);
  border-radius: var(--raio-grande);
}
```

**Vantagens:**
- ✅ Acessíveis em JavaScript
- ✅ Podem mudar dinamicamente
- ✅ Respondem via DevTools em tempo real
- ✅ Herança CSS nativa

## Padrões no Exemplo

### 1. Sistema de Espaçamento

```scss
$espacos: ('xs': 4px, 'sm': 8px, 'md': 16px, 'lg': 24px, 'xl': 32px);

/* Gera */
.elemento {
  padding: var(--espaco-lg);
  margin-bottom: var(--espaco-md);
  gap: var(--espaco-sm);
}
```

### 2. Sistema de Cores (Paleta)

```scss
$paleta: (
  'destaque': #6366f1,
  'padrao': #8b5cf6,
  'gratuito': #64748b,
  'erro': #ef4444,
  'sucesso': #10b981,
);

/* Uso em BEM */
.card--destaque {
  border-color: var(--cor-destaque);
  background: rgba(99, 102, 241, 0.1);
}
```

### 3. Mixins Reutilizáveis

```scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin transicao-suave($propriedades: all) {
  transition: $propriedades 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Uso */
.item {
  @include flex-center;
  @include transicao-suave;
}
```

### 4. Responsividade Dinâmica

```scss
@media (max-width: 768px) {
  :root {
    --espaco-lg: 16px;      /* Reduzido para mobile */
    --font-size-titulo: 20px;
  }
}
```

## Casos de Uso Reais

### 1. Temas por Usuário (SPA/React)

```javascript
// JavaScript pode acessar e alterar custom properties
document.documentElement.style.setProperty('--cor-destaque', '#ff0000');
```

### 2. Sistema de Design Escalável

```
Design System
    ↓
Variáveis SCSS (tokens)
    ↓
Custom Properties CSS
    ↓
Componentes (React, Vue, etc)
```

### 3. Temas Reutilizáveis

```scss
:root {
  @include aplicar-variaveis('cor', $paleta);
}

.tema-escuro {
  @include aplicar-variaveis('cor', $paleta-escura);
}

.tema-alto-contraste {
  @include aplicar-variaveis('cor', $paleta-contraste);
}
```

## Estrutura de Arquivos Sugerida (Projeto Real)

```
src/
├── styles/
│   ├── abstracts/
│   │   ├── _variaveis.scss      # Variáveis SCSS
│   │   ├── _mixins.scss         # Mixins reutilizáveis
│   │   └── _funcoes.scss        # Funções SCSS
│   ├── base/
│   │   ├── _reset.scss          # CSS Reset
│   │   ├── _tipografia.scss     # Fontes e textos
│   │   └── _cores.scss          # Definição de custom properties
│   ├── componentes/
│   │   ├── _botoes.scss
│   │   ├── _cards.scss
│   │   └── _forms.scss
│   └── main.scss                # Arquivo principal
```

## Como Usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar desenvolvimento

```bash
npm run dev
```

### 3. Build para produção

```bash
npm run build
```

## Vantagens desta Abordagem

| Aspecto | Benefício |
|--------|-----------|
| **Manutenibilidade** | Alterações centralizadas em variáveis |
| **Escalabilidade** | Sistema consistente de temas |
| **Performance** | SCSS compilado é rápido |
| **Flexibilidade** | Custom properties permitem mudanças em tempo real |
| **Acessibilidade** | Fácil implementar temas acessíveis (alto contraste) |
| **DX (Developer Experience)** | Código limpo e bem organizado |

## Atividades Propostas

1. **Tema Escuro Dinâmico**
   - Crie um botão que alterne entre temas
   - Persista a preferência em localStorage
   - Considere `prefers-color-scheme` do navegador

2. **Paleta de Cores Customizável**
   - Adicione controles de cor no HTML
   - Use JavaScript para alterar custom properties
   - Salve a paleta do usuário

3. **Expand do Sistema**
   - Adicione novos spacing tokens
   - Crie variações de componentes
   - Implemente animações com custom properties

4. **Integração com Framework**
   - Use com React/Vue/Angular
   - Crie context/store para gerenciar temas
   - Implemente type-safe CSS-in-JS (styled-components, etc)

## Referências

- [MDN: CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [MDN: var() function](https://developer.mozilla.org/en-US/docs/Web/CSS/var())
- [SASS Documentation](https://sass-lang.com/documentation)
- [CSS Variables - CSS Tricks](https://css-tricks.com/difference-between-types-of-css-variables/)

# Exemplo 05: Custom Properties (CSS Variables)

## O que são Custom Properties?

Custom Properties (também chamadas de CSS Variables) são valores armazenados no CSS que podem ser reutilizados em todo o seu código. Elas começam com `--` e são acessadas através da função `var()`.

### Vantagens

✅ **Acessíveis em JavaScript** - Podem ser lidas e alteradas dinamicamente
✅ **Herança** - Seguem a cascata CSS normal
✅ **Escopo** - Podem ser definidas em qualquer seletor
✅ **Fallback** - Suporta valores padrão com `var(propriedade, padrão)`
✅ **Reutilização** - Reduz repetição de código
✅ **Temas dinâmicos** - Permite trocar temas sem recarregar a página

### Sintaxe

```css
/* Declaração */
:root {
  --cor-principal: #0059b3;
  --espaco: 16px;
}

/* Uso */
button {
  background: var(--cor-principal);
  padding: var(--espaco);
}

/* Com valor padrão (fallback) */
div {
  color: var(--texto-customizado, #000);
}
```

## Conceitos Neste Exemplo

### 1. Custom Properties Globais (`:root`)

Definem variáveis que podem ser usadas em toda a página:

```css
:root {
  --cor-fundo: #f5f7fb;
  --cor-texto: #1f2937;
}
```

### 2. Escopo Local

Custom properties podem ser redefinidas em escopos específicos:

```css
.tema-escuro {
  --cor-fundo: #1f2937;
  --cor-texto: #f3f4f6;
}
```

Assim, todos os elementos dentro de `.tema-escuro` usarão os novos valores das custom properties.

### 3. Categorias de Variáveis

- **Cores**: `--cor-principal`, `--cor-fundo`
- **Espaçamento**: `--espaco-pequeno`, `--espaco-medio`
- **Tipografia**: `--font-family`, `--font-size-titulo`
- **Raios**: `--raio`, `--raio-pequeno`
- **Sombras**: `--sombra`

### 4. Temas Múltiplos

O exemplo demonstra 3 temas diferentes:

- **Tema Padrão**: Cores azuis e limpas
- **Tema Escuro**: Fundo escuro com textos claros
- **Tema Personalizado**: Cores roxas e laranjas

## Como Usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

### 3. Abrir no navegador

Copie a URL mostrada no terminal (normalmente `http://localhost:5173`)

## Diferenças entre Custom Properties e SCSS Variables

| Feature | Custom Properties | SCSS Variables |
|---------|-------------------|-----------------|
| Acessível em JS | ✅ Sim | ❌ Não |
| Pode mudar em tempo de execução | ✅ Sim | ❌ Não (requer recompilação) |
| Herança CSS | ✅ Sim | ❌ Não |
| Suporte em navegadores | ✅ Moderno | ✅ Todos |
| Performance | 📊 Mais lento | ⚡ Mais rápido |

## Casos de Uso

- 🎨 Temas dinâmicos
- 🌓 Modo claro/escuro
- 📱 Responsividade dinâmica
- 🎯 Personalizações por usuário
- 🔄 Animações com valores dinâmicos

## Atividades Propostas

1. **Tema Dinâmico**: Adicione um botão que mude entre temas claro/escuro usando JavaScript
2. **Cores Customizáveis**: Crie um seletor de cores que altere as custom properties
3. **Modo Responsivo**: Use `@media` queries para ajustar custom properties em mobile
4. **Valores Dinâmicos**: Use JavaScript para calcular e alterar `--espaco` baseado no tamanho da janela

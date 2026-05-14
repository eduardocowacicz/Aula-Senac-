const THEME_STORAGE_KEY = "labubu-theme";
const THEMES = ["theme-default", "theme-ocean", "theme-sunset"];

type Tema = "theme-default" | "theme-ocean" | "theme-sunset";

function validarTema(theme: string | null): Tema {
  return THEMES.includes(theme as string) ? (theme as Tema) : "theme-default";
}

function obterTemaSalvo(): Tema {
  try {
    return validarTema(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return "theme-default";
  }
}

function atualizarBotoesTema(theme: Tema): void {
  const botoes = document.querySelectorAll("[data-theme-value]");
  botoes.forEach(function (botao) {
    const el = botao as HTMLElement;
    const ativo = el.dataset.themeValue === theme;
    el.classList.toggle("active", ativo);
    el.setAttribute("aria-pressed", String(ativo));
  });
}

function aplicarTema(theme: string): void {
  const temaSeguro = validarTema(theme);
  THEMES.forEach(function (nomeTema) {
    document.body.classList.remove(nomeTema);
  });

  document.body.classList.add(temaSeguro);
  atualizarBotoesTema(temaSeguro);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, temaSeguro);
  } catch {
    // Sem persistencia quando localStorage nao estiver disponivel.
  }
}

function configurarTrocaDeTema(): void {
  document.addEventListener("click", function (event) {
    const botao = (event.target as Element).closest("[data-theme-value]");
    if (!botao) return;
    aplicarTema((botao as HTMLElement).dataset.themeValue as string);
  });
}

if (document.body) {
  aplicarTema(obterTemaSalvo());
  configurarTrocaDeTema();
}

import "./theme.ts";
import { buscarDepoimentos, enviarContato, buscarProdutos } from "./api.ts";
import type { DadosContato } from "./api.ts";
import {
  renderizarDepoimentos,
  renderizarProdutos,
  mostrarAlerta,
  atualizarContadorCarrinho,
} from "./ui.ts";

atualizarContadorCarrinho();

buscarDepoimentos().then(renderizarDepoimentos);

const formContato = document.getElementById("form-contato") as HTMLFormElement | null;
if (formContato) {
  formContato.addEventListener("submit", async function (event) {
    event.preventDefault();

    const dados: DadosContato = {
      nome: (document.getElementById("nome") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      mensagem: (document.getElementById("mensagem") as HTMLTextAreaElement).value,
    };

    try {
      const resposta = await enviarContato(dados);

      if (resposta.status === 201) {
        mostrarAlerta(
          "success",
          "<strong>Mensagem enviada!</strong> Obrigado pelo contato, retornaremos em breve.",
          formContato,
        );
        formContato.reset();
      } else {
        throw new Error("Status inesperado: " + resposta.status);
      }
    } catch {
      mostrarAlerta(
        "danger",
        "<strong>Erro ao enviar.</strong> Tente novamente mais tarde.",
        formContato,
      );
    }
  });
}

function addToCart(nome: string, preco: number, qtdInputId: string): void {
  const input = document.getElementById(qtdInputId) as HTMLInputElement | null;
  const quantidade = parseInt(input?.value ?? "1") || 1;
  const carrinho: { nome: string; preco: number; quantidade: number }[] =
    JSON.parse(localStorage.getItem("carrinho") ?? "[]") || [];
  const existente = carrinho.find(function (item) {
    return item.nome === nome;
  });
  if (existente) {
    existente.quantidade += quantidade;
  } else {
    carrinho.push({ nome, preco, quantidade });
  }
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContadorCarrinho();
}

function feedbackBotao(btn: HTMLButtonElement): void {
  const textoOriginal = btn.innerHTML;
  btn.innerHTML = "✅ Adicionado!";
  btn.disabled = true;
  setTimeout(function () {
    btn.innerHTML = textoOriginal;
    btn.disabled = false;
  }, 1500);
}

const listaProdutos = document.getElementById("lista-produtos");
if (listaProdutos) {
  listaProdutos.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
      <p class="mt-3 text-muted">Carregando produtos...</p>
    </div>
  `;

  buscarProdutos()
    .then(renderizarProdutos)
    .catch(function () {
      listaProdutos.innerHTML =
        '<div class="col-12"><div class="alert alert-danger">Não foi possível carregar os produtos. Tente novamente.</div></div>';
    });

  listaProdutos.addEventListener("click", function (e) {
    const btn = (e.target as Element).closest(".btn-adicionar") as HTMLButtonElement | null;
    if (!btn) return;
    addToCart(
      btn.dataset.nome as string,
      parseFloat(btn.dataset.preco as string),
      btn.dataset.qtdId as string,
    );
    feedbackBotao(btn);
  });
}

function adicionarAoCarrinho(nome: string, preco: number, qtdInputId: string): void {
  addToCart(nome, preco, qtdInputId);
  const btn = document.querySelector(
    `.btn-adicionar[data-qtd-id="${qtdInputId}"]`,
  ) as HTMLButtonElement | null;
  if (btn) feedbackBotao(btn);
}

(window as Window & typeof globalThis & { adicionarAoCarrinho: typeof adicionarAoCarrinho }).adicionarAoCarrinho = adicionarAoCarrinho;

const modalProduto = document.getElementById("modalProduto");
if (modalProduto) {
  modalProduto.addEventListener("show.bs.modal", function (event) {
    const botao = (event as Event & { relatedTarget: HTMLElement }).relatedTarget;
    (document.getElementById("modalProdutoTitulo") as HTMLElement).textContent =
      botao.dataset.nome ?? "";
    (document.getElementById("modalProdutoDescricao") as HTMLElement).textContent =
      botao.dataset.descricao ?? "";
    (document.getElementById("modalProdutoPreco") as HTMLElement).textContent =
      "R$ " + (botao.dataset.preco ?? "");
  });
}

import "./theme.ts";

interface ItemCarrinho {
  nome: string;
  preco: number;
  quantidade: number;
}

function renderizarCarrinho(): void {
  const raw: ItemCarrinho[] = JSON.parse(localStorage.getItem("carrinho") ?? "[]") || [];
  const mapa: Record<string, ItemCarrinho> = {};
  raw.forEach(function (item) {
    if (mapa[item.nome]) {
      mapa[item.nome].quantidade += item.quantidade;
    } else {
      mapa[item.nome] = { nome: item.nome, preco: item.preco, quantidade: item.quantidade };
    }
  });
  const carrinho = Object.values(mapa);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  const tbody = document.getElementById("carrinho-itens") as HTMLElement;
  const totalEl = document.getElementById("total-carrinho") as HTMLElement;
  const counter = document.getElementById("carrinho-count") as HTMLElement;

  tbody.innerHTML = "";

  if (carrinho.length === 0) {
    document.getElementById("carrinho-vazio")?.classList.remove("d-none");
    document.getElementById("carrinho-conteudo")?.classList.add("d-none");
    counter.textContent = "0";
    return;
  }

  document.getElementById("carrinho-vazio")?.classList.add("d-none");
  document.getElementById("carrinho-conteudo")?.classList.remove("d-none");

  let total = 0;
  let totalItens = 0;

  carrinho.forEach(function (item, index) {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;
    totalItens += item.quantidade;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td class="text-center">
        <div class="d-flex align-items-center justify-content-center gap-2">
          <button class="btn btn-outline-secondary btn-sm" onclick="alterarQuantidade(${index}, -1)">−</button>
          <span>${item.quantidade}</span>
          <button class="btn btn-outline-secondary btn-sm" onclick="alterarQuantidade(${index}, 1)">+</button>
        </div>
      </td>
      <td class="text-end">R$ ${item.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
      <td class="text-end">R$ ${subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
      <td class="text-center">
        <button class="btn btn-outline-danger btn-sm" onclick="removerItem(${index})">✕</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  totalEl.textContent = total.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  counter.textContent = String(totalItens);
}

function alterarQuantidade(index: number, delta: number): void {
  const carrinho: ItemCarrinho[] = JSON.parse(localStorage.getItem("carrinho") ?? "[]") || [];
  carrinho[index].quantidade += delta;
  if (carrinho[index].quantidade <= 0) {
    carrinho.splice(index, 1);
  }
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizarCarrinho();
}

let _indexParaRemover: number | null = null;

function removerItem(index: number): void {
  const carrinho: ItemCarrinho[] = JSON.parse(localStorage.getItem("carrinho") ?? "[]") || [];
  _indexParaRemover = index;
  (document.getElementById("modalRemoverNome") as HTMLElement).textContent = carrinho[index].nome;
  const modal = new (window as any).bootstrap.Modal(document.getElementById("modalRemover"));
  modal.show();
}

document.getElementById("modalRemoverConfirmar")?.addEventListener("click", function () {
  if (_indexParaRemover === null) return;
  const carrinho: ItemCarrinho[] = JSON.parse(localStorage.getItem("carrinho") ?? "[]") || [];
  carrinho.splice(_indexParaRemover, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  _indexParaRemover = null;
  (window as any).bootstrap.Modal.getInstance(document.getElementById("modalRemover")).hide();
  renderizarCarrinho();
});

function limparCarrinho(): void {
  if (confirm("Tem certeza que deseja limpar o carrinho?")) {
    localStorage.removeItem("carrinho");
    renderizarCarrinho();
  }
}

function finalizarPedido(): void {
  localStorage.removeItem("carrinho");
  const modal = new (window as any).bootstrap.Modal(document.getElementById("modalFinalizado"));
  modal.show();
}

type AppWindow = Window & typeof globalThis & {
  alterarQuantidade: typeof alterarQuantidade;
  removerItem: typeof removerItem;
  limparCarrinho: typeof limparCarrinho;
  finalizarPedido: typeof finalizarPedido;
};

(window as AppWindow).alterarQuantidade = alterarQuantidade;
(window as AppWindow).removerItem = removerItem;
(window as AppWindow).limparCarrinho = limparCarrinho;
(window as AppWindow).finalizarPedido = finalizarPedido;

renderizarCarrinho();

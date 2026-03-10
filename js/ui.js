// =============================================
// FUNÇÕES DE MANIPULAÇÃO DO DOM
// =============================================

export function renderizarDepoimentos(dados) {
    var lista = document.getElementById('lista-depoimentos');
    if (!lista) return;

    var html = '';
    dados.forEach(function(item) {
        html += `
            <div class="col-md-4 mb-3">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.body}</p>
                        <footer class="text-muted">${item.email}</footer>
                    </div>
                </div>
            </div>
        `;
    });

    lista.innerHTML = html;
}

export function exibirAlerta(containerId, tipo, mensagem) {
    var container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '<div class="alert alert-' + tipo + '">' + mensagem + '</div>';
    }
}

export function calcularTotal() {
    var checkboxes = document.querySelectorAll('.item-produto');
    var quantidades = document.querySelectorAll('.qtd-produto');
    var total = 0;

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            var preco = parseFloat(checkboxes[i].value);
            var qtd = parseInt(quantidades[i].value);
            total = total + (preco * qtd);
        }
    }

    var el = document.getElementById('valor-total');
    if (el) {
        el.textContent = total.toFixed(2).replace('.', ',');
    }
}

// =============================================
// CARRINHO - Funções auxiliares
// =============================================
export function getCarrinho() {
    var carrinho = localStorage.getItem('carrinho');
    return carrinho ? JSON.parse(carrinho) : [];
}

export function salvarCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

export function atualizarContador() {
    var carrinho = getCarrinho();
    var total = 0;
    carrinho.forEach(function(item) {
        total += item.qtd;
    });
    var badges = document.querySelectorAll('#cart-count');
    badges.forEach(function(badge) {
        badge.textContent = total;
    });
}

export function adicionarAoCarrinho(nome, preco) {
    var carrinho = getCarrinho();
    var encontrado = false;

    for (var i = 0; i < carrinho.length; i++) {
        if (carrinho[i].nome === nome) {
            carrinho[i].qtd += 1;
            encontrado = true;
            break;
        }
    }

    if (!encontrado) {
        carrinho.push({ nome: nome, preco: parseFloat(preco), qtd: 1 });
    }

    salvarCarrinho(carrinho);
    atualizarContador();
}

export function removerDoCarrinho(index) {
    var carrinho = getCarrinho();
    carrinho.splice(index, 1);
    salvarCarrinho(carrinho);
    renderizarCarrinho();
    atualizarContador();
}

export function alterarQuantidade(index, novaQtd) {
    var carrinho = getCarrinho();
    if (novaQtd < 1) {
        removerDoCarrinho(index);
        return;
    }
    carrinho[index].qtd = novaQtd;
    salvarCarrinho(carrinho);
    renderizarCarrinho();
    atualizarContador();
}

export function renderizarCarrinho() {
    var corpo = document.getElementById('corpo-carrinho');
    if (!corpo) return;

    var carrinho = getCarrinho();
    var totalGeral = 0;

    var avisoVazio = document.getElementById('carrinho-vazio');
    var tabela = document.getElementById('tabela-carrinho');
    var checkout = document.getElementById('secao-checkout');

    if (carrinho.length === 0) {
        avisoVazio.style.display = 'block';
        tabela.style.display = 'none';
        if (checkout) checkout.style.display = 'none';
    } else {
        avisoVazio.style.display = 'none';
        tabela.style.display = 'table';
        if (checkout) checkout.style.display = 'block';
    }

    corpo.innerHTML = '';

    carrinho.forEach(function(item, index) {
        var subtotal = item.preco * item.qtd;
        totalGeral += subtotal;

        corpo.innerHTML += `
            <tr>
                <td>${item.nome}</td>
                <td>R$ ${item.preco.toFixed(2).replace('.', ',')}</td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-sm btn-outline-secondary btn-qtd-menos" data-index="${index}">-</button>
                        <span>${item.qtd}</span>
                        <button class="btn btn-sm btn-outline-secondary btn-qtd-mais" data-index="${index}">+</button>
                    </div>
                </td>
                <td>R$ ${subtotal.toFixed(2).replace('.', ',')}</td>
                <td>
                    <button class="btn btn-sm btn-danger btn-remover" data-index="${index}">Remover</button>
                </td>
            </tr>
        `;
    });

    document.getElementById('carrinho-total').textContent = 'R$ ' + totalGeral.toFixed(2).replace('.', ',');

    document.querySelectorAll('.btn-remover').forEach(function(btn) {
        btn.addEventListener('click', function() {
            removerDoCarrinho(parseInt(this.dataset.index));
        });
    });

    document.querySelectorAll('.btn-qtd-menos').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var idx = parseInt(this.dataset.index);
            var c = getCarrinho();
            alterarQuantidade(idx, c[idx].qtd - 1);
        });
    });

    document.querySelectorAll('.btn-qtd-mais').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var idx = parseInt(this.dataset.index);
            var c = getCarrinho();
            alterarQuantidade(idx, c[idx].qtd + 1);
        });
    });
}

export function preencherModal(event) {
    var botao = event.relatedTarget;
    var nome = botao.getAttribute('data-nome');
    var descricao = botao.getAttribute('data-descricao');
    var preco = botao.getAttribute('data-preco');

    document.getElementById('modalProdutoLabel').textContent = nome;
    document.getElementById('modal-descricao').textContent = descricao;
    document.getElementById('modal-preco').textContent = 'R$ ' + parseFloat(preco).toFixed(2).replace('.', ',');
}

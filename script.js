// =============================================
// ORÇAMENTO (página produtos)
// =============================================
function calcularTotal() {
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

var checkboxes = document.querySelectorAll('.item-produto');
var quantidades = document.querySelectorAll('.qtd-produto');

for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', calcularTotal);
    quantidades[i].addEventListener('change', calcularTotal);
}

// =============================================
// CARRINHO DE COMPRAS (localStorage)
// =============================================
function getCarrinho() {
    var carrinho = localStorage.getItem('carrinho');
    return carrinho ? JSON.parse(carrinho) : [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function atualizarContador() {
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

function adicionarAoCarrinho(nome, preco) {
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

function removerDoCarrinho(index) {
    var carrinho = getCarrinho();
    carrinho.splice(index, 1);
    salvarCarrinho(carrinho);
    renderizarCarrinho();
    atualizarContador();
}

function alterarQuantidade(index, novaQtd) {
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

// =============================================
// RENDERIZAR CARRINHO (página carrinho)
// =============================================
function renderizarCarrinho() {
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

    // Event listeners dos botões da tabela
    document.querySelectorAll('.btn-remover').forEach(function(btn) {
        btn.addEventListener('click', function() {
            removerDoCarrinho(parseInt(this.dataset.index));
        });
    });

    document.querySelectorAll('.btn-qtd-menos').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var idx = parseInt(this.dataset.index);
            var carrinho = getCarrinho();
            alterarQuantidade(idx, carrinho[idx].qtd - 1);
        });
    });

    document.querySelectorAll('.btn-qtd-mais').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var idx = parseInt(this.dataset.index);
            var carrinho = getCarrinho();
            alterarQuantidade(idx, carrinho[idx].qtd + 1);
        });
    });
}

// =============================================
// BOTÕES "ADICIONAR AO CARRINHO" (página produtos)
// =============================================
var botoesCarrinho = document.querySelectorAll('.btn-adicionar-carrinho');
botoesCarrinho.forEach(function(btn) {
    btn.addEventListener('click', function() {
        var nome = this.dataset.nome;
        var preco = this.dataset.preco;
        adicionarAoCarrinho(nome, preco);

        // Feedback visual
        var textoOriginal = this.textContent;
        this.textContent = 'Adicionado!';
        this.classList.remove('btn-primary');
        this.classList.add('btn-success');
        var botao = this;
        setTimeout(function() {
            botao.textContent = textoOriginal;
            botao.classList.remove('btn-success');
            botao.classList.add('btn-primary');
        }, 1000);
    });
});

// =============================================
// LIMPAR CARRINHO
// =============================================
var btnLimpar = document.getElementById('btn-limpar-carrinho');
if (btnLimpar) {
    btnLimpar.addEventListener('click', function() {
        localStorage.removeItem('carrinho');
        renderizarCarrinho();
        atualizarContador();
    });
}

// =============================================
// CHECKOUT (formulário)
// =============================================
var formCheckout = document.getElementById('form-checkout');
if (formCheckout) {
    formCheckout.addEventListener('submit', function(e) {
        e.preventDefault();

        var carrinho = getCarrinho();
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        // Limpa carrinho e mostra sucesso
        localStorage.removeItem('carrinho');
        document.getElementById('tabela-carrinho').style.display = 'none';
        document.getElementById('secao-checkout').style.display = 'none';
        document.querySelector('.d-flex.justify-content-between').style.display = 'none';
        document.getElementById('pedido-sucesso').style.display = 'block';
        atualizarContador();
    });
}

// =============================================
// DEPOIMENTOS (página home)
// =============================================
async function carregarDepoimentos() {
    var resposta = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=3');
    var dados = await resposta.json();

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

carregarDepoimentos();

// =============================================
// ENVIO DO FORMULÁRIO DE CONTATO (POST)
// =============================================
var formContato = document.getElementById('form-contato');
if (formContato) {
    formContato.addEventListener('submit', async function(e) {
        e.preventDefault();

        var nome = document.getElementById('nome').value;
        var email = document.getElementById('email').value;
        var mensagem = document.getElementById('mensagem').value;

        var dados = {
            title: nome,
            body: mensagem,
            userId: 1,
            email: email
        };

        var alertaDiv = document.getElementById('alerta-contato');

        try {
            var resposta = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            if (resposta.status === 201) {
                alertaDiv.innerHTML = '<div class="alert alert-success">Mensagem enviada com sucesso! Obrigado pelo contato.</div>';
                formContato.reset();
            } else {
                alertaDiv.innerHTML = '<div class="alert alert-danger">Erro ao enviar mensagem. Tente novamente.</div>';
            }
        } catch (erro) {
            alertaDiv.innerHTML = '<div class="alert alert-danger">Erro de conexão. Verifique sua internet e tente novamente.</div>';
        }
    });
}

// =============================================
// INICIALIZAÇÃO
// =============================================
atualizarContador();
renderizarCarrinho();

import { carregarDepoimentos, enviarFormContato } from './api.js';
import {
    renderizarDepoimentos,
    exibirAlerta,
    calcularTotal,
    atualizarContador,
    adicionarAoCarrinho,
    renderizarCarrinho,
    preencherModal
} from './ui.js';

// =============================================
// ORÇAMENTO (página produtos)
// =============================================
var checkboxes = document.querySelectorAll('.item-produto');
var quantidades = document.querySelectorAll('.qtd-produto');

for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', calcularTotal);
    quantidades[i].addEventListener('change', calcularTotal);
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
// CHECKOUT (formulário do carrinho)
// =============================================
var formCheckout = document.getElementById('form-checkout');
if (formCheckout) {
    formCheckout.addEventListener('submit', function(e) {
        e.preventDefault();

        var carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        localStorage.removeItem('carrinho');
        document.getElementById('tabela-carrinho').style.display = 'none';
        document.getElementById('secao-checkout').style.display = 'none';
        document.querySelector('.d-flex.justify-content-between').style.display = 'none';
        document.getElementById('pedido-sucesso').style.display = 'block';
        atualizarContador();
    });
}

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

        try {
            var resposta = await enviarFormContato(dados);

            if (resposta.status === 201) {
                exibirAlerta('alerta-contato', 'success', 'Mensagem enviada com sucesso! Obrigado pelo contato.');
                formContato.reset();
            } else {
                exibirAlerta('alerta-contato', 'danger', 'Erro ao enviar mensagem. Tente novamente.');
            }
        } catch (erro) {
            exibirAlerta('alerta-contato', 'danger', 'Erro de conexão. Verifique sua internet e tente novamente.');
        }
    });
}

// =============================================
// DEPOIMENTOS (página home)
// =============================================
async function iniciarDepoimentos() {
    try {
        var dados = await carregarDepoimentos();
        renderizarDepoimentos(dados);
    } catch (erro) {
        console.error('Erro ao carregar depoimentos:', erro);
    }
}

iniciarDepoimentos();

// =============================================
// MODAL DINÂMICO (página produtos)
// =============================================
var modalProduto = document.getElementById('modalProduto');
if (modalProduto) {
    modalProduto.addEventListener('show.bs.modal', preencherModal);
}

// =============================================
// INICIALIZAÇÃO
// =============================================
atualizarContador();
renderizarCarrinho();

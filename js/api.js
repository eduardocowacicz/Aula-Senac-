// =============================================
// FUNÇÕES DE COMUNICAÇÃO COM APIs
// =============================================

export async function carregarDepoimentos() {
    var resposta = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=3');
    var dados = await resposta.json();
    return dados;
}

export async function enviarFormContato(dados) {
    var resposta = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dados)
    });
    return resposta;
}

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

      document.getElementById('valor-total').textContent =
  total.toFixed(2).replace('.', ',');
  }

  var checkboxes = document.querySelectorAll('.item-produto');
  var quantidades = document.querySelectorAll('.qtd-produto');

  for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('change', calcularTotal);
      quantidades[i].addEventListener('change', calcularTotal);
  }

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

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
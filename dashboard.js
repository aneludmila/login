const transacoes = [];

function adicionarTransacao() {
  const descricao = document.getElementById('descricao').value;
  const valor = parseFloat(document.getElementById('valor').value);

  if (!descricao || isNaN(valor)) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  transacoes.push({ descricao, valor });
  atualizarLista();
  atualizarGraficos();

  document.getElementById('descricao').value = '';
  document.getElementById('valor').value = '';
}

function atualizarLista() {
  const lista = document.getElementById('lista-transacoes');
  lista.innerHTML = '';
  transacoes.forEach(t => {
    const li = document.createElement('li');
    li.textContent = `${t.descricao}: R$ ${t.valor.toFixed(2)}`;
    lista.appendChild(li);
  });
}

function atualizarGraficos() {
  const descricoes = transacoes.map(t => t.descricao);
  const valores = transacoes.map(t => t.valor);

  if (window.graficoPizza) window.graficoPizza.destroy();
  if (window.graficoBarra) window.graficoBarra.destroy();

  const ctxPizza = document.getElementById('graficoPizza').getContext('2d');
  const ctxBarra = document.getElementById('graficoBarra').getContext('2d');

  window.graficoPizza = new Chart(ctxPizza, {
    type: 'pie',
    data: {
      labels: descricoes,
      datasets: [{
        label: 'Transações',
        data: valores,
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#e91e63', '#9c27b0'],
      }]
    }
  });

  window.graficoBarra = new Chart(ctxBarra, {
    type: 'bar',
    data: {
      labels: descricoes,
      datasets: [{
        label: 'Valores (R$)',
        data: valores,
        backgroundColor: '#4caf50'
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

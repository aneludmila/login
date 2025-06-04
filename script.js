document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  if (!email || !senha) {
    mostrarErro("Por favor, preencha todos os campos.");
    return;
  }

  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = 'dashboard.html'; // redireciona para o dashboard
    } else {
      mostrarErro(data.message || "Erro ao fazer login.");
    }
  } catch (err) {
    mostrarErro("Erro de conexão com o servidor.");
    console.error(err);
  }
});

function mostrarErro(msg) {
  const div = document.getElementById('error-message');
  div.textContent = msg;
}

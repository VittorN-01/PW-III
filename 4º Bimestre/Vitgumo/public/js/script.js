// --- CARROSSEL ---
const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.card');

if (track && cards.length > 0) {
    let index = 0;

    function showSlide(i) {
        const cardWidth = cards[0].offsetWidth + 10; // largura + margin
        track.scrollLeft = i * cardWidth;
    }

    setInterval(() => {
        index++;
        if (index >= cards.length) index = 0;
        showSlide(index);
    }, 3000);
}

// --- BOTÃO DE BUSCA ---
// Função que redireciona para a página de resultados
function buscarProduto() {
    const termo = document.getElementById("txtBusca").value.trim();
    if (termo) {
        window.location.href = `/vitgumo/1.0.0/resultado?q=${encodeURIComponent(termo)}`;
    }
}

// Clique na lupa
const btnBusca = document.getElementById("btnBusca");
if (btnBusca) {
    btnBusca.addEventListener("click", (e) => {
        e.preventDefault();
        buscarProduto();
    });
}

// Enter no input
const txtBusca = document.getElementById("txtBusca");
if (txtBusca) {
    txtBusca.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // evita submit padrão
            buscarProduto();
        }
    });
}


// --- QUANTIDADE DE PRODUTO COM ESTOQUE ---
document.querySelectorAll('.produto').forEach(produto => {
  const mais = produto.querySelector('.mais');
  const menos = produto.querySelector('.menos');
  const span = produto.querySelector('.quantidade span');
  const estoque = parseInt(produto.dataset.estoque); 

  // Evento de adicionar
  mais.addEventListener('click', () => {
    let qtd = parseInt(span.textContent);
    if (qtd < estoque) {
      span.textContent = qtd + 1;
    } else {
      alert("Produto sem estoque suficiente!");
    }
  });

  // Evento de remover
  menos.addEventListener('click', () => {
    let qtd = parseInt(span.textContent);
    if (qtd > 1) {
      span.textContent = qtd - 1;
    }
  });
});


//adicionar no carrinho
const btns = document.querySelectorAll('.btn-carrinho');
btns.forEach(btn => {
  btn.addEventListener('click', async (e) => {
    const produto = e.target.closest('.produto');
    const idProduto = produto.dataset.id;
    const qtd = parseInt(produto.querySelector('.quantidade span').textContent);
    const estoque = parseInt(produto.dataset.estoque);

    if (!idProduto) { alert("Produto inválido!"); return; }
    if (estoque === 0 || qtd > estoque) { alert("Quantidade maior que estoque"); return; }

    try {
      const res = await fetch('/vitgumo/1.0.0/carrinho/adicionar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idProduto, quantidade: qtd })
      });
      const data = await res.json();
      alert(data.message);
    } catch (erro) {
      console.error(erro);
      alert("Erro ao adicionar ao carrinho");
    }
  });
});

// Função de + e - do carrinho
document.addEventListener('DOMContentLoaded', () => {
  const lista = document.getElementById('lista-carrinho');

  lista.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    const preco = parseFloat(li.dataset.preco);
    const qtdSpan = li.querySelector('.quantidade');
    const totalSpan = li.querySelector('.total-item');

    let quantidade = parseInt(qtdSpan.textContent);

    // Botão "+"
    if (e.target.classList.contains('mais')) {
      quantidade++;
    }

    // Botão "-"
    if (e.target.classList.contains('menos')) {
      if (quantidade > 1) quantidade--;
    }

    // Atualiza o DOM
    qtdSpan.textContent = quantidade;
    totalSpan.textContent = `Total: R$ ${(quantidade * preco).toFixed(2)}`;

    // Botão "Remover"
    if (e.target.classList.contains('remover')) {
      li.remove();
    }

  });
});


// --- LOGIN & CADASTRO ---
document.addEventListener("DOMContentLoaded", () => {
  const loginScreen = document.getElementById("login-screen");
  const registerScreen = document.getElementById("register-screen");

  if (loginScreen && registerScreen) {
    // Inicialmente mostra cadastro
    registerScreen.style.display = "block";
    loginScreen.style.display = "none";

    // Botões alternar telas
    document.getElementById("register-login-button").onclick = (e) => {
      e.preventDefault();
      registerScreen.style.display = "none";
      loginScreen.style.display = "block";
    };

    document.getElementById("login-register-button").onclick = (e) => {
      e.preventDefault();
      loginScreen.style.display = "none";
      registerScreen.style.display = "block";
    };

    // --- CADASTRO ---
    const registerForm = document.getElementById("register-form");
    const registerMsg = document.getElementById("register-msg");

    registerForm.addEventListener("submit", async function(e) {
      e.preventDefault();

      const nome = this.nome.value.trim();
      const cpf = this.cpf.value.trim();
      const email = this.email.value.trim();
      const password = this.password.value.trim();
      const Cpassword = this.Cpassword.value.trim();

      if (password !== Cpassword) {
        registerMsg.textContent = "As senhas não coincidem!";
        return;
      }

      try {
        const res = await fetch("/vitgumo/1.0.0/cadastro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, cpf, email, senha: password })
        });

        const data = await res.json();
        if (data.success) {
          registerMsg.textContent = "Cadastro realizado com sucesso!";
          window.location.href = "/"; // redireciona home e atualiza sessão
        } else {
          registerMsg.textContent = data.message;
        }
      } catch (err) {
        registerMsg.textContent = "Erro ao cadastrar.";
      }
    });

    // --- LOGIN ---
    const loginForm = document.getElementById("login-form");
    const loginMsg = document.getElementById("login-msg");

    loginForm.addEventListener("submit", async function(e) {
      e.preventDefault();

      const cpfEmail = this['cpf-email'].value.trim();
      const password = this.password.value.trim();

      try {
        const res = await fetch("/vitgumo/1.0.0/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cpfEmail, senha: password })
        });

        const data = await res.json();
        if (data.success) {
          loginMsg.textContent = "Login realizado com sucesso!";
          window.location.href = "/"; // redireciona home e atualiza sessão
        } else {
          loginMsg.textContent = data.message;
        }
      } catch (err) {
        loginMsg.textContent = "Erro ao fazer login.";
      }
    });
  }
});

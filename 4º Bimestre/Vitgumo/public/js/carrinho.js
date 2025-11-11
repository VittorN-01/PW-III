// public/js/carrinho.js
document.addEventListener("DOMContentLoaded", () => {
  const tipoEntrega = document.getElementById("tipoEntrega");
  const endereco = document.getElementById("endereco");
  const labelEndereco = document.getElementById("labelEndereco");
  const form = document.getElementById("form-finalizar");

  // 🔄 Atualiza visibilidade do campo de endereço
  function atualizarEndereco() {
    if (tipoEntrega.value === "retirar") {
      endereco.style.display = "none";
      labelEndereco.style.display = "none";
      endereco.removeAttribute("required");
      endereco.value = "";
    } else {
      endereco.style.display = "block";
      labelEndereco.style.display = "block";
      endereco.setAttribute("required", "true");
    }
  }

  tipoEntrega.addEventListener("change", atualizarEndereco);
  atualizarEndereco(); // executa no carregamento inicial

  // ✅ Validação antes de enviar
  form.addEventListener("submit", (e) => {
    if (tipoEntrega.value === "entrega" && endereco.value.trim() === "") {
      e.preventDefault();
      alert("Por favor, informe o endereço para entrega.");
      endereco.focus();
    }
  });
});

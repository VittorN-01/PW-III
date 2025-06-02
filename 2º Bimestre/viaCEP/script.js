async function buscarCep() {
  const cep = document.getElementById('cep').value.trim();
  const resultado = document.getElementById('resultado');

  if (cep.length !== 8 || isNaN(cep)) {
    resultado.innerHTML = "<p style='color: red;'>CEP inválido. Digite 8 números.</p>";
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      resultado.innerHTML = "<p style='color: red;'>CEP não encontrado.</p>";
    } else {
      resultado.innerHTML = `
        <table>
          <tr><th>Campo</th><th>Valor</th></tr>
          <tr><td>Logradouro</td><td>${data.logradouro || '-'}</td></tr>
          <tr><td>Bairro</td><td>${data.bairro || '-'}</td></tr>
          <tr><td>Cidade</td><td>${data.localidade || '-'}</td></tr>
          <tr><td>Estado</td><td>${data.uf || '-'}</td></tr>
        </table>
        <div style="text-align:center; margin-top:15px;">
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`)}" target="_blank">
            <button style="margin-top:10px; padding:10px 20px; background-color:#28a745; color:white; border:none; border-radius:8px; cursor:pointer;">
              Ver no Google Maps
            </button>
          </a>
        </div>
      `;
    }
  } catch (error) {
    resultado.innerHTML = "<p style='color: red;'>Erro ao buscar o CEP. Tente novamente.</p>";
    console.error(error);
  }
}

function adicionarAtivo() {
  const div = document.createElement('div');
  div.classList.add('ativo');
  div.innerHTML = `
    <input type="text" placeholder="Nome do ativo" class="nome">
    <input type="number" placeholder="Dose desejada (mg)" class="dose">
    <input type="number" placeholder="Teor (%) - opcional" class="teor">
    <button class="remover" onclick="removerAtivo(this)">–</button>
  `;
  document.getElementById('ativos').appendChild(div);
}

function removerAtivo(botao) {
  const div = botao.parentElement;
  div.remove();
}

function limparTudo() {
  document.getElementById('ativos').innerHTML = `
    <div class="ativo">
      <input type="text" placeholder="Nome do ativo" class="nome">
      <input type="number" placeholder="Dose desejada (mg)" class="dose">
      <input type="number" placeholder="Teor (%) - opcional" class="teor">
      <button class="remover" onclick="removerAtivo(this)">–</button>
    </div>
  `;
  document.getElementById('resultado').innerHTML = '';
}

function calcular() {
  const nomes = document.querySelectorAll('.nome');
  const doses = document.querySelectorAll('.dose');
  const teores = document.querySelectorAll('.teor');
  const ativos = [];

  for (let i = 0; i < nomes.length; i++) {
    const nome = nomes[i].value || `Ativo ${i+1}`;
    const dose = parseFloat(doses[i].value);
    const teor = parseFloat(teores[i].value) || 100;

    if (!isNaN(dose)) {
      const doseCorrigida = dose / (teor / 100);
      ativos.push({ nome, doseCorrigida });
    }
  }

  const doseTotal = ativos.reduce((s, a) => s + a.doseCorrigida, 0);
  const capsulas = Math.ceil(doseTotal / 600);

  let resultadoHTML = `<strong>Dose total corrigida:</strong> ${doseTotal.toFixed(2)} mg<br>`;
  resultadoHTML += `<strong>Cápsulas necessárias por dose:</strong> ${capsulas}<br><br>`;

  resultadoHTML += `<table><tr><th>Ativo</th><th>mg por cápsula</th></tr>`;
  let somaPorCapsula = 0;
  ativos.forEach(a => {
    const porCapsula = a.doseCorrigida / capsulas;
    somaPorCapsula += porCapsula;
    resultadoHTML += `<tr><td>${a.nome}</td><td>${porCapsula.toFixed(2)}</td></tr>`;
  });
  resultadoHTML += `<tr><td><strong>Excipiente</strong></td><td>${(600 - somaPorCapsula).toFixed(2)}</td></tr>`;
  resultadoHTML += `</table>`;

  document.getElementById('resultado').innerHTML = resultadoHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'http://localhost:3000/api/discos';

  const discoForm = document.getElementById('disco-form');
  const discoList = document.getElementById('disco-list');
  const discoIdInput = document.getElementById('disco-id');
  const btnLimpar = document.getElementById('btn-limpar');
  
  // Elementos do formulário
  const tituloInput = document.getElementById('titulo');
  const artistaInput = document.getElementById('artista');
  const anoInput = document.getElementById('ano');
  const generoInput = document.getElementById('genero');
  const formatoInput = document.getElementById('formato');
  const precoInput = document.getElementById('preco');

  // --- Funções ---

  /** Limpa o formulário e o campo de ID oculto */
  const limparFormulario = () => {
    discoForm.reset();
    discoIdInput.value = '';
    document.getElementById('btn-salvar').textContent = 'Salvar';
  };

  /** Carrega e exibe todos os discos na tabela */
  const carregarDiscos = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Erro ao buscar discos');
      const discos = await response.json();

      discoList.innerHTML = ''; // Limpa a lista antes de adicionar
      discos.forEach(disco => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${disco.titulo}</td>
          <td>${disco.artista}</td>
          <td>${disco.ano}</td>
          <td>${disco.formato}</td>
          <td>R$ ${Number(disco.preco).toFixed(2)}</td>
          <td>
            <button class="btn-editar" data-id="${disco._id}">Editar</button>
            <button class="btn-excluir" data-id="${disco._id}">Excluir</button>
          </td>
        `;
        discoList.appendChild(tr);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  /** Preenche o formulário com dados para edição */
  const carregarDiscoParaEdicao = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      if (!response.ok) throw new Error('Erro ao buscar disco para edição');
      const disco = await response.json();

      discoIdInput.value = disco._id;
      tituloInput.value = disco.titulo;
      artistaInput.value = disco.artista;
      anoInput.value = disco.ano;
      generoInput.value = disco.genero;
      formatoInput.value = disco.formato;
      precoInput.value = disco.preco;

      document.getElementById('btn-salvar').textContent = 'Atualizar';
      window.scrollTo(0, 0); // Rola para o topo (onde está o form)
    } catch (error) {
      console.error(error.message);
    }
  };

  /** Exclui um disco */
  const excluirDisco = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este disco?')) {
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao excluir disco');
      
      alert('Disco excluído com sucesso!');
      carregarDiscos(); // Recarrega a lista
    } catch (error) {
      console.error(error.message);
      alert('Falha ao excluir disco.');
    }
  };

  // --- Event Listeners ---

  /** Event listener para o envio do formulário (Criar ou Atualizar) */
  discoForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    const id = discoIdInput.value;
    const isUpdating = !!id; // Verifica se é uma atualização (se o ID existe)

    const discoData = {
      titulo: tituloInput.value,
      artista: artistaInput.value,
      ano: parseInt(anoInput.value, 10),
      genero: generoInput.value,
      formato: formatoInput.value,
      preco: parseFloat(precoInput.value),
    };

    const method = isUpdating ? 'PUT' : 'POST';
    const url = isUpdating ? `${apiUrl}/${id}` : apiUrl;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discoData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao salvar: ${errorData.message}`);
      }
      
      alert(`Disco ${isUpdating ? 'atualizado' : 'cadastrado'} com sucesso!`);
      limparFormulario();
      carregarDiscos(); // Recarrega a lista

    } catch (error) {
      console.error(error.message);
      alert('Falha ao salvar disco.');
    }
  });

  /** Event listener para botões de Limpar, Editar e Excluir */
  btnLimpar.addEventListener('click', limparFormulario);

  discoList.addEventListener('click', (e) => {
    const target = e.target;
    const id = target.dataset.id;

    if (target.classList.contains('btn-editar')) {
      carregarDiscoParaEdicao(id);
    } else if (target.classList.contains('btn-excluir')) {
      excluirDisco(id);
    }
  });

  // --- Inicialização ---
  carregarDiscos();
});
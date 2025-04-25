// Variáveis principais do jogo
let points = 0;
let currentLevel = 1;
let correctItems = 0; // Contador de itens corretos no nível atual

// Defina as pontuações mínimas para avançar em cada nível
const minScores = [30, 90, 120]; // Exemplo: Nível 1 = 30 pontos, Nível 2 = 60 pontos, Nível 3 = 90 pontos

// Seleciona elementos do DOM
const itemsContainer = document.getElementById('items');
const scoreDisplay = document.getElementById('points');
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');
const feedbackContainer = document.getElementById('feedback-container');
const levelDisplay = document.getElementById('currentLevel');

// Função para iniciar o arrasto
function addDragListeners() {
  document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart);
  });
}

function addBinListeners() {
  const bins = document.querySelectorAll('.bin'); // Seleciona todas as lixeiras atuais
  bins.forEach(bin => {
    bin.addEventListener('dragover', dragOver);
    bin.addEventListener('drop', dropItem);
  });
}

function dragStart(e) {
  e.dataTransfer.setData('text', e.target.id);
}

function dragOver(e) {
  e.preventDefault();
}

// Função chamada ao soltar um item
function dropItem(e) {
  e.preventDefault();
  const itemId = e.dataTransfer.getData('text');
  const item = document.getElementById(itemId);

  // Verifica se o item corresponde à lixeira correta
  if (e.target.id.includes(itemId.split('-')[0])) {
    e.target.appendChild(item);
    updateScore(10); // Aumenta a pontuação por acerto
    displayMessage('Você acertou!', true); // Exibe mensagem de sucesso
    correctSound.play(); // Toca som de acerto
    correctItems++; // Incrementa o número de itens corretos

    // Verifica se todos os itens do nível foram colocados corretamente
    if (correctItems === items.length) {
      checkAdvanceLevel(); // Verifica se a pontuação é suficiente para avançar
    }

  } else {
    updateScore(-5); // Penalidade por erro
    displayMessage('Tente novamente!', false); // Exibe mensagem de erro
    incorrectSound.play(); // Toca som de erro
  }
}

// Atualiza a pontuação e exibe no DOM
function updateScore(value) {
  points += value;
  scoreDisplay.textContent = points;
}

// Verifica se a pontuação é suficiente para avançar de nível ou reinicia o jogo
function checkAdvanceLevel() {
  const requiredScore = minScores[currentLevel - 1]; // Pontuação mínima para o nível atual

  if (points >= requiredScore) {
    nextLevel(); // Avança para o próximo nível
  } else {
    displayMessage(`Pontuação insuficiente! Você precisa de ${requiredScore} pontos para avançar.`, false);
    setTimeout(resetGame, 3000); // Reinicia o jogo após 3 segundos
  }
}

// Passa para o próximo nível ou finaliza o jogo
function nextLevel() {
  currentLevel++;

  if (currentLevel > 3) {
    endGame(); // Finaliza o jogo após o nível 3
  } else {
    displayMessage('Parabéns! Próximo nível!', true);
    levelDisplay.textContent = currentLevel;
    loadLevel(currentLevel); // Carrega o próximo nível
  }
}

// Reinicia o jogo ao voltar para o nível 1 e zera a pontuação
function resetGame() {
  currentLevel = 1;
  points = 0;
  correctItems = 0;
  scoreDisplay.textContent = points;
  levelDisplay.textContent = currentLevel;
  displayMessage('Jogo reiniciado!', true);
  loadLevel(currentLevel); // Reinicia no nível 1
}

// Função para finalizar o jogo (exibir mensagem final, salvar pontuação, etc.)
function endGame() {
  displayMessage('Parabéns! Você concluiu o jogo!', true);
  // Outras ações, como salvar a pontuação final, podem ser adicionadas aqui
}

// Função para exibir feedback visual
function displayMessage(message, success) {
  feedbackContainer.textContent = message;
  feedbackContainer.className = success ? 'correct' : 'incorrect'; 
  feedbackContainer.style.display = 'block';

  // Remove a mensagem após 1 segundos
  setTimeout(() => {
    feedbackContainer.style.display = 'none';
  }, 1000);
}

function shuffleItems() {
  items.sort(() => Math.random() - 0.5);
  itemsContainer.innerHTML = ''; // Limpa os itens atuais
  
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.id = item.id;
    div.draggable = true;
    div.style.textAlign = 'center'; // Centraliza o conteúdo

    // Criar a imagem
    const img = document.createElement('img');
    img.src = item.image; // Usando a imagem que você passou no array de itens
    img.alt = item.name;  // Usando o nome do item como descrição alternativa
    img.style.width = '50px'; // Ajusta o tamanho da imagem

    // Criar o texto abaixo da imagem
    const name = document.createElement('div');
    name.textContent = item.name; // O nome do item
    name.style.marginTop = '5px'; // Adiciona espaço entre a imagem e o texto

    // Adiciona a imagem e o nome ao item (div)
    div.appendChild(img);
    div.appendChild(name);

    itemsContainer.appendChild(div);
  });

  addDragListeners(); // Adiciona os ouvintes de arrasto aos novos elementos
}

function nextLevel() {
  currentLevel++;
  
  if (currentLevel > 3) {
    endGame(); // Finaliza o jogo após o nível 3
  } else {
    displayMessage('Parabéns! Próximo nível!', true);
    levelDisplay.textContent = currentLevel;
    loadLevel(currentLevel);
  }
}
function loadLevel(level) {
  correctItems = 0;

  clearBins(); // Limpa as lixeiras existentes antes de adicionar as novas

  const binsContainer = document.getElementById('bins');
  binsContainer.innerHTML = ''; // Limpa o contêiner antes de adicionar novas lixeiras

  // Crie as lixeiras do nível 1 (sempre presentes)
  const papelBin = document.createElement('div');
  papelBin.className = 'bin';
  papelBin.id = 'papel-bin';
  papelBin.textContent = 'Papel';
  papelBin.style.backgroundColor = '#ADD8E6'; // Azul claro

  const plasticoBin = document.createElement('div');
  plasticoBin.className = 'bin';
  plasticoBin.id = 'plastico-bin';
  plasticoBin.textContent = 'Plástico';
  plasticoBin.style.backgroundColor = '#FFA500'; // Laranja

  const vidroBin = document.createElement('div');
  vidroBin.className = 'bin';
  vidroBin.id = 'vidro-bin';
  vidroBin.textContent = 'Vidro';
  vidroBin.style.backgroundColor = '#32CD32'; // Verde

  const organicoBin = document.createElement('div');
  organicoBin.className = 'bin';
  organicoBin.id = 'organico-bin';
  organicoBin.textContent = 'Orgânico';
  organicoBin.style.backgroundColor = '#8B4513'; // Marrom

  // Adiciona as lixeiras ao contêiner
  binsContainer.appendChild(papelBin);
  binsContainer.appendChild(plasticoBin);
  binsContainer.appendChild(vidroBin);
  binsContainer.appendChild(organicoBin);

  // Adicionar itens e lixeiras extras para cada nível
  if (level === 1) {
    items = [ // Defina os itens para o nível 1
      { id: 'papel', name: 'Papel', image: 'imagens/papel.png' },
      { id: 'plastico', name: 'Plástico', image: 'imagens/plastico.png' },
      { id: 'vidro', name: 'Vidro', image: 'imagens/vidro.png' },
      { id: 'organico', name: 'Orgânico', image: 'imagens/organico.png' }
    ];

  } else if (level === 2) {
    // Itens adicionais para o nível 2
    items.push(
      { id: 'metal', name: 'Metal', image: 'imagens/metal.png' },
      { id: 'eletronico', name: 'Eletrônico', image: 'imagens/eletronico.png' }
    );

    // Lixeiras adicionais para o nível 2
    const metalBin = document.createElement('div');
    metalBin.className = 'bin';
    metalBin.id = 'metal-bin';
    metalBin.textContent = 'Metal';
    metalBin.style.backgroundColor = '#B0C4DE'; // Cinza claro

    const eletronicoBin = document.createElement('div');
    eletronicoBin.className = 'bin';
    eletronicoBin.id = 'eletronico-bin';
    eletronicoBin.textContent = 'Eletrônico';
    eletronicoBin.style.backgroundColor = '#696969'; // Cinza escuro

    binsContainer.appendChild(metalBin);
    binsContainer.appendChild(eletronicoBin);

  } else if (level === 3) {
    // Itens adicionais para o nível 3
    items.push(
      { id: 'bateria', name: 'Bateria', image: 'imagens/bateria.png' },
      { id: 'oleo', name: 'Óleo', image: 'imagens/oleo.png' }
    );

    // Lixeiras adicionais para o nível 2 e 3
    const metalBin = document.createElement('div');
    metalBin.className = 'bin';
    metalBin.id = 'metal-bin';
    metalBin.textContent = 'Metal';
    metalBin.style.backgroundColor = '#B0C4DE'; // Cinza claro

    const eletronicoBin = document.createElement('div');
    eletronicoBin.className = 'bin';
    eletronicoBin.id = 'eletronico-bin';
    eletronicoBin.textContent = 'Eletrônico';
    eletronicoBin.style.backgroundColor = '#696969'; // Cinza escuro

    const bateriaBin = document.createElement('div');
    bateriaBin.className = 'bin';
    bateriaBin.id = 'bateria-bin';
    bateriaBin.textContent = 'Bateria';
    bateriaBin.style.backgroundColor = '#FF0000'; // Vermelho

    const oleoBin = document.createElement('div');
    oleoBin.className = 'bin';
    oleoBin.id = 'oleo-bin';
    oleoBin.textContent = 'Óleo';
    oleoBin.style.backgroundColor = '#FFD700'; // Amarelo

    binsContainer.appendChild(metalBin);
    binsContainer.appendChild(eletronicoBin);
    binsContainer.appendChild(bateriaBin);
    binsContainer.appendChild(oleoBin);
  }

  shuffleItems(); // Embaralha e mostra os itens na tela
  addBinListeners(); // Adiciona os ouvintes às lixeiras
}


function clearBins() {
  const bins = document.querySelectorAll('.bin'); // Seleciona todas as lixeiras

  bins.forEach(bin => {
    // Limpa o conteúdo da lixeira
    bin.textContent = '';

    // Cria o rótulo da lixeira
    const label = document.createElement('div');

    // Atribui o rótulo e a cor de fundo com base no ID da lixeira
    switch (bin.id) {
      case 'papel-bin':
        label.textContent = 'Papel';
        bin.style.setProperty('background-color', '#ADD8E6', 'important'); // Azul claro
        break;
      case 'plastico-bin':
        label.textContent = 'Plástico';
        bin.style.setProperty('background-color', '#FFA500', 'important'); // Laranja
        break;
      case 'vidro-bin':
        label.textContent = 'Vidro';
        bin.style.setProperty('background-color', '#32CD32', 'important'); // Verde
        break;
      case 'organico-bin':
        label.textContent = 'Orgânico';
        bin.style.setProperty('background-color', '#8B4513', 'important'); // Marrom
        break;
      case 'metal-bin':
        label.textContent = 'Metal';
        bin.style.setProperty('background-color', '#B0C4DE', 'important'); // Cinza claro
        break;
      case 'eletronico-bin':
        label.textContent = 'Eletrônico';
        bin.style.setProperty('background-color', '#696969', 'important'); // Cinza escuro
        break;
      case 'bateria-bin':
        label.textContent = 'Bateria';
        bin.style.setProperty('background-color', '#FF0000', 'important'); // Vermelho
        break;
      case 'oleo-bin':
        label.textContent = 'Óleo';
        bin.style.setProperty('background-color', '#FFD700', 'important'); // Amarelo
        break;
      default:
        bin.style.setProperty('background-color', '#FFFFFF', 'important'); // Cor padrão (branco)
    }

    // Adiciona o rótulo à lixeira
    bin.appendChild(label);
  });
}

function endGame() {
  displayMessage('Parabéns! Você chegou ao fim do jogo!', true);

  document.querySelectorAll('.item').forEach(item => {
    item.setAttribute('draggable', false);
  });
  document.querySelectorAll('.bin').forEach(bin => {
    bin.removeEventListener('dragover', dragOver);
    bin.removeEventListener('drop', dropItem);
  });

  // Cria um contêiner para a mensagem de fim de jogo e o botão
  const endContainer = document.createElement('div');
  endContainer.style.display = 'flex';
  endContainer.style.flexDirection = 'column';
  endContainer.style.alignItems = 'center';
  endContainer.style.justifyContent = 'center';
  endContainer.style.position = 'fixed';
  endContainer.style.top = '50%';
  endContainer.style.left = '50%';
  endContainer.style.transform = 'translate(-50%, -50%)';
  endContainer.style.backgroundColor = '#4caf50';
  endContainer.style.padding = '20px';
  endContainer.style.borderRadius = '10px';
  endContainer.style.color = 'white';
  endContainer.style.textAlign = 'center';

  // Adiciona a mensagem de fim de jogo
  const gameOverScreen = document.createElement('div');
  gameOverScreen.id = 'game-over';
  gameOverScreen.textContent = 'Parabéns! Você chegou ao fim do jogo!';
  gameOverScreen.style.fontSize = '20px';
  gameOverScreen.style.marginBottom = '20px'; // Adiciona espaço entre a frase e o botão

  // Adiciona o botão "Jogar Outra Vez"
  const restartButton = document.createElement('button');
  restartButton.textContent = 'Jogar Outra Vez';
  restartButton.style.padding = '10px 20px';
  restartButton.style.fontSize = '20px';
  restartButton.style.color = 'white';
  restartButton.style.backgroundColor = '#2196F3';
  restartButton.style.border = 'none';
  restartButton.style.borderRadius = '5px';
  restartButton.style.cursor = 'pointer';

  // Efeito de acender e apagar usando opacidade
  restartButton.style.transition = 'opacity 0.4s ease-in-out';
  let blinking = setInterval(() => {
    if (restartButton.style.opacity === '0') {
      restartButton.style.opacity = '1'; // Aumenta a opacidade
    } else {
      restartButton.style.opacity = '0'; // Diminui a opacidade
    }
  }, 400);

  restartButton.onclick = function() {
    clearInterval(blinking); // Para o efeito de piscar
    location.reload(); // Recarrega a página
  };

  // Adiciona a mensagem e o botão ao contêiner
  endContainer.appendChild(gameOverScreen);
  endContainer.appendChild(restartButton);

  // Adiciona o contêiner ao body
  document.body.appendChild(endContainer);
}
document.addEventListener('DOMContentLoaded', () => {
  const backgroundMusic = document.getElementById('background-music');
  const toggleMusicButton = document.getElementById('toggle-music');

  // Alterna a música de fundo ao clicar no botão
  toggleMusicButton.addEventListener('click', () => {
      if (backgroundMusic.paused) {
          backgroundMusic.play().catch(error => {
              console.log("Não foi possível reproduzir a música de fundo: ", error);
          });
          toggleMusicButton.textContent = "Parar Música";
      } else {
          backgroundMusic.pause();
          toggleMusicButton.textContent = "Iniciar Música";
      }
  });
});

// Carrega o nível inicial
loadLevel(currentLevel);
addDragListeners();
addBinListeners();

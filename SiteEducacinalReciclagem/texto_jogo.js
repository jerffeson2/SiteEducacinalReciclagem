const imgContainer = document.querySelector('.img-container');
const imgHoverText = document.querySelector('.img-hover-text');

// Mostrar o texto quando o mouse entra na imagem
imgContainer.addEventListener('mouseenter', () => {
    imgHoverText.style.display = 'block'; // Mostrar o texto
});

// Ocultar o texto quando o mouse sai da imagem
imgContainer.addEventListener('mouseleave', () => {
    imgHoverText.style.display = 'none'; // Ocultar o texto
});

// Atualizar a posição do texto com base na posição do mouse
imgContainer.addEventListener('mousemove', (event) => {
    const rect = imgContainer.getBoundingClientRect(); // Obter a posição do contêiner da imagem
    const x = event.clientX - rect.left; // Posição X do mouse em relação ao contêiner
    const y = event.clientY - rect.top; // Posição Y do mouse em relação ao contêiner

    const offsetX = 15; // Deslocamento em pixels para a direita
    const offsetY = 15; // Deslocamento em pixels para baixo

    
    imgHoverText.style.left = `${x + offsetX}px`; 
    imgHoverText.style.top = `${y + offsetY}px`; 
    
});

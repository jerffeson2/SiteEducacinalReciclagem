// Obtém os elementos do formulário e a área de mensagem
const form = document.getElementById('contatoForm');
const mensagemDiv = document.getElementById('mensagem');

// Adiciona um listener para o evento de envio do formulário
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Obtém os valores dos campos
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Valida os campos
    if (!nome || !email || !mensagem) {
        exibirMensagem('Todos os campos são obrigatórios.', 'error');
        return;
    }

    // Aqui você pode adicionar a lógica para enviar os dados para o servidor

    // Exibe mensagem de sucesso
    exibirMensagem('Mensagem enviada com sucesso!', 'success');

    // Limpa os campos após o envio
    form.reset();
});

// Função para exibir mensagens de feedback
function exibirMensagem(mensagem, tipo) {
    mensagemDiv.textContent = mensagem; // Define o texto da mensagem
    mensagemDiv.className = tipo; // Adiciona a classe para estilização

    // Limpa a mensagem após 5 segundos
    setTimeout(() => {
        mensagemDiv.textContent = '';
        mensagemDiv.className = '';
    }, 5000);
}

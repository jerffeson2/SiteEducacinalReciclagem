// Obtém os elementos do formulário e a área de mensagem
const form = document.getElementById('cadastroForm');
const mensagemDiv = document.getElementById('mensagem');

// Adiciona um listener para o evento de envio do formulário
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Obtém os valores dos campos
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar_senha').value;

    // Valida os campos
    if (!nome || !email || !senha || !confirmarSenha) {
        exibirMensagem('Todos os campos são obrigatórios.', 'error');
        return;
    }

    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
        exibirMensagem('As senhas não coincidem.', 'error');
        return;
    }

    fetch('processar_cadastro.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            exibirMensagem('Cadastro realizado com sucesso!', 'success');
            form.reset();
        } else {
            exibirMensagem(data.message, 'error');
        }
    })
    .catch(error => {
        exibirMensagem('Ocorreu um erro ao processar o cadastro.', 'error');
    });
    

    // Se tudo estiver correto, exibe uma mensagem de sucesso
    exibirMensagem('Cadastro realizado com sucesso!', 'success');

    // Limpa o formulário após o cadastro
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

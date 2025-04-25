// Adiciona um listener para o evento de envio do formulário
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Obtém os valores dos campos
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    // Valida os campos
    if (!email || !senha) {
        exibirMensagem('Todos os campos são obrigatórios.', 'error');
        return;
    }

    // Envia os dados para o servidor para validação
    fetch('processar_login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            exibirMensagem('Login realizado com sucesso!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html'; // Altere para a página desejada
            }, 2000);
        } else {
            exibirMensagem(data.message, 'error');
        }
    })
    .catch(error => {
        exibirMensagem('Ocorreu um erro ao processar o login.', 'error');
    });
});

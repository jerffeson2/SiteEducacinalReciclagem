document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio do formulário antes das validações
    
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar_senha").value;
    const mensagem = document.getElementById("mensagem");

    // Limpa qualquer mensagem de erro anterior
    mensagem.innerHTML = "";
    
    // Validação do campo Nome Completo
    if (nome === "") {
        mensagem.innerHTML = "Por favor, insira seu nome completo.";
        return;
    }

    // Validação do formato de email
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        mensagem.innerHTML = "Por favor, insira um email válido.";
        return;
    }

    // Validação do campo Senha
    if (senha.length < 8) {
        mensagem.innerHTML = "A senha deve ter pelo menos 8 caracteres.";
        return;
    }

    // Validação da confirmação de senha
    if (senha !== confirmarSenha) {
        mensagem.innerHTML = "As senhas não correspondem.";
        return;
    }

    // Armazenar os dados no localStorage
    const usuario = {
        nome: nome,
        email: email,
        senha: senha
    };
    
    localStorage.setItem("usuario", JSON.stringify(usuario));

    // Exibe uma mensagem de sucesso
    mensagem.innerHTML = "Cadastro realizado com sucesso!";
    mensagem.style.color = "green";

    // Limpar o formulário ou realizar outras ações
    document.getElementById("cadastroForm").reset();
});

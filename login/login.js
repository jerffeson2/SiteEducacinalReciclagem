document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio do formulário

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const mensagem = document.createElement("p");

    // Verifica se o usuário está armazenado no localStorage
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioSalvo) {
        mensagem.innerText = "Nenhum usuário cadastrado encontrado.";
        mensagem.style.color = "red";
        document.body.appendChild(mensagem);
        return;
    }

    // Verifica as credenciais
    if (usuarioSalvo.email === email && usuarioSalvo.senha === senha) {
        mensagem.innerText = "Login realizado com sucesso!";
        mensagem.style.color = "green";
        document.body.appendChild(mensagem);

        // Redireciona para a página principal ou área do usuário após o login
        setTimeout(() => {
            window.location.href = "../index.html"; // Altere para a página desejada
        }, 2000);
    } else {
        mensagem.innerText = "Email ou senha incorretos.";
        mensagem.style.color = "red";
        document.body.appendChild(mensagem);
    }
});

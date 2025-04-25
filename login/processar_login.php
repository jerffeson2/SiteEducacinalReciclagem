<?php
// processar_login.php

header('Content-Type: application/json');

// Função para ler os usuários do arquivo JSON
function lerUsuarios() {
    $arquivo = 'usuarios.json';
    if (!file_exists($arquivo)) {
        file_put_contents($arquivo, json_encode([])); // Cria o arquivo vazio se não existir
    }
    $dados = file_get_contents($arquivo);
    return json_decode($dados, true);
}

// Recebe os dados enviados pelo login.js
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$senha = $data['senha'] ?? '';

// Verifica as credenciais do usuário
$usuarios = lerUsuarios();
foreach ($usuarios as $usuario) {
    // Verifica se o email existe e a senha está correta
    if ($usuario['email'] === $email && password_verify($senha, $usuario['senha'])) {
        echo json_encode(['success' => true, 'message' => 'Login realizado com sucesso!']);
        exit;
    }
}

// Se as credenciais forem inválidas, retorna uma mensagem de erro
echo json_encode(['success' => false, 'message' => 'Email ou senha incorretos.']);

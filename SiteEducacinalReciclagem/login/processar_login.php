<?php
// processar_login.php

header('Content-Type: application/json');

// Simulando um banco de dados de usuários


// Obtendo os dados da solicitação
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$senha = $data['senha'];

// Verifica as credenciais
foreach ($usuarios as $usuario) {
    if ($usuario['email'] === $email && $usuario['senha'] === $senha) {
        echo json_encode(['success' => true]);
        exit;
    }
}

// Se não encontrar, retorna um erro
echo json_encode(['success' => false, 'message' => 'Email ou senha incorretos.']);

<?php
// processar_cadastro.php

header('Content-Type: application/json');

// Lê os dados enviados via POST
$data = json_decode(file_get_contents('php://input'), true);

// Verifica se os dados estão corretos
if (!isset($data['nome']) || !isset($data['email']) || !isset($data['senha'])) {
    echo json_encode(['success' => false, 'message' => 'Dados incompletos.']);
    exit;
}

// Valida o formato do email
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Email inválido.']);
    exit;
}

// Verifica se a senha tem pelo menos 6 caracteres
if (strlen($data['senha']) < 6) {
    echo json_encode(['success' => false, 'message' => 'A senha deve ter pelo menos 6 caracteres.']);
    exit;
}

// Carrega os usuários existentes
$usuariosJson = file_get_contents('usuarios.json');
$usuarios = json_decode($usuariosJson, true);

// Verifica se o email já está cadastrado
foreach ($usuarios as $usuario) {
    if ($usuario['email'] === $data['email']) {
        echo json_encode(['success' => false, 'message' => 'Email já cadastrado.']);
        exit;
    }
}

// Adiciona o novo usuário
$novousuario = [
    'nome' => $data['nome'],
    'email' => $data['email'],
    'senha' => password_hash($data['senha'], PASSWORD_DEFAULT) // Hashing da senha
];
$usuarios[] = $novousuario;

// Salva os usuários atualizados de volta no arquivo
file_put_contents('usuarios.json', json_encode($usuarios, JSON_PRETTY_PRINT));

// Responde com sucesso
echo json_encode(['success' => true, 'message' => 'Cadastro realizado com sucesso!']);
?>

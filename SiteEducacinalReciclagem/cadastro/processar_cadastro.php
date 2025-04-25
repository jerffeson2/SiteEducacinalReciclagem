<?php
header('Content-Type: application/json');

// Verifica se a requisição é POST e se é um JSON
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $nome = htmlspecialchars(trim($data['nome']));
    $email = htmlspecialchars(trim($data['email']));
    $senha = htmlspecialchars(trim($data['senha']));

    $errors = [];

    if (empty($nome)) {
        $errors[] = "O nome é obrigatório.";
    }

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "O email é inválido.";
    }

    if (empty($senha)) {
        $errors[] = "A senha é obrigatória.";
    }

    if (!empty($errors)) {
        echo json_encode(['status' => 'error', 'message' => implode(', ', $errors)]);
    } else {
        // Aqui você pode adicionar código para salvar os dados em um banco de dados

        // Mensagem de sucesso
        echo json_encode(['status' => 'success', 'message' => 'Cadastro realizado com sucesso!']);
    }
}
// Remover o fechamento ?> aqui

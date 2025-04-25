<?php
// Definindo o cabeçalho como JSON para facilitar o retorno de informações, caso precise
header('Content-Type: application/json');

// Verificando se todos os campos necessários foram enviados
if (!isset($_POST['nome']) || !isset($_POST['email']) || !isset($_POST['mensagem'])) {
    echo json_encode(['success' => false, 'message' => 'Dados incompletos.']);
    exit;
}

// Obtendo os dados do formulário e sanitizando para evitar problemas de segurança
$nome = htmlspecialchars($_POST['nome']);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$mensagem = htmlspecialchars($_POST['mensagem']);

// Verificando se o email é válido
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Email inválido.']);
    exit;
}

// Caminho do arquivo JSON onde as mensagens serão armazenadas
$caminhoArquivo = 'mensagens.json';

// Verificando se o arquivo existe e carregando as mensagens existentes
if (file_exists($caminhoArquivo)) {
    $mensagensExistentes = json_decode(file_get_contents($caminhoArquivo), true);
} else {
    $mensagensExistentes = [];
}

// Adicionando a nova mensagem ao array de mensagens
$novaMensagem = [
    'nome' => $nome,
    'email' => $email,
    'mensagem' => $mensagem,
    'data' => date('Y-m-d H:i:s')
];
$mensagensExistentes[] = $novaMensagem;

// Salvando todas as mensagens de volta no arquivo JSON
file_put_contents($caminhoArquivo, json_encode($mensagensExistentes, JSON_PRETTY_PRINT));

// Retornando uma resposta de sucesso
echo json_encode(['success' => true, 'message' => 'Mensagem enviada com sucesso!']);

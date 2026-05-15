<?php
include "db.php";

if (!function_exists('getallheaders')) {
    function getallheaders() {
        $headers = [];
        foreach ($_SERVER as $name => $value) {
            if (substr($name, 0, 5) == 'HTTP_') {
                $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
            }
        }
        return $headers;
    }
}

$headers = getallheaders();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : (isset($headers['authorization']) ? $headers['authorization'] : '');
$token = str_replace('Bearer ', '', $authHeader);

if (empty($token)) {
    http_response_code(401);
    echo json_encode(["message" => "Unauthorized"]);
    exit();
}

$token = mysqli_real_escape_string($conn, $token);
$userQuery = "SELECT id FROM users WHERE token = '$token'";
$userResult = mysqli_query($conn, $userQuery);

if (mysqli_num_rows($userResult) == 0) {
    http_response_code(401);
    echo json_encode(["message" => "Invalid token"]);
    exit();
}

$user = mysqli_fetch_assoc($userResult);
$user_id = $user['id'];

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
    http_response_code(400);
    echo json_encode(["message" => "Phrase ID is required"]);
    exit();
}

$phrase_id = (int)$data->id;

// Check if phrase belongs to the user
$checkQuery = "SELECT id FROM phrases WHERE id = $phrase_id AND user_id = $user_id";
$checkResult = mysqli_query($conn, $checkQuery);

if (mysqli_num_rows($checkResult) == 0) {
    http_response_code(403);
    echo json_encode(["message" => "Unauthorized to delete this phrase"]);
    exit();
}

$deleteQuery = "DELETE FROM phrases WHERE id = $phrase_id";
if (mysqli_query($conn, $deleteQuery)) {
    echo json_encode(["message" => "Phrase deleted successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Failed to delete phrase: " . mysqli_error($conn)]);
}
?>

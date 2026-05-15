<?php
include "db.php";

// getallheaders() might not be available in all setups (e.g. nginx fastcgi), fallback if needed
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

if (!isset($data->text) || trim($data->text) === '') {
    http_response_code(400);
    echo json_encode(["message" => "Text is required"]);
    exit();
}

$text = mysqli_real_escape_string($conn, trim($data->text));

$insertQuery = "INSERT INTO phrases (text, user_id) VALUES ('$text', $user_id)";
if (mysqli_query($conn, $insertQuery)) {
    echo json_encode(["message" => "Phrase added successfully", "id" => mysqli_insert_id($conn)]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Failed to add phrase: " . mysqli_error($conn)]);
}
?>

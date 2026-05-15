<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)) {
    http_response_code(400);
    echo json_encode(["message" => "Missing email or password"]);
    exit();
}

$email = mysqli_real_escape_string($conn, $data->email);
$password = $data->password;

$query = "SELECT * FROM users WHERE email = '$email'";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    $user = mysqli_fetch_assoc($result);
    if (password_verify($password, $user['password'])) {
        // Generate a random token
        $token = bin2hex(random_bytes(16));
        $updateToken = "UPDATE users SET token = '$token' WHERE id = " . $user['id'];
        mysqli_query($conn, $updateToken);

        echo json_encode(["message" => "Login successful", "token" => $token, "email" => $email, "role" => $user['role']]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Invalid credentials"]);
    }
} else {
    http_response_code(401);
    echo json_encode(["message" => "Invalid credentials"]);
}
?>

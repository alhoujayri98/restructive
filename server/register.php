<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username) || !isset($data->email) || !isset($data->password) || !isset($data->phone_number)) {
    http_response_code(400);
    echo json_encode(["message" => "Missing username, email, password, or phone number"]);
    exit();
}

$username = mysqli_real_escape_string($conn, $data->username);
$email = mysqli_real_escape_string($conn, $data->email);
$phone_number = mysqli_real_escape_string($conn, $data->phone_number);
$passwordhash = password_hash($data->password, PASSWORD_BCRYPT);

// Always user by default
$role = "user";

// 🔐 Secret protection
$SECRET = "my_secret_key_123";

if (isset($data->role) && $data->role === "admin") {
    if (isset($data->secret) && $data->secret === $SECRET) {
        $role = "admin";
    } else {
        echo json_encode(["error" => "Unauthorized to create admin"]);
        exit();
    }
}

// Check if user already exists
$checkUser = "SELECT id FROM users WHERE email = '$email'";
$result = mysqli_query($conn, $checkUser);
if (mysqli_num_rows($result) > 0) {
    http_response_code(409); // Conflict
    echo json_encode(["message" => "Email already exists"]);
    exit();
}

// Insert new user
$insert = "INSERT INTO users (username, email, password, role) VALUES ('$username', '$email', '$passwordhash', '$role')";

if (mysqli_query($conn, $insert)) {
    echo json_encode(["message" => "User registered successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Failed to register user"]);
}
?>

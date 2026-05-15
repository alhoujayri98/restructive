<?php
include "db.php";

// Create users table
$query1 = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    token VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

// Create phrases table
$query2 = "CREATE TABLE IF NOT EXISTS phrases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)";

// Execute query1
if (mysqli_query($conn, $query1)) {
    echo "Users table created successfully\n";
} else {
    echo "Error creating users table: " . mysqli_error($conn) . "\n";
}

// Execute query2
if (mysqli_query($conn, $query2)) {
    echo "Phrases table created successfully\n";
} else {
    echo "Error creating phrases table: " . mysqli_error($conn) . "\n";
}
?>
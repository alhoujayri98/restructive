CREATE DATABASE IF NOT EXISTS restructive;
USE restructive;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  phone_number VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user','admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS phrases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('applicant','coder') NOT NULL DEFAULT 'applicant',
  talent VARCHAR(200),
  nationality VARCHAR(100),
  gender ENUM('male','female'),
  domain VARCHAR(100),
  phrase TEXT,
  mtcn VARCHAR(100),
  service_app VARCHAR(200),
  domain_other VARCHAR(200),
  segment VARCHAR(100),
  segment_other VARCHAR(200),
  actors VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
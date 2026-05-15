<?php
include "db.php";

$query = "SELECT phrases.id, phrases.text, users.username AS owner, phrases.user_id FROM phrases JOIN users ON phrases.user_id = users.id ORDER BY phrases.id DESC";
$result = mysqli_query($conn, $query);

$phrases = [];
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $phrases[] = $row;
    }
}

echo json_encode($phrases);
?>

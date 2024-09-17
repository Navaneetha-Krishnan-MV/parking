$host = "localhost";
$dbname = "parkings";
$user = "postgres";
$pass = "madhumitha";
try {
    // Connect to PostgreSQL database
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Retrieve data from HTTP GET request
    $slot1 = isset($_GET['slot1']) ? intval($_GET['slot1']) : 0;
    $slot2 = isset($_GET['slot2']) ? intval($_GET['slot2']) : 0;
    $slot3 = isset($_GET['slot3']) ? intval($_GET['slot3']) : 0;

    // Update the database
    $stmt = $pdo->prepare("INSERT INTO parking_slots (slot1, slot2, slot3) VALUES (:slot1, :slot2, :slot3)");
    $stmt->bindParam(':slot1', $slot1, PDO::PARAM_BOOL);
    $stmt->bindParam(':slot2', $slot2, PDO::PARAM_BOOL);
    $stmt->bindParam(':slot3', $slot3, PDO::PARAM_BOOL);
    $stmt->execute();

    echo "Update successful";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
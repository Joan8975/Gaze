<?php
// required headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, PATCH');
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json,charset=utf-8');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');

// include database and object files
include_once '../config/conn.php';
include_once '../models/post.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

$requestMethod = $_SERVER["REQUEST_METHOD"];
$handler = new TodoHandler($db,$requestMethod);

switch ($requestMethod) {
	case 'GET':
		getCollection();
		break;
	default:
		break;
}
// 獲取所有 collection
function getCollection() {
	global $handler;
	$handler->email = isset($_GET['email']) ? $_GET['email'] : die();
	$stmt = $handler->readCollections();
	$num = $stmt->rowCount();
	if($num>0){
		$todo_arr=array();
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);
			$todo_item=array(
				"collection" => $collection,
				"content" => $content,
			);
			array_push($todo_arr, $todo_item);
		}
		http_response_code(200);
		echo json_encode($todo_arr);
	}else{
		http_response_code(400);
		echo json_encode(array("message" => "no content"));
	}
}

?>
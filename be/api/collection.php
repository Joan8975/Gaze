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
		getCollectionSaves();
		break;
	case 'DELETE':
		delete();
		break;
	default:
		break;
}

// 獲取一個 collection 內所有圖片
function getCollectionSaves() {
	global $handler;
	$handler->email = isset($_GET['email']) ? $_GET['email'] : die();
	$handler->collection = isset($_GET['collection']) ? $_GET['collection'] : die();
	$stmt = $handler->readCollectionSaves();
	$num = $stmt->rowCount();
	if($num>0){
		$todo_arr=array();
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);
			$todo_item=array(
				"id" => $id,
				"imgId" => $imgId,
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
// 刪除 collection
function delete(){
	global $handler;
	$data = json_decode(file_get_contents("php://input"));
	$handler->email = $data->email;
	$handler->collection = $data->collection;
	
	if($handler->deleteCollection()){
		http_response_code(200);
		echo json_encode(array("message" => "Collection was deleted."));
	}
	else{
		http_response_code(503);
		echo json_encode(array("message" => "Unable to delete Collection."));
	}
}
?>
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
		getSaves();
		break;
	case 'POST':
		saveImg();
		break;
	case 'DELETE':
		delete();
		break;
	default:
		break;
}

// 獲取所有圖片
function getSaves() {
	global $handler;
	$handler->email = isset($_GET['email']) ? $_GET['email'] : die();
	$stmt = $handler->readSaves();
	$num = $stmt->rowCount();
	if($num>0){
		$todo_arr=array();
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);
			$todo_item=array(
				"id" => $id,
				"imgId" => $imgId,
				"content" => $content,
				"collection" => $collection,
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
// 新增圖片
function saveImg() {
	global $handler;
	$data = json_decode(file_get_contents("php://input"));

	$handler->email = $data->email;
	$handler->imgId = $data->imgId;
	$handler->content = $data->content;
	$handler->collection = $data->collection;
	
	if( !empty($handler->email) &&
		!empty($handler->imgId) &&
		!empty($handler->content) &&
		!empty($handler->collection)
	){  
		if($handler->createSave()){
			http_response_code(201);
			echo json_encode(array("message" => "Image create successfully."));
		} else {
			http_response_code(503);
			echo json_encode(array("message" => "Unable to create Image."));
		}
	} else {
		http_response_code(400);
		echo json_encode(array("message" => "Unable to create Image. Data is incomplete."));
	}
}
// 刪除圖片
function delete(){
	global $handler;
	$data = json_decode(file_get_contents("php://input"));
	$handler->email = $data->email;
	$handler->imgId = $data->imgId;
	$handler->collection = $data->collection;
	
	if($handler->deleteSave()){
		http_response_code(200);
		echo json_encode(array("message" => "Image was deleted."));
	}
	else{
		http_response_code(503);
		echo json_encode(array("message" => "Unable to delete Image."));
	}
}
?>
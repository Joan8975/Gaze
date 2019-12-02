<?php
	class TodoHandler{
    // database connection and table name
	private $conn;
	private $table_name = "gaze_collection";
	private $requestMethod;
 
    // object properties
    public $id;
	public $email;
	public $collection;
	public $imgId;
    public $content;
 
    // constructor with $db as database connection
    public function __construct($db, $requestMethod){
		$this->conn = $db;
		$this->requestMethod = $requestMethod;
	}

	// 獲取所有 collection
	function readCollections(){
		$query = "SELECT * ,count(distinct `collection`) FROM ". $this->table_name ." WHERE email = ?GROUP BY collection ORDER BY id DESC ";
		$stmt = $this->conn->prepare( $query );
		$stmt->bindParam(1, $this->email);
		$stmt->execute();
		return $stmt;
	}

	// 獲取所有圖片
	function readSaves(){
		$query = "SELECT * FROM " . $this->table_name . " WHERE email = ? ORDER BY id DESC";
		$stmt = $this->conn->prepare( $query );
		$stmt->bindParam(1, $this->email);
		$stmt->execute();
		return $stmt;
	}
	// 獲取一個 collection 內所有圖片
	function readCollectionSaves(){
		$query = "SELECT * FROM " . $this->table_name . " WHERE email = :email && collection = :collection ORDER BY id DESC";
		$stmt = $this->conn->prepare( $query );
		$stmt->bindParam(":email", $this->email);
		$stmt->bindParam(":collection", $this->collection);
		$stmt->execute();
		return $stmt;
	}
	// 新增圖片
	function createSave(){
		$query = 'INSERT INTO ' . $this->table_name . '
		SET 
			email = :email,
			imgId = :imgId,
			content = :content,
			collection = :collection';
		$stmt = $this->conn->prepare($query);
		$this->collection = htmlspecialchars(strip_tags($this->collection));
		$stmt->bindParam(":email", $this->email);
		$stmt->bindParam(":imgId", $this->imgId);
		$stmt->bindParam(":content", $this->content);
		$stmt->bindParam(":collection", $this->collection);
		if($stmt->execute()){
			return true;
		}
		return false;
	}

	// 刪除圖片
	function deleteSave(){
		$query = "DELETE FROM " . $this->table_name . " 
		WHERE email = :email && collection = :collection && imgId = :imgId LIMIT 1";
		$stmt = $this->conn->prepare($query);
		$stmt->bindParam(":email", $this->email);
		$stmt->bindParam(":collection", $this->collection);
		$stmt->bindParam(":imgId", $this->imgId);
		if($stmt->execute()){
			return true;
		}
		return false;
	}
	// 刪除 collection
	function deleteCollection(){
		$query = "DELETE FROM " . $this->table_name . " 
		WHERE email = :email && collection = :collection";
		$stmt = $this->conn->prepare($query);
		$stmt->bindParam(":email", $this->email);
		$stmt->bindParam(":collection", $this->collection);
		if($stmt->execute()){
			return true;
		}
		return false;
	}
	
}
?>
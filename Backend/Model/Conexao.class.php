<?php
	abstract class Conexao {
		protected $db;
		
		protected function __construct()
		{
			$this->db = new PDO("mysql:host=localhost;dbname=master-pedidos;charset=utf8mb4", "root", "");
			$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
		}
	}
?>
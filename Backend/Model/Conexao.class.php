<?php
	abstract class Conexao {
		protected $db;
		
		protected function __construct()
		{
			$this->db = new PDO("mysql:host=localhost;dbname=master-pedidos;charset=utf8mb4", "root", "");
			$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

			// $dsn="mysql:host=localhost;dbname=master-pedidos;charset=utf8mb4";
			// try
			// {
			// 	$this->db = new PDO($dsn, "root", "");
			// 	$this->db->setAttribute(PDO::ATTR_ERRMODE, 
			// 	PDO::ERRMODE_EXCEPTION);
			// }
			// catch ( Exception $e )
			// {
			// 	// die ($e->getMessage());
			// 	die("Erro de conexão com o Banco de Dados");
			// }
		}

		function inserir() {

		}

		function atualizar() {

		}

		function executar($sql, $classe){
			try
			{
				$this->db = new PDO("mysql:host=localhost;dbname=master-pedidos;charset=utf8mb4", "root", "");
				$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				$this->db->setAttribute(PDO::ATTR_ORACLE_NULLS, PDO::NULL_NATURAL);
				$stm = $this->db->prepare($sql);
				$stm->execute();
				$this->db = null;
				return $stm->fetchAll(PDO::FETCH_CLASS, $classe);
			}
			catch ( Exception $e )
			{
				die ($e->getMessage());
				// die("Erro de conexão com o Banco de Dados");
			}
		}
	}
?>
<?php
    class PedidoProdutoData extends BaseData {
        function __construct() {
            parent::__construct();
        }

        function deletarTodosPorIdPedido($idPedido){
            try {
                $classe = str_ireplace('Data', '', get_class($this));
                $sql = "DELETE FROM ".$classe."\n";
                $sql.= "WHERE IdPedido = ?";
                $stm = $this->db->prepare($sql);
                $stm->bindValue(1,$idPedido);
                $stm->execute();
                return "Registros excluídos com sucesso!";
            } catch(Exception $e) {
                return "Erro: ".$e->getMessage();
            }
        }

        function buscarTodosPorIdPedido($idPedido){
            try {
                $classe = str_ireplace('Data', '', get_class($this));
                $sql = "SELECT * FROM ".$classe."\n";
                $sql.= "WHERE IdPedido = ?";
                $stm = $this->db->prepare($sql);
                $stm->bindValue(1,$idPedido);
                $stm->execute();
                $retorno = $stm->fetchAll();
                return array_map(function($x) {return Funcoes::criarEntidade("PedidoProduto", $x);}, $retorno);
            } catch(Exception $e) {
                return "Erro: ".$e->getMessage();
            }
        }
    }
?>
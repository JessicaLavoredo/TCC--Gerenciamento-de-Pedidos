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
    }
?>
<?php
    class HistoricoPedidoData extends BaseData {
        function __construct() {
            parent::__construct();
        }

        function buscarStatusPorIdPedido($id) {
            $sql = "SELECT SP.* FROM StatusPedido SP\n";
            $sql.= "INNER JOIN HistoricoPedido HP ON HP.IdStatusPedido = SP.IdStatusPedido\n";
            $sql.= "WHERE HP.IdPedido = ".$id."\n";
            $sql.= "ORDER BY HP.DataMovimentacao DESC\n";
            $sql.= "LIMIT 1";
            $stm = $this->db->prepare($sql);
            $stm->execute();
            $ret = $stm->fetch();
            if (!$ret) {
                return null;
            }
            return Funcoes::criarEntidade("StatusPedido", $ret);
        }
    }
?>
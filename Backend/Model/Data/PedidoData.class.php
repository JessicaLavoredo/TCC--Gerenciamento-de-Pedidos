<?php
    class PedidoData extends BaseData {
        function __construct() {
            parent::__construct();
        }

        function gravar($entidade) {
            try{
                $propriedadesPedido = Funcoes::getPropriedades("Pedido");
                $propriedadesPedido = array_filter($propriedadesPedido, function($x){if(strtoupper($x) !== strtoupper("IdPedido") && strtoupper($x) !== strtoupper("Produtos") && strtoupper($x) !== strtoupper("IdUsuarioMovimentacao")){return true;}else{return false;}});

                if ($entidade->getIdPedido() > 0) {
                    $sql = "UPDATE Pedido\n";
                    $sql .= "SET ";
                    foreach($propriedadesPedido as $prop) {
                        $sql.= $prop." = :".$prop.", ";
                    }
                    $sql = substr_replace($sql, "\n", -2);
                    $sql.= "WHERE IdPedido = :IdPedido";

                    $stm = $this->prepare($sql);
                    $stm->bindValue(":IdPedido", $entidade->getIdPedido());
                    foreach($propriedadesPedido as $prop){
                        $get = "get".$prop;
                        $stm->bindValue(":".$prop, $entidade->$get());
                    }
                    $stm->execute();
                    $ultimoId = $entidade->getIdPedido();
                } else {
                    $sql = "INSERT INTO Pedido (".join(", ", $propriedadesPedido).", IdUsuarioCriadoPor".")\n";
                    $sql.= "VALUES (";
                    foreach($propriedadesPedido as $prop){
                        $sql.= ":".$prop.", ";
                    }
                    $sql.= ":IdUsuarioMovimentacao, ";
                    $sql = substr_replace($sql,")\n",-2);

                    $stm = $this->db->prepare($sql);
                    $stm->bindValue(":IdUsuarioMovimentacao", $entidade->getIdUsuarioMovimentacao());
                    foreach($propriedadesPedido as $prop){
                        $get = "get".$prop;
                        $stm->bindValue(":".$prop, $entidade->$get());
                    }
                    $stm->execute();
                    $ultimoId = intval($this->db->lastInsertId());

                    $historicoPedido = New HistoricoPedido(null, $ultimoId, 1, date_format(date_create(), 'Y-m-d H:m:i'), $entidade->getIdUsuarioMovimentacao());
                    (new HistoricoPedidoData())->gravar($historicoPedido);
                }

                (new PedidoProdutoData())->deletarTodosPorIdPedido($ultimoId);
                $pedidoProdutoData = new PedidoProdutoData();
                $produtos = $entidade->getProdutos();
                if(count($produtos) > 0 ){
                    foreach($produtos as $produto){
                        // $pedidoProduto = Funcoes::criarEntidade("PedidoProduto", $produto);
                        $produto->setIdPedido($ultimoId);
                        $pedidoProdutoData->gravar($produto);
                    }
                }

                return "Registro gravado com sucesso.";
            }catch (Exception $e){
                return "Erro ao gravar no banco.";
            }
        }
    }
?>
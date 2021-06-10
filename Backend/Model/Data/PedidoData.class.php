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
                    $sql.= "SET IdFormaPagamento=".$entidade->getIdFormaPagamento().", Total=".$entidade->getTotal();
                    $sql.= "\nWHERE IdPedido = ".$entidade->getIdPedido();

                    $stm = $this->db->prepare($sql);
                    $stm->execute();
                    $ultimoId = $entidade->getIdPedido();
                } else {
                    $sql = "INSERT INTO Pedido (IdPessoa, IdFormaPagamento, Total, IdUsuarioCriadoPor, DataCriacao)\n";
                    $sql.= "VALUES (";
                    $valores[] = $entidade->getIdPessoa();
                    $valores[] = $entidade->getIdFormaPagamento();
                    $valores[] = $entidade->getTotal();
                    $valores[] = $GLOBALS['$USUARIO_LOGADO'];
                    $valores[] = "'".date_format(date_create(), 'Y-m-d H:i:s')."'";
                    $sql.= implode(", ", $valores);
                    $sql.= ")";

                    $stm = $this->db->prepare($sql);
                    $stm->execute();
                    $ultimoId = intval($this->db->lastInsertId());

                    $historicoPedido = New HistoricoPedido(null, $ultimoId, 1, date_format(date_create(), 'Y-m-d H:i:s'), $GLOBALS['$USUARIO_LOGADO']);
                    (new HistoricoPedidoData())->gravar($historicoPedido);
                }

                $pedidoProdutoData = new PedidoProdutoData();
                $pedidoProdutoData->deletarTodosPorIdPedido($ultimoId);
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

        function buscarPorId($id) {
            $sql = "SELECT * FROM Pedido\n";
            $sql.= "WHERE IdPedido = ".$id;
            
            $stm = $this->db->prepare($sql);
            $stm->execute();
            $pedido = $stm->fetch();
            if (!$pedido){
                return;
            }
            $pedido = Funcoes::criarEntidade("Pedido", $pedido);

            // $sql = "SELECT * FROM HistoricoPedido\n";
            // $sql.= "WHERE IdPedido = ".$id."\n";
            // $sql.= "ORDER BY DataMovimentacao DESC";
            // $stm = $this->db->prepare($sql);
            // $stm->execute();
            // $status = $stm->fetchAll();
            // $pedido->setStatus($status);

            $pedidoProdutos = (New PedidoProdutoData())->buscarTodosPorIdPedido($id);
            $pedido->setProdutos($pedidoProdutos);

            return $pedido;
        }
    }
?>
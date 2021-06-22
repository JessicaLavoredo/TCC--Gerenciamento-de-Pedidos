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
                    $statusPedido = $entidade->getIdStatus();
                } else {
                    $sql = "INSERT INTO Pedido (IdPessoa, IdFormaPagamento, Total, IdUsuarioCriadoPor, DataCriacao)\n";
                    $sql.= "VALUES (";
                    $valores[] = $entidade->getIdPessoa();
                    $valores[] = $entidade->getIdFormaPagamento();
                    $valores[] = $entidade->getTotal();
                    $valores[] = $GLOBALS['USUARIO_LOGADO'];
                    $valores[] = "'".date_format(date_create(), 'Y-m-d H:i:s')."'";
                    $sql.= implode(", ", $valores);
                    $sql.= ")";

                    $stm = $this->db->prepare($sql);
                    $stm->execute();
                    $ultimoId = intval($this->db->lastInsertId());
                    $statusPedido = 1;
                }

                $historicoPedido = New HistoricoPedido(null, $ultimoId, $statusPedido, date_format(date_create(), 'Y-m-d H:i:s'), $GLOBALS['USUARIO_LOGADO']);
                (new HistoricoPedidoData())->gravar($historicoPedido);

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
            $pedidoProdutos = (New PedidoProdutoData())->buscarTodosPorIdPedido($id);
            $pedido->setProdutos($pedidoProdutos);

            // $sql = "SELECT * FROM HistoricoPedido\n";
            // $sql.= "WHERE IdPedido = ".$id."\n";
            // $sql.= "ORDER BY DataMovimentacao DESC";
            // $stm = $this->db->prepare($sql);
            // $stm->execute();
            // $status = $stm->fetchAll();
            // $pedido->setStatus($status);


            return $pedido;
        }

        function buscarPorFiltro($obj){
            $obj = Funcoes::objetoParaArray($obj);
            
            $pessoa = $obj['Pessoa'];
            unset($obj['Pessoa']);
            $enderecos = $pessoa['Enderecos'];
            unset($pessoa['Enderecos']);
            unset($pessoa['Vinculos']);
            unset($pessoa['Telefones']);
            unset($pessoa['Emails']);
            $pedido = $obj;
            unset($pedido["Produtos"]);
            $status = $pedido['IdStatus'];
            unset($pedido['IdStatus']);

            $sql = "SELECT * FROM Pedido P\n";
            $sql.= "INNER JOIN Pessoa PE ON PE.IdPessoa = P.IdPessoa\n";
            $sql.= "INNER JOIN Endereco E ON E.IdPessoa = PE.IdPessoa\n";
            $sql.= "INNER JOIN Cidade C ON C.IdCidade = E.IdCidade\n";
            $sql.= "INNER JOIN Estado UF ON UF.IdEstado = C.IdEstado\n";
            $sql.= "WHERE ";

            $filtros = array();           

            foreach ($enderecos as $endereco) {
                if ($endereco) {
                    foreach ($endereco as $chave => $valor) {
                        if ($endereco[$chave]) {
                            if($chave === "Cidade"){
                                foreach($valor as $chave2 => $valor2){
                                    if($chave2 === "Estado"){
                                        foreach($valor2 as $chave3 => $valor3){
                                            if(!is_null($valor3)){
                                                $filtros[] = "UF.".$chave3." LIKE '%".$valor3."%'";
                                            }
                                        }
                                    } else {
                                        if (!is_null($valor2)){
                                            $filtros[] = "C.".$chave2." LIKE '%".$valor2."%'";
                                        }
                                    }
                                }
                            } else {
                                if(!is_null($valor)){
                                    $filtros[] = "E.".$chave." LIKE '%".$valor."%'";
                                }
                            }
                        }
                    }
                }
            }

            foreach ($pessoa as $chave => $valor) {
                if (!is_null($valor)) {
                    $filtros[] = "PE.".$chave." LIKE '%".$valor."%'";
                }
            }
            
            foreach ($pedido as $chave => $valor) {
                if (!is_null($valor)) {
                    $filtros[] = "P.".$chave." LIKE '%".$valor."%'";
                }
            }

            $sql.= implode("\nAND ", $filtros);

            if (!is_null($status)) {
                $sql.= "\nAND (SELECT HP.IdStatusPedido FROM HistoricoPedido HP WHERE HP.IdPedido = P.IdPedido ORDER BY HP.DataMovimentacao DESC LIMIT 1) = ".$status;
            }

            $stm = $this->db->prepare($sql);
            $stm->execute();
            $linhas = $stm->fetchAll();
            
            $ret = array();
            foreach ($linhas as $linha) {
                $pedido = Funcoes::criarEntidade("Pedido", $linha);
                $produtosPedido = (New PedidoProdutoData())->buscarTodosPorIdPedido($pedido->getIdPedido());
                $status = (New HistoricoPedidoData())->buscarStatusPorIdPedido($pedido->getIdPedido());
                $pedido->setProdutos($produtosPedido);
                if (!is_null($status)) {
                    $pedido->setIdStatus($status->getIdStatusPedido());
                }

                $ret[] = $pedido;
            }

            return $ret;
        }
    }
?>
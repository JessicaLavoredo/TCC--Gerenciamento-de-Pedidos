<?php
    class PedidoController extends BaseController {
        
        function buscarPorId($id){
            $pedido = (New PedidoData())->buscarPorId($id);
            
            if (!isset($pedido)) {
                return null;
            }

            $obj = Funcoes::objetoParaArray($pedido);

            $ret["IdPedido"] = $pedido->getIdPedido();
            $ret["Pessoa"] = (New PessoaData())->buscarPorId($pedido->getIdPessoa());
            $ret["Status"] = (New HistoricoPedidoData())->buscarStatusPorId($pedido->getIdPedido());
            $ret["FormaPagamento"] = (New FormaPagamentoData())->buscarPorId($pedido->getIdFormaPagamento());
            $ret["Total"] = $pedido->getTotal();
            $ret["Produtos"] = array_map(function($pedProd){
                $pedProd = Funcoes::objetoParaArray($pedProd);
                $pedProd["Produto"] = (new ProdutoData())->buscarPorId($pedProd["IdProduto"]);
                unset($pedProd["IdProduto"]);
                return $pedProd;
            }, $obj["Produtos"]);
            
            return $ret;
        }

    }
?>
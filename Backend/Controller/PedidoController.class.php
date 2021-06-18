<?php
    class PedidoController extends BaseController {
        
        function buscarPorId($id){
            $pedido = (New PedidoData())->buscarPorId($id);
            
            if (!isset($pedido)) {
                return null;
            }

            $ret = $this->converterParaResponse($pedido);
            
            return $ret;
        }

        function buscarPorFiltro($obj) {
            $pessoa = $obj['Pessoa'] ?? array();
            $pessoa = Funcoes::objetoParaArray(Funcoes::criarEntidade('Pessoa', $pessoa));
            
            $enderecos = $obj['Pessoa']['Enderecos'] ?? array();
            $enderecos = array_map(function($x){
                $x = Funcoes::objetoParaArray($x);

                $estado = $x["Cidade"]["Estado"] ?? array();
                $estado = Funcoes::objetoParaArray(Funcoes::criarEntidade('Estado', $estado));
                unset($x['Cidade']['Estado']);
                
                $cidade = $x["Cidade"] ?? array();
                $cidade = Funcoes::objetoParaArray(Funcoes::criarEntidade('Cidade', $cidade));
                unset($x['Cidade']);

                $endereco = $x ?? array();
                $endereco = Funcoes::objetoParaArray(Funcoes::criarEntidade('Endereco', $endereco));

                $cidade["Estado"] = $estado;
                unset($cidade["IdEstado"]);
                $endereco["Cidade"] = $cidade;
                unset($endereco["IdCidade"]);
                
                return $endereco;
            }, $enderecos);

            $pessoa['Enderecos'] = $enderecos;
            
            if(isset($obj['Status'])) {
                $obj['IdStatus'] = $obj['Status']['IdStatusPedido'] ?? null;
                unset($obj['Status']);
            }
            
            if(isset($obj['FormaPagamento'])) {
                $obj['IdFormaPagamento'] = $obj['FormaPagamento']['IdFormaPagamento'] ?? null;
                unset($obj['FormaPagamento']);
            }

            $entidade = Funcoes::objetoParaArray(Funcoes::criarEntidade('Pedido', $obj));
            unset($entidade['Produtos']);
            
            if(!is_null($pessoa)) {
                $entidade['Pessoa'] = $pessoa;
            }

            $ret = array();
            $pedidos = (new PedidoData())->buscarPorFiltro($entidade);
            foreach($pedidos as $pedido){
                $ret[] = $this->converterParaResponse($pedido);
            }

            return $ret;

        }

        function converterParaResponse($pedido){
            $obj = Funcoes::objetoParaArray($pedido);

            $ret["IdPedido"] = $pedido->getIdPedido();
            $ret["Pessoa"] = (New PessoaData())->buscarPorId($pedido->getIdPessoa());
            $ret["Status"] = (New HistoricoPedidoData())->buscarStatusPorIdPedido($pedido->getIdPedido());
            $ret["FormaPagamento"] = (New FormaPagamentoData())->buscarPorId($pedido->getIdFormaPagamento());
            $ret["Total"] = $pedido->getTotal();
            $ret["DataCricao"] = $pedido->getDataCriacao();
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
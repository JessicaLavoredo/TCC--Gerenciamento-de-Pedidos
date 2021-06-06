<?php
    class PedidoController extends BaseController {
        
        function buscarPorId($id){
            $pedido = (New PedidoData())->buscarPorId($id);
            
            if (!isset($pedido)) {
                return null;
            }

            $obj = Funcoes::objetoParaArray($pedido);

            $obj["Pessoa"] = (New PessoaData())->buscarPorId($pedido->getIdPessoa());
            unset($obj["IdPessoa"]);


            
            return $obj;
        }

    }
?>
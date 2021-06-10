<?php
    class StatusPedidoController extends BaseController {
        
        function buscarTodos() {
            $idsStatus = (new StatusPedidoData())->buscarTodos();
            $perfilLogado = $GLOBALS['PERFIL_USUARIO_LOGADO'];

            if ($perfilLogado === 3) {
                return array_filter($idsStatus, function($x){ 
                    if ($x->getIdStatusPedido() === 1 || $x->getIdStatusPedido() === 3) {
                        return $x;
                    }
                });
            }

            return $idsStatus;
        }
    }
?>
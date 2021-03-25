<?php

    class UsuarioController extends BaseController {

        function __construct(){

        }

        function login($obj){
            $controller = get_class($this);
            $data = str_ireplace('Controller', 'Data', $controller);
            $classeEntidade = str_ireplace('Controller', '', $controller);
            $entidade = Funcoes::criarEntidade($classeEntidade, $obj);
            $ret = (New UsuarioData())->autenticarUsuario($entidade);
            return $ret;
        }
    }

?>
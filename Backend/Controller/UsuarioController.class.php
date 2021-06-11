<?php

    class UsuarioController extends BaseController {

        function __construct(){

        }

        function login($obj){
            $entidade = Funcoes::criarEntidade('Usuario', $obj);
            $ret = (New UsuarioData())->autenticarUsuario($entidade);
            if (gettype($ret) !== 'object' || get_class($ret) !== 'Usuario') {
                return null;
            }
            return ['Authorization' => AuthController::gerarToken($ret->getIdUsuario(), $ret->getIdPerfil())];
        }
    }

?>
<?php

    class UsuarioController extends BaseController {

        function __construct(){

        }

        function login($body=""){
            $ret = (New UsuarioBusiness())->login($body["usuario"],$body["senha"]);
            return $ret;
        }
    }

?>
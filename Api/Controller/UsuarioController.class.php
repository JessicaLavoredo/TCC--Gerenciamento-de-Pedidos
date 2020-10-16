<?php

    class UsuarioController {

        function __construct(){

        }

        function login($body=""){
            $ret = (New UsuarioBusiness())->login($body["usuario"],$body["senha"]);
            return $ret;
        }

        function gravar() {

            $test = New Usuario("2", "2", "teste2", "321", "1");
            $test->inserir();

            // $objetos = array(New Usuario("1","1","teste","123","1"), New Usuario("2", "2", "teste2", "321", "1"));
            // return (New UsuarioData())->inserir($objetos);
        }

        function imprimirUsuarios() {
            return (new UsuarioBusiness())->getUsuarioPorId(1);
        }
    }

?>
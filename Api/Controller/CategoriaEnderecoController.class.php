<?php

    class CategoriaEnderecoController {

        function __construct() {

        }

        function listar(){
            $ret = (New CategoriaEnderecoBusiness())->buscarTodos();
        }

        function gravar($body=""){

        }
    }

?>
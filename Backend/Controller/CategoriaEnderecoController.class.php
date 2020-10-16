<?php

    class CategoriaEnderecoController {

        function __construct() {

        }

        function listar(){
            return (New CategoriaEnderecoBusiness())->buscarTodos();
        }

        function gravar($body=""){

        }
    }

?>
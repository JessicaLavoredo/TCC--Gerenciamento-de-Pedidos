<?php

    class CategoriaEnderecoBusiness {

        function __construct() {

        }

        function buscarTodos(){
            return (New CategoriaEndereco())->buscarTodos();
        }

    }

?>
<?php

    class BaseBusiness {

        function __construct() {

        }

        function buscarTodos() {
            $classe = str_ireplace('Business', '', get_class($this));
            return (New $classe())->buscarTodos();
        }
    }

?>